<template>
  <div
    class="modal fade"
    id="movimiento-form-modal"
    tabindex="-1"
    aria-labelledby="movimiento-form-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="movimiento-form-modal">Modal title</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <MovimientoForm
            :id-movimiento="props.idMovimiento"
            @send-update-status="sendSaveorUpdateStatus"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button
            type="submit"
            form="form-movimientos"
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
import MovimientoForm from './MovimientoForm.vue';

interface Props {
  idMovimiento: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'send-update-status', value: string): void;
}>();

const sendSaveorUpdateStatus = (status: string) => {
  emit('send-update-status', status);
};
</script>
