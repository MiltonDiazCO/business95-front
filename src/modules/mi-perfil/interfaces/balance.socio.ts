export interface BalanceSocio {
  socio: string;
  ingresos: number;
  gastos: number;
  balanceSocio: number;
  balances: BalancesAnuales[];
}

export interface BalancesAnuales {
  annio: number;
  ingresos: number;
  gastos: number;
  balanceAnual: number;
}
