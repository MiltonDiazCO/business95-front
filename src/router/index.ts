import autenticadoGuard from '@/modules/auth/guards/autenticado.guard';
import noAutenticadoGuard from '@/modules/auth/guards/no-autenticado.guard';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'mi-perfil' },
      beforeEnter: [autenticadoGuard],
      component: () => import('@/modules/layout/views/MainView.vue'),
      children: [
        {
          path: 'mi-perfil',
          name: 'mi-perfil',
          component: () => import('@/modules/socios/views/SocioDashboard.vue'),
        },
        {
          path: 'inversiones',
          name: 'inversiones',
          component: () => import('@/modules/inversiones/views/InversionesList.vue'),
        },
        {
          path: 'inversiones/:idInversion/movimientos',
          name: 'movimientos',
          component: () => import('@/modules/movimientos/views/MovimientosList.vue'),
          props: (route) => ({ idInversion: Number(route.params.idInversion) }),
        },
        {
          path: 'movimientos/crear',
          name: 'movimientos-crear',
          component: () => import('@/modules/movimientos/views/MovimientoCreateView.vue'),
        },
        {
          path: 'movimientos/copiar',
          name: 'movimientos-copiar',
          component: () => import('@/modules/movimientos/views/MovimientoCreateView.vue'),
        },
        {
          path: 'movimientos/:idMovimiento/actividades',
          name: 'actividades',
          component: () => import('@/modules/actividades/views/ActividadesDashboard.vue'),
          props: (route) => ({ idMovimiento: Number(route.params.idMovimiento) }),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: [noAutenticadoGuard],
      component: () => import('@/modules/auth/views/LoginView.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // cualquier ruta que no exista
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

export default router;
