import { createRouter, createWebHistory } from 'vue-router';
import { usePageStore } from '@/stores/pageLoadingStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: () => import('@/views/ArtistProfile.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  }
});

router.beforeEach(() => {
  console.log('page is loading...');

  const uiStore = usePageStore();
  uiStore.isLoading = true;
});

router.afterEach(() => {
  console.log('page loaded');
  const uiStore = usePageStore();
  uiStore.isLoading = false;
});

export default router;
