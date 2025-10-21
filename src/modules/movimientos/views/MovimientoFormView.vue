<template>
  <div class="container-fluid">
    <div class="row mx-1">
      <div class="col-md-5 col-lg-5 border rounded my-2 p-2">
        <MovimientoForm
          v-if="route.name === 'movimientos-crear'"
          :actividadesSocios="actividadesSocios"
        />
        <ActividadSocioForm
          v-if="focusFormActividades === 'MovimientoForm'"
          @actividadSocio="addActividadSocio"
          class="border rounded mt-3 p-2"
        />

        <div class="col mt-2">
          <button
            v-if="route.name === 'movimientos-crear'"
            type="submit"
            form="form-movimientos"
            class="btn btn-sm btn-principal me-1"
          >
            Guardar <i class="bi bi-floppy"></i>
          </button>
          <button type="submit" form="form-actividades" class="btn btn-sm btn-principal">
            Agregar Actividad <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      <div class="col-md-7 col-lg-7 my-2">
        <ActividadesSociosList
          :actividadesSocios="actividadesSocios"
          :tituloModalFormActividades="tituloModalActividades"
          @changeActividadesSocios="refreshActividadesSocios"
          @changeFocusForm="refreshFocusFormActividades"
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
import { useRoute } from 'vue-router';

const route = useRoute();

const tituloModalActividades =
  route.name !== 'movimientos-crear' ? 'Nueva Actividad' : 'Modificar Actividad';

const actividadesSocios = ref<ActividadSocio[]>([]);

const addActividadSocio = (actividadSocio: ActividadSocio) => {
  actividadesSocios.value.push({
    idActividad: actividadesSocios.value.length + 1,
    socio: actividadSocio.socio,
    cantidad: actividadSocio.cantidad,
    monto: actividadSocio.monto,
    fecha: actividadSocio.fecha,
    tipoActividad: actividadSocio.tipoActividad,
  });
};

const refreshActividadesSocios = (actividadesNuevas: ActividadSocio[]) => {
  actividadesSocios.value = actividadesNuevas;
};

const focusFormActividades = ref('MovimientoForm');

const refreshFocusFormActividades = (page: string) => {
  focusFormActividades.value = page;
};
</script>
