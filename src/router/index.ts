import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import ArtistProfile from '@/views/ArtistProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: ArtistProfile
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
