import { createRouter, createWebHashHistory } from 'vue-router';
import { useArtistStore } from '@/stores/artistStore';

const router = createRouter({
  history: createWebHashHistory(), 
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: () => import('@/views/ArtistProfileView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  }
});

router.beforeEach(() => {
  const store = useArtistStore();
  store.isPageLoading = true;
});

router.afterEach(() => {
  const store = useArtistStore();
  store.isPageLoading = false;
});

export default router;
