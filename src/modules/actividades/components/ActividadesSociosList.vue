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
        <tr v-for="actividadSocio in actividadesSocios" :key="actividadSocio.tipoActividad">
          <td>{{ actividadSocio.socio }}</td>
          <td>{{ actividadSocio.cantidad }}</td>
          <td>{{ formatoMoneda.format(actividadSocio.monto) }}</td>
          <td>{{ actividadSocio.fecha }}</td>
          <td>{{ actividadSocio.tipoActividad }}</td>
          <td>
            <i
              @click="deleteActividadSocio(actividadSocio.idActividad ?? 0)"
              class="bi bi-trash color-principal"
              title="Eliminar"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';
import { formatoMoneda } from '@/common/utils/formato.moneda';

interface Props {
  actividadesSocios: ActividadSocio[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'changeActividadesSocios', value: ActividadSocio[]): void;
}>();

let actividadesSocios: ActividadSocio[] = props.actividadesSocios;

const deleteActividadSocio = (idActividadSocio: number) => {
  actividadesSocios = actividadesSocios.filter((actividadSocio) => {
    return actividadSocio.idActividad !== idActividadSocio;
  });

  emit('changeActividadesSocios', actividadesSocios);
};
</script>
