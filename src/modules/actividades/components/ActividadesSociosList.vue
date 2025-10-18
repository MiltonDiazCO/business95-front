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
            <!-- Button de activar modal -->
            <button
              type="button"
              class="btn me-2 p-0"
              data-bs-toggle="modal"
              data-bs-target="#actividadesFormModal"
              style="border-color: transparent"
              title="Modificar"
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

  <!-- Modal -->
  <div
    class="modal fade"
    id="actividadesFormModal"
    tabindex="-1"
    aria-labelledby="actividadesFormModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="actividadesFormModal">
            {{ props.tituloModalFormActividades }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          ></button>
        </div>
        <div class="modal-body">
          <ActividadSocioForm />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-principal">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';
import ActividadSocioForm from '@/modules/actividades/components/ActividadSocioForm.vue';
import { formatoMoneda } from '@/common/utils/formato.moneda';

interface Props {
  actividadesSocios: ActividadSocio[];
  tituloModalFormActividades: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'changeActividadesSocios', value: ActividadSocio[]): void;
}>();

const deleteActividadSocio = (idActividadSocio: number) => {
  emit(
    'changeActividadesSocios',
    props.actividadesSocios.filter((actividadSocio) => {
      return actividadSocio.idActividad !== idActividadSocio;
    }),
  );
};
</script>
