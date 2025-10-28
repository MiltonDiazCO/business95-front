import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';

export interface Movimiento {
  idMovimiento?: number;
  idInversion?: number;
  inversion: number;
  concepto: string;
  idCategoria?: number;
  categoria: number;
  idMoneda?: number;
  moneda: string;
  idMedida?: number;
  medida: number;
  actividades: ActividadSocio[];
}
