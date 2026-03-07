import type { B95ApiError } from '@/api/interfaces/b95.api.error.interface';
import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';
import { useCatalogos } from '@/modules/catalogos/composables/useCatalogos';
import {
  getMovimientoById,
  saveMovimiento,
  updateMovimiento,
} from '@/modules/movimientos/services/movimiento-service';
import { useForm } from 'vee-validate';
import { defineComponent, watch, type PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
    const route = useRoute();
    const router = useRouter();

    const { categorias, monedas, medidas } = useCatalogos();

    const { handleSubmit, defineField } = useForm();

    const [categoria] = defineField('categoria');
    const [concepto] = defineField('concepto');
    const [moneda] = defineField('moneda');
    const [medida] = defineField('medida');

    const fillMovimientoForm = async (idMovimiento: number) => {
      const movimiento = await getMovimientoById(idMovimiento);
      categoria.value = movimiento.idCategoria;
      concepto.value = movimiento.concepto;
      moneda.value = movimiento.idMoneda;
      medida.value = movimiento.idMedida;
    };

    // Completa el formulario de creación a partir de un registro existente por ID
    if (route.name === 'movimientos-copiar') {
      fillMovimientoForm(Number(sessionStorage.getItem('state-id-movimiento-copiar')));
    }

    // rellenar formulario de edición
    watch(
      () => props.idMovimiento,
      async (idMovimiento) => {
        if (idMovimiento) {
          fillMovimientoForm(idMovimiento);
        }
      },
    );

    const onSubmit = handleSubmit(async () => {
      // Obtener ID de la inversion para el registro/modificación del movimiento
      const idInversionState: number = Number(sessionStorage.getItem('state-id-inversion'));

      // Eliminar ID provisional de actividades nuevas (POST)
      const actividadesSendAPI = props.actividadesSocios?.map((actividadSocio) => {
        return {
          idSocio: actividadSocio.idSocio,
          socio: String(actividadSocio.idSocio),
          cantidad: actividadSocio.cantidad,
          monto: actividadSocio.monto,
          fecha: actividadSocio.fecha,
          idTipoActividad: actividadSocio.idTipoActividad,
          tipoActividad: String(actividadSocio.tipoActividad),
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
        // Guardar cuando el idMovimiento de las props es null
        if (!props.idMovimiento) {
          await saveMovimiento(movimientoSendAPI);
          router.replace({ name: 'movimientos', params: { idInversion: idInversionState } });
        } else {
          await updateMovimiento(Number(props.idMovimiento), movimientoSendAPI);
          emit('send-update-status', 'update-movimiento-ok');
        }
      } catch (error: unknown) {
        const errorApi = error as B95ApiError;
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
