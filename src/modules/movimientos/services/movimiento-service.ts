import { b95Api } from '@/api/b95.ts';
import type { PageResponse } from '@/common/interfaces/page.response.interface';
import type { MovimientoBalance } from '@/modules/movimientos/interfaces/movimiento.balance.interface';
import type { Movimiento } from '@/modules/movimientos/interfaces/movimiento.interface';
import { obtenerB95ApiError } from '@/utils/handle.axios.error';
import type { MovimientoBalancesSocios } from '../interfaces/movimiento.balances.interface';
import type { PageControl } from '@/common/interfaces/page.control.interface';

export const saveMovimiento = async (movimiento: Movimiento) => {
  try {
    const { data } = await b95Api.post<Movimiento>(`/movimientos`, movimiento);
    return data;
  } catch (error) {
    throw obtenerB95ApiError(error);
  }
};

export const updateMovimiento = async (idMovimiento: number, movimiento: Movimiento) => {
  try {
    const { data } = await b95Api.put<Movimiento>(`/movimientos/${idMovimiento}`, movimiento);
    return data;
  } catch (error) {
    throw obtenerB95ApiError(error);
  }
};

export const getMovimientoById = async (idMovimiento: number) => {
  try {
    const { data } = await b95Api.get<Movimiento>(`movimientos/${idMovimiento}`);
    return data;
  } catch (error) {
    throw obtenerB95ApiError(error);
  }
};

export const getMovimientosPorInversion = async (idInversion: number, paginador: PageControl) => {
  try {
    const { data } = await b95Api.get<PageResponse<MovimientoBalance>>(
      `/inversiones/${idInversion}/movimientos?pagina=${paginador.pagina}&limite=${paginador.limite}`,
    );

    return data;
  } catch (error) {
    throw obtenerB95ApiError(error);
  }
};

export const getBalanceSociosPorMovimiento = async (idMovimiento: number) => {
  try {
    const { data } = await b95Api.get<MovimientoBalancesSocios>(
      `movimientos/${idMovimiento}/balance-socios`,
    );

    return data;
  } catch (error) {
    throw obtenerB95ApiError(error);
  }
};
