import { b95Api } from '@/api/b95';
import type { Movimiento } from '@/modules/movimientos/interfaces/movimiento.interface';
import { handleAxiosError } from '../utils/handle.axios.error';
import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';

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
    throw handleAxiosError(error);
  }
};

export const getActividadesPorMovimiento = async (idMovimiento: number) => {
  try {
    const {
      data: { actividades },
    } = await b95Api.get<Movimiento>(`movimientos/${idMovimiento}`);
    return actividades;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
