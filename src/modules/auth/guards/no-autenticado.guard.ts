import { useAuthStore } from '@/modules/auth/stores/auth.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { EstadoAutenticacion } from '../interfaces/estado-autenticacion.enum';

const noAutenticadoGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  await authStore.verificarEstadoDeAutenticacion();

  if (authStore.estadoDeAutenticacion === EstadoAutenticacion.AUTENTICADO) {
    return next({ name: 'mi-perfil' });
  }

  next();
};

export default noAutenticadoGuard;
