export interface ActividadSocio {
  idActividad?: number | string;
  idSocio: number;
  socio?: string;
  cantidad: number;
  monto: number;
  fecha: string;
  idTipoActividad: number;
  tipoActividad?: string;
}
