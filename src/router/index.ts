import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Referof',
      component: HomeView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name?.toString() || 'Referof';
  next();
});

export default router;
