import { b95Api } from '@/api/b95';
import { obtenerB95ApiError } from '@/utils/handle.axios.error';
import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';
import type { MovimientoBalancesSocios } from '@/modules/movimientos/interfaces/movimiento.balances.interface';
import type { Movimiento } from '@/modules/movimientos/interfaces/movimiento.interface';

export const saveActividades = async (
  idMovimiento: number,
  actividadesSocios: ActividadSocio[],
) => {
  try {
    const method = actividadesSocios[0]?.idActividad ? 'put' : 'post';
    const data = await b95Api[method]<ActividadSocio[]>(
      `movimientos/${idMovimiento}/actividades`,
      actividadesSocios,
    );
    return data;
  } catch (error) {
    throw obtenerB95ApiError(error);
  }
};

export const deleteActividades = async (idMovimiento: number, idActividades: number[]) => {
  try {
    await b95Api.delete(`movimientos/${idMovimiento}/actividades`, { data: idActividades });
  } catch (error) {
    throw obtenerB95ApiError(error);
  }
};

export const getActividadesPorMovimiento = async (idMovimiento: number) => {
  try {
    const {
      data: { actividades },
    } = await b95Api.get<Movimiento>(`movimientos/${idMovimiento}`);
    return actividades;
  } catch (error) {
    throw obtenerB95ApiError(error);
  }
};

export const getBalanceSociosPorMovimiento = async (idMovimiento: number) => {
  try {
    const { data } = await b95Api.get<MovimientoBalancesSocios>(
      `movimientos/${idMovimiento}/actividades/balance`,
    );
    return data;
  } catch (error) {
    throw obtenerB95ApiError(error);
  }
};
