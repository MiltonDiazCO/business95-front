<template>
  <form @submit.prevent="onSubmit" id="form-actividades">
    <div class="row">
      <div class="col mb-1">
        <label for="socio" class="form-label">Socio</label>
        <input v-model="socio" type="number" class="form-control" id="socio" placeholder="Socio" />
      </div>

      <div class="col mb-1">
        <label for="tipo-actividad" class="form-label">Tipo Actividad</label>
        <select v-model="tipoActividad" id="tipo-actividad" class="form-select">
          <option
            v-for="tipoActividad in tipoActividades"
            :key="tipoActividad.idTipoActividad"
            :value="tipoActividad.idTipoActividad"
            :title="tipoActividad.descripcion"
          >
            {{ tipoActividad.tipoActividad }}
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col mb-1">
        <label for="cantidad" class="form-label">Cantidad</label>
        <input
          v-model="cantidad"
          type="decimal"
          class="form-control"
          id="cantidad"
          placeholder="Cantidad"
        />
      </div>

      <div class="col mb-1">
        <label for="monto" class="form-label">Monto</label>
        <input v-model="monto" type="decimal" class="form-control" id="monto" placeholder="Monto" />
      </div>

      <div class="col mb-1">
        <label for="fechaHora" class="form-label">Fecha y Hora</label>
        <input
          v-model="fechaHora"
          type="datetime-local"
          class="form-control"
          id="fechaHora"
          placeholder="fechaHora"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useCatalogos } from '@/common/composables/useCatalogos';
import { useForm } from 'vee-validate';
import type { ActividadSocio } from '../interfaces/actividad.socio.interface';

const { handleSubmit, defineField, resetForm } = useForm();

const [socio] = defineField('socio');
const [cantidad] = defineField('cantidad');
const [monto] = defineField('monto');
const [fechaHora] = defineField('fechaHora');
const [tipoActividad] = defineField('tipo-actividad');

const { tipoActividades } = useCatalogos();

const emit = defineEmits<{
  (e: 'actividadSocio', value: ActividadSocio): void;
}>();

const onSubmit = handleSubmit(() => {
  const actividad: ActividadSocio = {
    socio: socio.value,
    cantidad: cantidad.value,
    monto: monto.value,
    fecha: fechaHora.value,
    tipoActividad: tipoActividad.value,
  };

  emit('actividadSocio', actividad);

  resetForm();
});
</script>
