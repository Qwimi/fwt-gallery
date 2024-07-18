import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import { useAppStore } from './baseStore';
import { useModalStore } from './modalStore';
import type { AuthForm, AuthRequest, AuthResponse } from './types';
import { setupInterceptors } from '@/api';
import { handleLogin, handleRefresh, handleRegister } from '@/api/main';
import handleError from '@/helpers/errorHandling';

export const useAuthStore = defineStore('auth', () => {
  const fingerprint: Ref<string | null> = ref(null);
  const accessToken: Ref<string | null> = ref(null);
  const refreshToken: Ref<string | null> = ref(null);
  const isUserAuth = computed(() => !!accessToken.value);
  const store = useAppStore();

  const initializeFingerprint = async () => {
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      fingerprint.value = result.visitorId;
    } catch (e: unknown) {
      console.log('Error initializing fingerprint:', e);
    }
  };

  const reloadAppData = () => {
    store.getArtists();
    store.getGenres();
  };

  const getAccessToken = () => accessToken.value;

  const logout = () => {
    refreshToken.value = null;
    accessToken.value = null;
    localStorage.removeItem('refreshToken');
    store.getArtists();
  };

  const setRefreshToken = (value: string) => {
    localStorage.setItem('refreshToken', value);
    refreshToken.value = value;
  };

  const setTokens = (tokens: AuthResponse) => {
    localStorage.setItem('refreshToken', tokens.refreshToken);
    refreshToken.value = tokens.refreshToken;
    accessToken.value = tokens.accessToken;
    setRefreshToken(tokens.refreshToken);
  };

  const refreshTokens = async () => {
    try {
      await initializeFingerprint();
      const response = await handleRefresh(fingerprint.value!!, refreshToken.value!!);
      setTokens(response);
      reloadAppData();
    } catch (error: unknown) {
      handleError(error);
      logout();
    }
  };

  const getLocalTokens = async () => {
    if (localStorage.getItem('refreshToken')) {
      await setRefreshToken(localStorage.getItem('refreshToken')!!);
      refreshTokens();
    } else {
      console.log('no local refresh token');
      reloadAppData();
    }
  };

  // авторизация пользователя

  const sentAuthRequest = async (form: AuthForm, action: 'login' | 'register') => {
    try {
      await initializeFingerprint();
      const formData: AuthRequest = {
        username: form.emailValue,
        password: form.passwordValue,
        fingerprint: fingerprint.value
      };
      const response: AuthResponse =
        action === 'login' ? await handleLogin(formData) : await handleRegister(formData);
      setTokens(response);
      useModalStore().closeModal();
      useModalStore().closeSidebar();
      reloadAppData();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  getLocalTokens();
  setupInterceptors(getAccessToken, refreshTokens, logout);

  return {
    isUserAuth,
    sentAuthRequest,
    getLocalTokens,
    logout
  };
});
