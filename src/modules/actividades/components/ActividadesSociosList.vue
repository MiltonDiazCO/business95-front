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
          <td>{{ actividadSocio.socio }}</td>
          <td>{{ actividadSocio.cantidad }}</td>
          <td>{{ formatoMoneda.format(actividadSocio.monto) }}</td>
          <td>{{ actividadSocio.fecha }}</td>
          <td>{{ actividadSocio.tipoActividad }}</td>
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
    :actividad-socio="actividadSeleccionada"
    @close-modal="closeModal"
  />
</template>

<script lang="ts" setup>
import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';
import ActividadesModalForm from './ActividadesModalForm.vue';
import { formatoMoneda } from '@/common/utils/formato.moneda';
import { ref } from 'vue';

interface Props {
  actividadesSocios: ActividadSocio[];
  tituloModalFormActividades: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'refreshActividadesSocios', value: ActividadSocio[]): void;
  (e: 'changeFocusForm', value: string): void;
}>();

const deleteActividadSocio = (idActividadSocio: number | string) => {
  emit(
    'refreshActividadesSocios',
    props.actividadesSocios.filter((actividadSocio) => {
      return actividadSocio.idActividad !== idActividadSocio;
    }),
  );
};

const actividadSeleccionada = ref<ActividadSocio>();

const obtenerActividadPorId = (idActividad: number | string) => {
  actividadSeleccionada.value = props.actividadesSocios.find((actividadSocio) => {
    return actividadSocio.idActividad === idActividad;
  });

  emit('changeFocusForm', 'Modal');
};

const closeModal = (visibilidad: string) => {
  emit('changeFocusForm', visibilidad);
};
</script>
