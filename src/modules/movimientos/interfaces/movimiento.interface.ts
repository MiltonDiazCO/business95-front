import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';

export interface Movimiento {
  inversion: number;
  concepto: string;
  categoria: number;
  moneda: string;
  medida: number;
  actividades: ActividadSocio[];
}
