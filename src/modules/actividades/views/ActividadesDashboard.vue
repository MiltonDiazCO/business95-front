<template>
  <div class="container-fluid">
    <div class="row mx-1">
      <!-- Columna Izquierda -->
      <div class="col-md-5 col-lg-5 border rounded my-2 p-2" style="height: fit-content">
        <!-- Formulario de Actividades -->
        <ActividadSocioForm
          id-form="form-actividades"
          :id-movimiento="props.idMovimiento"
          @send-actividad-socio="refetchData()"
        />

        <div class="col mt-2">
          <button type="submit" form="form-actividades" class="btn btn-principal">
            Agregar Actividad <i class="bi bi-plus-circle-fill"></i>
          </button>
        </div>
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
import ActividadesSociosList from '@/modules/actividades/components/ActividadesSociosList.vue';
import ActividadSocioForm from '@/modules/actividades/components/ActividadSocioForm.vue';
import {
  getActividadesPorMovimiento,
  getBalanceSociosPorMovimiento,
} from '@/modules/actividades/services/actividad-service';
import BalancesPorMovimiento from '@/modules/socios/components/BalancesPorMovimiento.vue';
import { useQuery } from '@tanstack/vue-query';

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
