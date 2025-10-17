import { b95Api } from '@/api/b95';
import type { TipoActividad } from '../interfaces/tipo.actividad.interface';
import { handleAxiosError } from '../utils/handle.axios.error';

export const getTipoActividades = async () => {
  try {
    const { data } = await b95Api.get<TipoActividad[]>(`/tipo-actividades`);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
