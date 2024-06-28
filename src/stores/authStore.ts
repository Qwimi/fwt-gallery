import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

import { useAppStore } from './baseStore'
import { useModalStore } from './modalStore'
import type { AuthForm, AuthRequest, AuthResponse } from './types'

import { setupInterceptors } from '@/api'
import { handleLogin, handleRefresh, handleRegister } from '@/api/main'

export const useAuthStore = defineStore('auth', () => {
  const fingerprint: Ref<string> = ref('')
  const accessToken: Ref<string> = ref('')
  const refreshToken: Ref<string> = ref('')
  const isUserAuth = computed(() => Boolean(refreshToken.value))

  const initializeFingerprint = async () => {
    try {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      fingerprint.value = result.visitorId
    } catch (e: unknown) {
      console.log('Error initializing fingerprint:', e)
    }
  }

  const getAccessToken = () => accessToken.value

  const logout = () => {
    refreshToken.value = ''
    accessToken.value = ''
    localStorage.removeItem('refreshToken')
    useAppStore().getArtists()
  }

  const setRefreshToken = (value: string) => {
    localStorage.setItem('refreshToken', value)
    refreshToken.value = value
  }

  const setTokens = (tokens: AuthResponse) => {
    accessToken.value = tokens.accessToken
    setRefreshToken(tokens.refreshToken)
  }

  const refreshTokens = async () => {
    try {
      await initializeFingerprint()
      const response = await handleRefresh(fingerprint.value, refreshToken.value)
      setTokens(response)
      useAppStore().getArtists()
    } catch (e: unknown) {
      console.log('token refresh error:', e)
      logout()
    }
  }

  const getLocalTokens = async () => {
    if (localStorage.getItem('refreshToken')) {
      await setRefreshToken(localStorage.getItem('refreshToken')!!)
      refreshTokens()
    } else {
      console.log('no local refresh token')
    }
  }

  // авторизация пользователя

  const sentAuthRequest = async (form: AuthForm, isLoginRequest: boolean) => {
    try {
      await initializeFingerprint()
      const formData: AuthRequest = {
        username: form.emailValue,
        password: form.passwordValue,
        fingerprint: fingerprint.value
      }
      const response: AuthResponse = isLoginRequest
        ? await handleLogin(formData)
        : await handleRegister(formData)
      setTokens(response)
      useModalStore().closeModal()
      useAppStore().getArtists()
    } catch (errors) {
      console.log('Error:', errors)
    }
  }

  setupInterceptors(getAccessToken, refreshTokens, logout)

  return {
    isUserAuth,
    sentAuthRequest,
    getLocalTokens,
    logout
  }
})
