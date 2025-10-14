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
        </tr>
      </thead>
      <tbody>
        <tr v-for="actividadSocio in actividadesSocios" :key="actividadSocio.tipoActividad">
          <td>{{ actividadSocio.socio }}</td>
          <td>{{ actividadSocio.cantidad }}</td>
          <td>{{ formatoMoneda.format(actividadSocio.monto) }}</td>
          <td>{{ actividadSocio.fecha }}</td>
          <td>{{ actividadSocio.tipoActividad }}</td>
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

const actividadesSocios: ActividadSocio[] = props.actividadesSocios;
</script>
