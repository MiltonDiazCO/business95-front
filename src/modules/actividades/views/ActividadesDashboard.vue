<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5 col-lg-5"></div>
      <div class="col-md-7 col-lg-7 my-2">
        <button class="btn btn-principal mb-2">
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
</template>

<script lang="ts" setup>
import { getActividadesPorMovimiento } from '@/common/services/actividad-service';
import ActividadesSociosList from '../components/ActividadesSociosList.vue';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';

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
