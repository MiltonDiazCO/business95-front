<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5 col-lg-5"></div>
      <div class="col-md-7 col-lg-7 my-2">
        <button
          type="button"
          class="btn btn-principal mb-2"
          data-bs-toggle="modal"
          data-bs-target="#actividadesFormModal"
        >
          Nueva Actividad <i class="bi bi-plus-circle-fill"></i>
        </button>

        <ActividadesSociosList
          :id-movimiento="props.idMovimiento"
          :actividades-socios="actividades"
          @send-actividades-socios="refetch()"
        />
      </div>
    </div>
  </div>

  <ActividadesModalForm
    titulo="Agregar Actividad"
    :id-movimiento="props.idMovimiento"
    @send-actividad-socio="refetch()"
  />
</template>

<script lang="ts" setup>
import { getActividadesPorMovimiento } from '@/common/services/actividad-service';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import ActividadesModalForm from '../components/ActividadesModalForm.vue';
import ActividadesSociosList from '../components/ActividadesSociosList.vue';

interface Props {
  idMovimiento: number;
}

const props = defineProps<Props>();

const { data, refetch } = useQuery({
  queryKey: ['actividades'],
  queryFn: async () => {
    return await getActividadesPorMovimiento(props.idMovimiento);
  },
});

const actividades = computed(() => data.value ?? []);
</script>
