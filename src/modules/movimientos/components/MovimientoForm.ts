import { useCatalogos } from '@/common/composables/useCatalogos';
import type { ErrorB95Api } from '@/common/interfaces/error.b95api.interface';
import { saveMovimiento } from '@/common/services/movimiento-service';
import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';
import { useForm } from 'vee-validate';
import { defineComponent, type PropType } from 'vue';
import type { Movimiento } from '../interfaces/movimiento.interface';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    actividadesSocios: {
      type: Array as PropType<ActividadSocio[]>,
    },
  },
  setup(props) {
    const router = useRouter();

    const { handleSubmit, defineField } = useForm();

    const [categoria] = defineField('categoria');
    const [concepto] = defineField('concepto');
    const [moneda] = defineField('moneda');
    const [medida] = defineField('medida');

    const { categorias, monedas, medidas } = useCatalogos();

    const onSubmit = handleSubmit(async () => {
      const idInversionState: number = Number(sessionStorage.getItem('state-id-inversion'));

      const actividadesPost = props.actividadesSocios?.map((actividadSocio) => {
        return {
          socio: actividadSocio.socio,
          cantidad: actividadSocio.cantidad,
          monto: actividadSocio.monto,
          fecha: actividadSocio.fecha,
          tipoActividad: actividadSocio.tipoActividad,
        };
      });

      const movimientoPost: Movimiento = {
        inversion: idInversionState,
        categoria: categoria.value,
        concepto: concepto.value,
        moneda: moneda.value,
        medida: medida.value,
        actividades: actividadesPost ?? [],
      };

      try {
        await saveMovimiento(movimientoPost);
        router.replace({ name: 'movimientos', params: { idInversion: idInversionState } });
      } catch (error: unknown) {
        const errorApi = error as ErrorB95Api;
        errorApi.errores.forEach((error) => {
          console.log(error);
        });
      }
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
