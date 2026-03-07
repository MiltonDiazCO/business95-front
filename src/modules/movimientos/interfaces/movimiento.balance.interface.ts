export interface MovimientoBalance {
  idMovimiento: number;
  concepto: string;
  categoria: string;
  cantidad: number;
  medida?: string;
  balance: number;
  moneda: string;
  fechaApertura: Date;
  fechaUltimaActividad: Date;
}
