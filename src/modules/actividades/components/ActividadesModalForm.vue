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
            {{ !props.actividadSocio?.idActividad ? 'Agregar Actividad' : 'Modifcar Actividad' }}
          </h1>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          ></button>
        </div>

        <div class="modal-body">
          <ActividadSocioForm
            id-form="form-actividades-modal"
            :id-movimiento="props.idMovimiento"
            :actividad-socio="props.actividadSocio"
            @send-actividad-socio="sendActividadSocio"
          />
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

          <button
            type="submit"
            form="form-actividades-modal"
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
  idMovimiento?: number;
  actividadSocio?: ActividadSocio;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'send-actividad-socio', value: ActividadSocio): void;
}>();

const sendActividadSocio = (actividad: ActividadSocio) => {
  emit('send-actividad-socio', actividad);
};
</script>
