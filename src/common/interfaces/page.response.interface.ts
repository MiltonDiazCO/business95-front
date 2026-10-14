export interface PageResponse<T> {
  contenido: T[];
  pagina: number
  limite: number
  elementosEnPagina: number
  totalPaginas: number
  totalElementos: number
  esPrimeraPagina: boolean
  esUltimaPagina: boolean
}
