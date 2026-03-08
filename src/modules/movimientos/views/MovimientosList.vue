<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <router-link :to="{ name: 'movimientos-crear' }" class="btn btn-principal mt-2">
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
                <th scope="col">Fecha Apertura</th>
                <th scope="col">Fecha Última Actividad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movimiento in data?.content" :key="movimiento.idMovimiento">
                <td scope="row" class="text-center">{{ movimiento.idMovimiento }}</td>
                <td>{{ movimiento.categoria }}</td>
                <td>{{ movimiento.concepto }}</td>
                <td class="text-end">{{ movimiento.cantidad }} {{ movimiento.medida }}</td>
                <td class="text-end">
                  {{ formatoDecimal().format(movimiento.balance) }}
                  {{ movimiento.moneda }}
                </td>
                <td>{{ movimiento.fechaApertura }}</td>
                <td>{{ movimiento.fechaUltimaActividad }}</td>
                <td class="text-center p-1">
                  <button
                    type="button"
                    class="bg-transparent border-0"
                    title="Modificar Detalle del Movimiento"
                    data-bs-toggle="modal"
                    data-bs-target="#movimiento-form-modal"
                    @click="idMovimiento = movimiento.idMovimiento"
                  >
                    <i class="bi bi-pencil-square color-principal"></i>
                  </button>

                  <router-link
                    @click.prevent="getMovimientoParaCopiar(movimiento.idMovimiento)"
                    :to="{ name: 'movimientos-copiar' }"
                    class="mx-2"
                    title="Copiar Movimiento"
                  >
                    <i class="bi bi-copy color-principal"></i>
                  </router-link>

                  <router-link
                    :to="{ name: 'actividades', params: { idMovimiento: movimiento.idMovimiento } }"
                    title="Menú de Actividades"
                  >
                    <i class="bi bi-arrow-left-right color-principal"></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <pagination-nav
          v-if="data"
          :page-response="data"
          @info-paginador="paginador = $event"
        ></pagination-nav>
      </div>
    </div>
  </div>

  <MovimientoModalForm :id-movimiento="idMovimiento" @send-update-status="receiveUpdateStatus" />
</template>

<script lang="ts" setup>
import PaginationNav from '@/common/components/PaginationNav.vue';
import type { PageControl } from '@/common/interfaces/page.control.interface';
import { getMovimientosPorInversion } from '@/modules/movimientos/services/movimiento-service';
import { formatoDecimal } from '@/utils/formato.moneda';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MovimientoModalForm from '../components/MovimientoModalForm.vue';

const route = useRoute();
const idMovimiento = ref(0);

sessionStorage.setItem('state-id-inversion', String(route.params.idInversion));

interface Props {
  idInversion: number;
}

const props = defineProps<Props>();

const paginador = ref<PageControl>({ pagina: 0, limite: 10 });

watch(paginador, () => {
  refetch();
});

const { data, refetch } = useQuery({
  queryKey: ['movimientos', props.idInversion, paginador.value.pagina, paginador.value.limite],
  queryFn: async () => {
    return await getMovimientosPorInversion(props.idInversion, paginador.value);
  },
});

const getMovimientoParaCopiar = (idMovimientoParaCopiar: number) => {
  sessionStorage.setItem('state-id-movimiento-copiar', String(idMovimientoParaCopiar));
};

const receiveUpdateStatus = (status: string) => {
  if (status.toLowerCase().includes('OK'.toLowerCase())) {
    refetch();
  }
};
</script>
