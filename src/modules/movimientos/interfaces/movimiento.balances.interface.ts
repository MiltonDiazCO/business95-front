export interface MovimientoBalancesSocios {
  idMovimiento: number;
  inversion: string;
  concepto: string;
  categoria: string;
  cantidadMovimiento: number;
  medida: string;
  balanceMovimiento: number;
  moneda: string;
  balances: BalanceSocio[];
}

export interface BalanceSocio {
  socio: string;
  cantidadSocio: number;
  balanceSocio: number;
}
