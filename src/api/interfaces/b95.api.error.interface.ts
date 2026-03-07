export interface B95ApiError {
  mensaje: string;
  errores: string[];
  codigoEstado: number;
  ruta: string;
  fecha: Date;
}
