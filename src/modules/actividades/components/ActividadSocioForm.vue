<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-1">
      <label for="socio" class="form-label">Socio</label>
      <input v-model="socio" type="number" class="form-control" id="socio" placeholder="Socio" />
    </div>

    <div class="mb-1">
      <label for="cantidad" class="form-label">Cantidad</label>
      <input
        v-model="cantidad"
        type="decimal"
        class="form-control"
        id="cantidad"
        placeholder="Cantidad"
      />
    </div>

    <div class="mb-1">
      <label for="monto" class="form-label">Monto</label>
      <input v-model="monto" type="decimal" class="form-control" id="monto" placeholder="Monto" />
    </div>

    <div class="mb-1">
      <label for="fechaHora" class="form-label">Fecha y Hora</label>
      <input
        v-model="fechaHora"
        type="datetime-local"
        class="form-control"
        id="fechaHora"
        placeholder="fechaHora"
      />
    </div>

    <div class="mb-1">
      <label for="tipo-actividad" class="form-label">Tipo Actividad</label>
      <select v-model="tipoActividad" id="tipo-actividad" class="form-select">
        <option
          v-for="tipoActividad in tipoActividades"
          :key="tipoActividad.idTipoActividad"
          :value="tipoActividad.tipoActividad"
        >
          {{ tipoActividad.tipoActividad }}
        </option>
      </select>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { getTipoActividades } from '@/common/services/tipo-actividad.service';
import { useQuery } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';

const { handleSubmit, defineField } = useForm();

const [socio] = defineField('socio');
const [cantidad] = defineField('cantidad');
const [monto] = defineField('monto');
const [fechaHora] = defineField('fechaHora');
const [tipoActividad] = defineField('tipo-actividad');

const onSubmit = handleSubmit(() => {});

const { data: tipoActividades = [] } = useQuery({
  queryKey: ['tipoActividades'],
  queryFn: async () => {
    return await getTipoActividades();
  },
});
</script>
