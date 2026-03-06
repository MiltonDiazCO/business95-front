import { getCategorias } from '@/modules/catalogos/services/categoria-service';
import { getMedidas } from '@/modules/catalogos/services/medida-service';
import { getMonedas } from '@/modules/catalogos/services/moneda-service';
import { getTipoActividades } from '@/modules/catalogos/services/tipo-actividad-service';
import { useQuery } from '@tanstack/vue-query';

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
