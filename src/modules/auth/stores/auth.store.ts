import { b95Api } from '@/api/b95';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { EstadoAutenticacion } from '../interfaces/estado-autenticacion.enum';
import { obtenerB95AuthError } from '@/common/utils/handle.axios.error';

export const useAuthStore = defineStore('auth', () => {
  const estadoDeAutenticacion = ref<EstadoAutenticacion>(EstadoAutenticacion.VERIFICANDO);

  const login = async (correoElectronico: string, contrasena: string) => {
    try {
      const loginResponse = await b95Api.post('/login', {
        correoElectronico,
        contrasena,
      });

      localStorage.setItem('token', loginResponse.data.token);
      estadoDeAutenticacion.value = EstadoAutenticacion.AUTENTICADO;
    } catch (error) {
      throw obtenerB95AuthError(error);
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    estadoDeAutenticacion.value = EstadoAutenticacion.NO_AUTENTICADO;
  };

  const verificarEstadoDeAutenticacion = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token || token.length < 10) {
        return false;
      }

      const { status } = await b95Api.get('/socios/detalle');

      return (estadoDeAutenticacion.value =
        status === 200 ? EstadoAutenticacion.AUTENTICADO : EstadoAutenticacion.NO_AUTENTICADO);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // state
    estadoDeAutenticacion,

    // actions
    login,
    logout,
    verificarEstadoDeAutenticacion,
  };
});
