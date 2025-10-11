import { b95Api } from '@/api/b95.ts';
import { handleAxiosError } from '@/common/utils/handle.axios.error';
import type { Movimiento } from '@/modules/movimientos/interfaces/movimiento.interface';

export const getMovimientosPorInversion = async (idInversion: number) => {
  try {
    const { data } = await b95Api.get<Movimiento[]>(`/inversiones/${idInversion}/movimientos`);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
