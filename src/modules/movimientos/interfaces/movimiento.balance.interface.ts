export interface MovimientoBalance {
  idMovimiento: number;
  concepto: string;
  categoria: string;
  cantidadMovimiento: number;
  medida?: string;
  balanceMovimiento: number;
  moneda: string;
  fechaUltimaActividad: Date;
}
