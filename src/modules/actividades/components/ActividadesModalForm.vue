<template>
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
            {{ props.titulo }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          ></button>
        </div>
        <div class="modal-body">
          <ActividadSocioForm :actividad-socio="props.actividadSocio" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button
            type="submit"
            form="form-actividades"
            class="btn btn-principal"
            data-bs-dismiss="modal"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ActividadSocioForm from '@/modules/actividades/components/ActividadSocioForm.vue';
import type { ActividadSocio } from '../interfaces/actividad.socio.interface';

interface Props {
  titulo: string;
  actividadSocio?: ActividadSocio;
}

const props = defineProps<Props>();
</script>
