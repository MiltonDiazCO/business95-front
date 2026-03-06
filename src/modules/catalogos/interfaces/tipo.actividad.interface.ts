export interface TipoActividad {
  idTipoActividad: number;
  tipoActividad: string;
  descripcion: string;
  naturaleza: Naturaleza;
}

enum Naturaleza {
  Credito = 'CREDITO',
  Debito = 'DEBITO',
  NoFinanciero = 'NO_FINANCIERO',
}
