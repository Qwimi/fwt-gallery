import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

import { useModalStore } from './modalStore'
import type { AuthForm, AuthRequest, AuthResponse, RefreshRequest } from './types'
import { getNewTokens } from '../api/main'

import { sentLoginData, sentRegisterData } from '@/api/main'

export const useAuthStore = defineStore('auth', () => {
  const fingerprint: Ref<string> = ref('')
  const accessToken: Ref<string> = ref('')
  const refreshToken: Ref<string> = ref('')
  const isUserAuth = computed(() => refreshToken.value != '')

  const initializeFingerprint = async () => {
    try {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      fingerprint.value = result.visitorId
    } catch (e: unknown) {
      console.log('Error initializing fingerprint:', e)
    }
  }

  initializeFingerprint()
    .then(() => getLocalTokens())
    .catch((e) => {
      console.log('Error in initializeFingerprint:', e)
    })

  const getAccessToken = () => accessToken.value

  const logout = () => {
    refreshToken.value = ''
    accessToken.value = ''
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
  }

  const setAccessToken = (value: string) => {
    localStorage.setItem('accessToken', value)
    accessToken.value = value
  }

  const setRefreshToken = (value: string) => {
    localStorage.setItem('refreshToken', value)
    refreshToken.value = value
  }

  const setTokens = (tokens: AuthResponse) => {
    setAccessToken(tokens.accessToken)
    setRefreshToken(tokens.refreshToken)
  }

  const refreshTokens = async () => {
    try {
      const refreshData: RefreshRequest = {
        fingerprint: fingerprint.value,
        refreshToken: refreshToken.value
      }
      console.log(refreshData)

      const response = await getNewTokens(refreshData)
      // setTokens(response)
    } catch (e: unknown) {
      console.log('token refresh error:', e)
      logout()
    }
  }

  const getLocalTokens = () => {
    if (localStorage.getItem('refreshToken')) {
      setAccessToken(localStorage.getItem('accessToken')!!)
      setRefreshToken(localStorage.getItem('refreshToken')!!)
    } else {
      console.log('no local refresh token')
    }
  }

  // авторизация пользователя

  const sentRegisterRequest = async (form: AuthForm) => {
    try {
      const formData: AuthRequest = {
        username: form.emailValue,
        password: form.passwordValue,
        fingerprint: fingerprint.value
      }
      const response: AuthResponse = await sentRegisterData(formData)
      setTokens(response)
      useModalStore().closeModal()
    } catch (errors) {
      console.log('Error:', errors)
    }
  }

  const sentLoginRequest = async (form: AuthForm) => {
    try {
      const formData: AuthRequest = {
        username: form.emailValue,
        password: form.passwordValue,
        fingerprint: fingerprint.value
      }
      const response: AuthResponse = await sentLoginData(formData)
      console.log(response)
      console.log(response.accessToken)
      console.log(response.refreshToken)

      setTokens(response)
      useModalStore().closeModal()
    } catch (errors) {
      console.log('Error:', errors)
    }
  }

  return {
    isUserAuth,
    getAccessToken,
    sentRegisterRequest,
    sentLoginRequest,
    getLocalTokens,
    refreshTokens,
    logout
  }
})
