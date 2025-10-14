<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5 border rounded mx-3 my-2 p-2">
        <MovimientoForm v-if="route.name === 'movimientos-crear'" />
        <ActividadSocioForm class="border rounded mt-3 p-2" />

        <div class="col mt-2">
          <button
            v-if="route.name === 'movimientos-crear'"
            type="submit"
            form="form-movimientos"
            class="btn btn-sm btn-purple me-1"
          >
            Guardar <i class="bi bi-floppy"></i>
          </button>
          <button type="submit" form="form-actividades" class="btn btn-sm btn-purple">
            Agregar Actividad <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      <div class="col-md-7"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MovimientoForm from '@/modules/movimientos/components/MovimientoForm.vue';
import ActividadSocioForm from '@/modules/actividades/components/ActividadSocioForm.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
