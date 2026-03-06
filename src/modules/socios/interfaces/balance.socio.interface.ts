export interface BalanceSocio {
  socio: string;
  ingresos: number;
  gastos: number;
  balanceSocio: number;
  balances: BalanceAnual[];
}

export interface BalanceAnual {
  annio: number;
  ingresos: number;
  gastos: number;
  balanceAnual: number;
}
