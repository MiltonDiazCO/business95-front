import type { ActividadSocio } from '@/modules/actividades/interfaces/actividad.socio.interface';
import { ref } from 'vue';

const actividadSeleccionada = ref<ActividadSocio>();

const obtenerActividadPorId = (idActividad: number | string) => {
  actividadSeleccionada.value = props.actividadesSocios.find((actividadSocio) => {
    return actividadSocio.idActividad === idActividad;
  });
};
