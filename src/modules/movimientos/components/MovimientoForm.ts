import { useCatalogos } from '@/common/composables/useCatalogos';
import type { ErrorB95Api } from '@/common/interfaces/error.b95api.interface';
import {
  getMovimientoById,
  saveMovimiento,
  updateMovimiento,
} from '@/common/services/movimiento-service';
import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';
import { useForm } from 'vee-validate';
import { defineComponent, watch, type PropType } from 'vue';
import { useRouter } from 'vue-router';
import type { Movimiento } from '../interfaces/movimiento.interface';

export default defineComponent({
  props: {
    idMovimiento: {
      type: Number,
      required: false,
    },
    actividadesSocios: {
      type: Array as PropType<ActividadSocio[]>,
      required: false,
    },
  },
  emits: ['send-update-status'],
  setup(props, { emit }) {
    const router = useRouter();

    const { categorias, monedas, medidas } = useCatalogos();

    const { handleSubmit, defineField } = useForm();

    const [categoria] = defineField('categoria');
    const [concepto] = defineField('concepto');
    const [moneda] = defineField('moneda');
    const [medida] = defineField('medida');

    watch(
      () => props.idMovimiento,
      async (idMovimiento) => {
        if (idMovimiento) {
          const movimiento = await getMovimientoById(idMovimiento);
          categoria.value = movimiento.idCategoria;
          concepto.value = movimiento.concepto;
          moneda.value = movimiento.idMoneda;
          medida.value = movimiento.idMedida;
        }
      },
    );

    const onSubmit = handleSubmit(async () => {
      // Obtener ID de la inversion para el registro/modificación del movimiento
      const idInversionState: number = Number(sessionStorage.getItem('state-id-inversion'));

      // Eliminar ID provisional de actividades nuevas (POST)
      const actividadesSendAPI = props.actividadesSocios?.map((actividadSocio) => {
        return {
          socio: actividadSocio.socio,
          cantidad: actividadSocio.cantidad,
          monto: actividadSocio.monto,
          fecha: actividadSocio.fecha,
          tipoActividad: actividadSocio.tipoActividad,
        };
      });

      // Objeto Movimiento a enviar
      const movimientoSendAPI: Movimiento = {
        inversion: idInversionState,
        categoria: categoria.value,
        concepto: concepto.value,
        moneda: moneda.value,
        medida: medida.value,
        actividades: actividadesSendAPI ?? [],
      };

      // Enviar Movimiento al API
      try {
        if (!props.idMovimiento) {
          await saveMovimiento(movimientoSendAPI);
          router.replace({ name: 'movimientos', params: { idInversion: idInversionState } });
        } else {
          await updateMovimiento(Number(props.idMovimiento), movimientoSendAPI);
          emit('send-update-status', 'update-movimiento-ok');
        }
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
