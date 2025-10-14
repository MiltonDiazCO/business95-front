import { getCategorias } from '@/common/services/categoria-service';
import { getMedidas } from '@/common/services/medida-service';
import { getMonedas } from '@/common/services/moneda-service';
import { useQuery } from '@tanstack/vue-query';
import { getTipoActividades } from '../services/tipo-actividad.service';

export const useCatalogos = () => {
  const { data: categorias = [] } = useQuery({
    queryKey: ['categorias'],
    queryFn: async () => {
      return await getCategorias();
    },
  });

  const { data: monedas = [] } = useQuery({
    queryKey: ['monedas'],
    queryFn: async () => {
      return await getMonedas();
    },
  });

  const { data: medidas = [] } = useQuery({
    queryKey: ['medidas'],
    queryFn: async () => {
      return await getMedidas();
    },
  });

  const { data: tipoActividades = [] } = useQuery({
    queryKey: ['tipoActividades'],
    queryFn: async () => {
      return await getTipoActividades();
    },
  });

  return {
    categorias,
    monedas,
    medidas,
    tipoActividades,
  };
};
