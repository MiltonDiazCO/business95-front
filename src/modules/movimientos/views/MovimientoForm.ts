import { getCategorias } from '@/common/services/categoria-service';
import { getMedidas } from '@/common/services/medida-service';
import { getMonedas } from '@/common/services/moneda-service';
import { useQuery } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { defineComponent } from 'vue';
import ActividadSocioForm from '@/modules/actividades/components/ActividadSocioForm.vue';

export default defineComponent({
  components: {
    ActividadSocioForm,
  },
  setup() {
    const { handleSubmit, defineField } = useForm();

    const [categoria] = defineField('categoria');
    const [concepto] = defineField('concepto');
    const [moneda] = defineField('moneda');
    const [medida] = defineField('medida');

    const onSubmit = handleSubmit(() => {
      console.log('OK');
    });

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

    return {
      onSubmit,

      categoria,
      concepto,
      moneda,
      medida,

      categorias,
      monedas,
      medidas,
    };
  },
});
