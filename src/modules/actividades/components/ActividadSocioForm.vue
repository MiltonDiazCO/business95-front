<template>
  <form @submit.prevent="onSubmit" :id="props.idForm">
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
import type { ErrorB95Api } from '@/common/interfaces/error.b95api.interface';
import { saveActividades } from '@/common/services/actividad-service';
import { useForm } from 'vee-validate';
import { watch } from 'vue';
import type { ActividadSocio } from '../interfaces/actividad.socio.interface';

interface Props {
  idForm: string;
  idMovimiento?: number;
  actividadSocio?: ActividadSocio;
}

const props = defineProps<Props>();

const { handleSubmit, defineField, resetForm } = useForm();

const { tipoActividades } = useCatalogos();

const [socio] = defineField('socio');
const [cantidad] = defineField('cantidad');
const [monto] = defineField('monto');
const [fechaHora] = defineField('fechaHora');
const [tipoActividad] = defineField('tipo-actividad');

watch(
  () => props.actividadSocio,
  (actividad) => {
    if (actividad) {
      socio.value = props.actividadSocio?.idSocio;
      cantidad.value = props.actividadSocio?.cantidad;
      monto.value = props.actividadSocio?.monto;
      fechaHora.value = props.actividadSocio?.fecha;
      tipoActividad.value = props.actividadSocio?.idTipoActividad;
    }
  },
);

socio.value = props.actividadSocio?.socio;

const emit = defineEmits<{
  (e: 'send-actividad-socio', value: ActividadSocio): void;
}>();

const onSubmit = handleSubmit(async () => {
  const actividad: ActividadSocio = {
    idActividad: props.actividadSocio?.idActividad,
    idSocio: socio.value,
    socio: socio.value,
    cantidad: cantidad.value,
    monto: monto.value,
    fecha: fechaHora.value,
    idTipoActividad: tipoActividad.value,
    tipoActividad: tipoActividad.value,
  };

  if (
    props.idMovimiento &&
    !String(actividad.idActividad).toLowerCase().includes('S'.toLowerCase())
  ) {
    try {
      await saveActividades(Number(props.idMovimiento), [actividad]);
    } catch (error) {
      console.log((error as ErrorB95Api).errores);
    }
  }

  emit('send-actividad-socio', actividad);
  resetForm();
});
</script>
