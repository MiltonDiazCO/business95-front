import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'inversiones',
      component: () => import('@/modules/dashboard/views/DashboardView.vue'),
      children: [
        {
          path: '/inversiones',
          name: 'inversiones',
          component: () => import('@/modules/inversiones/views/InversionesList.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/modules/auth/views/LoginView.vue'),
    },
  ],
});

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const socioToken = localStorage.getItem('socio-token-temporal');

    if (!socioToken && to.name !== 'login') {
      next({ name: 'login' });
    } else if (socioToken && to.name === 'login') {
      next({ name: 'inversiones' });
    } else {
      next();
    }
  },
);

export default router;
