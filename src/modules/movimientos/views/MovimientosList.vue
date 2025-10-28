<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <router-link
          :to="{ name: 'movimientos-crear', state: { idInversion: props.idInversion } }"
          class="btn btn-principal mt-2"
        >
          Nuevo Movimiento <i class="bi bi-plus-circle-fill"></i>
        </router-link>

        <div class="table-responsive">
          <table class="table table-striped table-hover table-bordered mt-2">
            <thead>
              <tr>
                <th scope="col" class="text-center">ID</th>
                <th scope="col">Categoria</th>
                <th scope="col">Concepto</th>
                <th scope="col" class="text-end">Cantidad</th>
                <th scope="col" class="text-end">Balance</th>
                <th scope="col">Fecha Última Actividad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movimiento in movimientos" :key="movimiento.idMovimiento">
                <td scope="row" class="text-center">{{ movimiento.idMovimiento }}</td>
                <td>{{ movimiento.categoria }}</td>
                <td>{{ movimiento.concepto }}</td>
                <td class="text-end">
                  {{ movimiento.cantidadMovimiento }} {{ movimiento.medida }}
                </td>
                <td class="text-end">
                  {{ formatoDecimal().format(movimiento.balanceMovimiento) }}
                  {{ movimiento.moneda }}
                </td>
                <td>{{ movimiento.fechaUltimaActividad }}</td>
                <td class="text-center">
                  <button
                    type="button"
                    class="bg-transparent border-0 me-2"
                    title="Modificar Detalle del Movimiento"
                    data-bs-toggle="modal"
                    data-bs-target="#movimiento-form-modal"
                    @click="idMovimiento = movimiento.idMovimiento"
                  >
                    <i class="bi bi-pencil-square color-principal"></i>
                  </button>

                  <router-link :to="{ name: 'movimientos-actualizar' }" title="Menú de Actividades">
                    <i class="bi bi-arrow-left-right color-principal"></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <MovimientoModalForm :id-movimiento="idMovimiento" @send-update-status="receiveUpdateStatus" />
</template>

<script lang="ts" setup>
import { formatoDecimal } from '@/common/utils/formato.moneda';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMovimientosPorInversion } from '../../../common/services/movimiento-service';
import MovimientoModalForm from '../components/MovimientoModalForm.vue';

const route = useRoute();
const idMovimiento = ref(0);

sessionStorage.setItem('state-id-inversion', String(route.params.idInversion));

interface Props {
  idInversion: number;
}

const props = defineProps<Props>();

const { data: movimientos = [], refetch } = useQuery({
  queryKey: ['movimientos'],
  queryFn: async () => {
    return await getMovimientosPorInversion(props.idInversion);
  },
});

const receiveUpdateStatus = (status: string) => {
  if (status.toLowerCase().includes('OK'.toLowerCase())) {
    refetch();
  }
};
</script>
