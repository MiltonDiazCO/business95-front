<template>
  <div class="container-fluid">
    <div class="row mx-1">
      <!-- Columna Izquierda -->
      <div class="col-md-5 col-lg-5 border rounded my-2 p-2">
        <MovimientoForm :actividadesSocios="actividadesSocios" />

        <ActividadSocioForm
          idForm="form-actividades"
          @send-actividad-socio="addActividadSocio"
          class="border rounded mt-3 p-2"
        />

        <!-- Botones -->
        <div class="col mt-2">
          <button type="submit" form="form-movimientos" class="btn btn-sm btn-principal me-1">
            Guardar y Salir <i class="bi bi-floppy"></i>
          </button>

          <button type="submit" form="form-actividades" class="btn btn-sm btn-principal">
            Agregar Actividad <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      <!-- Columan Derecha -->
      <div class="col-md-7 col-lg-7 my-2">
        <ActividadesSociosList
          :actividadesSocios="actividadesSocios"
          @send-actividades-socios="refreshActividadesSocios"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ActividadesSociosList from '@/modules/actividades/components/ActividadesSociosList.vue';
import ActividadSocioForm from '@/modules/actividades/components/ActividadSocioForm.vue';
import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';
import MovimientoForm from '@/modules/movimientos/components/MovimientoForm.vue';
import { ref } from 'vue';

const actividadesSocios = ref<ActividadSocio[]>([]);

const addActividadSocio = (actividadSocio: ActividadSocio) => {
  actividadesSocios.value.push({
    ...actividadSocio,
    idActividad: 'S' + Date.now(),
  });
};

const refreshActividadesSocios = (actividadesActualizadas: ActividadSocio[]) => {
  actividadesSocios.value = actividadesActualizadas;
};
</script>
