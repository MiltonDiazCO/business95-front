<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Columna Izquierda -->
      <div class="col-md-5 col-lg-5">
        <div class="table-responsive text-center"></div>
      </div>

      <!-- Columan Derecha -->
      <div class="col-md-7 col-lg-7 my-2">
        <!-- Tabs -->
        <div class="mb-3">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
              <button
                type="button"
                role="tab"
                data-bs-toggle="tab"
                id="btn-tab-actividades-socios"
                data-bs-target="#tab-actividades-socios"
                aria-controls="tab-actividades-socios"
                aria-selected="true"
                class="nav-link active"
              >
                Actividades
              </button>
            </li>

            <li class="nav-item">
              <button
                type="button"
                role="tab"
                data-bs-toggle="tab"
                id="btn-tab-balances-socios"
                data-bs-target="#tab-balances-socios"
                aria-controls="tab-balances-socios"
                aria-selected="false"
                class="nav-link"
              >
                Balances
              </button>
            </li>
          </ul>
        </div>

        <!-- Contenido Tabs -->
        <div class="tab-content" id="content-tab">
          <!-- Actividadaes Socios -->
          <div
            id="tab-actividades-socios"
            role="tabpanel"
            aria-labelledby="tab-actividades-socios"
            class="tab-pane show active"
          >
            <button
              type="button"
              class="btn btn-principal mb-2"
              data-bs-toggle="modal"
              data-bs-target="#actividadesFormModal"
            >
              Nueva Actividad <i class="bi bi-plus-circle-fill"></i>
            </button>

            <ActividadesSociosList
              id="actividades"
              :id-movimiento="props.idMovimiento"
              :actividades-socios="actividades ?? []"
              @send-actividades-socios="refetchData()"
            />
          </div>

          <!-- Balances Socios -->
          <div
            id="tab-balances-socios"
            role="tabpanel"
            aria-labelledby="tab-balances-socios"
            class="tab-pane"
          >
            <BalancesPorMovimiento
              :detalle-movimiento="movimientoConBalances"
              :balances-socios="movimientoConBalances?.balances ?? []"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <ActividadesModalForm
    titulo="Agregar Actividad"
    :id-movimiento="props.idMovimiento"
    @send-actividad-socio="refetchData()"
  />
</template>

<style scoped>
.nav-link {
  color: #000;
}

.nav-link.active {
  color: var(--color-principal);
}
</style>

<script lang="ts" setup>
import {
  getActividadesPorMovimiento,
  getBalanceSociosPorMovimiento,
} from '@/common/services/actividad-service';
import { useQuery } from '@tanstack/vue-query';
import ActividadesModalForm from '../components/ActividadesModalForm.vue';
import ActividadesSociosList from '../components/ActividadesSociosList.vue';
import BalancesPorMovimiento from '@/modules/socios/components/BalancesPorMovimiento.vue';

interface Props {
  idMovimiento: number;
}

const props = defineProps<Props>();

const { data: actividades, refetch: refetchActividades } = useQuery({
  queryKey: ['actividades'],
  queryFn: async () => {
    return await getActividadesPorMovimiento(props.idMovimiento);
  },
});

const { data: movimientoConBalances, refetch: refetchBalances } = useQuery({
  queryKey: ['balances'],
  queryFn: async () => {
    return await getBalanceSociosPorMovimiento(props.idMovimiento);
  },
});

const refetchData = () => {
  refetchActividades();
  refetchBalances();
};
</script>
