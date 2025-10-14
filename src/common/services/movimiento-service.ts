import { b95Api } from '@/api/b95.ts';
import { handleAxiosError } from '@/common/utils/handle.axios.error';
import type { MovimientoBalance } from '@/modules/movimientos/interfaces/movimiento.balance.interface';
import type { Movimiento } from '@/modules/movimientos/interfaces/movimiento.interface';

export const saveMovimiento = async (movimiento: Movimiento) => {
  try {
    const { data } = await b95Api.post<Movimiento>('/movimientos', movimiento);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const getMovimientosPorInversion = async (idInversion: number) => {
  try {
    const { data } = await b95Api.get<MovimientoBalance[]>(
      `/inversiones/${idInversion}/movimientos`,
    );
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
