export interface BalanceSocio {
  socio: string;
  ingresos: number;
  gastos: number;
  balance: number;
  historialAnual: BalanceAnual[];
}

export interface BalanceAnual {
  annio: number;
  ingresos: number;
  gastos: number;
  balanceAnual: number;
}
