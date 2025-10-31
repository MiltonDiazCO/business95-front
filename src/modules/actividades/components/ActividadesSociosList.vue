<template>
  <div class="table-responsive text-center">
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>Socio</th>
          <th>Cantidad</th>
          <th>Monto</th>
          <th>Fecha</th>
          <th>Tipo Actividad</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="actividadSocio in actividadesSocios" :key="actividadSocio.idActividad">
          <td>{{ actividadSocio.idSocio }}</td>
          <td>
            {{
              isNaN(actividadSocio.cantidad) ? 0 : formatoDecimal().format(actividadSocio.cantidad)
            }}
          </td>
          <td>
            {{ isNaN(actividadSocio.monto) ? 0 : formatoDecimal().format(actividadSocio.monto) }}
          </td>
          <td>{{ actividadSocio.fecha }}</td>
          <td>{{ actividadSocio.idTipoActividad }}</td>
          <td>
            <!-- Button de activar modal -->
            <button
              type="button"
              class="btn me-2 p-0"
              data-bs-toggle="modal"
              data-bs-target="#actividadesFormModal"
              style="border-color: transparent"
              title="Modificar"
              @click="obtenerActividadPorId(actividadSocio.idActividad ?? 0)"
            >
              <i class="bi bi-pencil-square color-principal"></i>
            </button>

            <!-- Button de eliminar -->
            <button
              @click="deleteActividadSocio(actividadSocio.idActividad ?? 0)"
              type="button"
              class="btn p-0"
              title="Eliminar"
            >
              <i class="bi bi-trash color-principal"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <ActividadesModalForm
    titulo="Modificar Actividad"
    :id-movimiento="props.idMovimiento"
    :actividad-socio="actividadSeleccionada"
    @send-actividad-socio="updateActividadById"
  />
</template>

<script lang="ts" setup>
import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';
import ActividadesModalForm from './ActividadesModalForm.vue';
import { formatoDecimal } from '@/common/utils/formato.moneda';
import { ref } from 'vue';

interface Props {
  idMovimiento?: number;
  actividadesSocios: ActividadSocio[];
}

const props = defineProps<Props>();

const actividadSeleccionada = ref<ActividadSocio>();

const obtenerActividadPorId = (idActividad: number | string) => {
  actividadSeleccionada.value = props.actividadesSocios.find((actividadSocio) => {
    return actividadSocio.idActividad === idActividad;
  });
};

const emit = defineEmits<{
  (e: 'send-actividades-socios', value: ActividadSocio[]): void;
}>();

const updateActividadById = (actividadSocio: ActividadSocio) => {
  emit(
    'send-actividades-socios',
    props.actividadesSocios.map((actividad) => {
      if (actividad.idActividad === actividadSocio.idActividad) {
        return {
          ...actividadSocio,
        };
      } else {
        return actividad;
      }
    }),
  );
};

const deleteActividadSocio = (idActividadSocio: number | string) => {
  emit(
    'send-actividades-socios',
    props.actividadesSocios.filter((actividadSocio) => {
      return actividadSocio.idActividad !== idActividadSocio;
    }),
  );
};
</script>
