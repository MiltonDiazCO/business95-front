import { b95Api } from '@/api/b95';
import { handleAxiosError } from '@/common/utils/handle.axios.error';
import type { TipoActividad } from '@/modules/catalogos/interfaces/tipo.actividad.interface';

export const getTipoActividades = async () => {
  try {
    const { data } = await b95Api.get<TipoActividad[]>(`/tipo-actividades`);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
