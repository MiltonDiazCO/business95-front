<template>
  <div class="container-fluid">
    <div class="row mx-1 my-2">
      <!-- Columna Izquierda -->
      <div class="col-md-6 col-lg-6 border rounded p-2">
        <div>
          <CardBalanceSocio :balance-socio="balanceSocio" />
        </div>

        <h4 class="mt-3">Tu Resumen</h4>

        <!-- Menú Tabs -->
        <div class="mb-3">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
              <button
                type="button"
                role="tab"
                data-bs-toggle="tab"
                id="btn-tab-line"
                data-bs-target="#tab-line"
                aria-controls="tab-line"
                aria-selected="true"
                class="nav-link active"
              >
                Gráfico 1
              </button>
            </li>

            <li class="nav-item">
              <button
                type="button"
                role="tab"
                data-bs-toggle="tab"
                id="btn-tab-stackbarchar"
                data-bs-target="#tab-stackbarchar"
                aria-controls="tab-stackbarchar"
                aria-selected="false"
                class="nav-link"
              >
                Gráfico 2
              </button>
            </li>

            <li class="nav-item">
              <button
                type="button"
                role="tab"
                data-bs-toggle="tab"
                id="btn-tab-bar"
                data-bs-target="#tab-bar"
                aria-controls="tab-bar"
                aria-selected="false"
                class="nav-link"
              >
                Gráfico 3
              </button>
            </li>
          </ul>
        </div>

        <!-- Contenido Tabs -->
        <div class="tab-content" id="content-tab">
          <!-- Gráfico linear -->
          <div
            id="tab-line"
            role="tabpanel"
            aria-labelledby="tab-line"
            class="tab-pane show active"
          >
            <LineGraph :chart-data="chartLineData" />
          </div>

          <!-- StackedBarGraph -->
          <div
            id="tab-stackbarchar"
            role="tabpanel"
            aria-labelledby="tab-stackbarchar"
            class="tab-pane"
          >
            <StackedBarGraph :chart-data="chartData" />
          </div>

          <!-- BarGraph -->
          <div id="tab-bar" role="tabpanel" aria-labelledby="tab-bar" class="tab-pane">
            <BarGraph :chart-data="chartData" />
          </div>
        </div>
      </div>

      <!-- Columna Derecha -->
      <div class="col-md-6 col-lg-6 mt-2 mt-md-0 px-0 px-md-3">
        <h4>Balances Anuales</h4>
        <BalancesAnualesPorSocio :balances="balanceSocio?.balances ?? []" />
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
import BarGraph from '@/charts/BarGraph.vue';
import LineGraph from '@/charts/LineGraph.vue';
import StackedBarGraph from '@/charts/StackedBarGraph.vue';
import BalancesAnualesPorSocio from '@/modules/socios/components/BalancesAnualesPorSocio.vue';
import { getBalancesSocio } from '@/modules/socios/services/socio-service';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import CardBalanceSocio from '../components/CardBalanceSocio.vue';

const { data: balanceSocio } = useQuery({
  queryKey: ['balance-socio'],
  queryFn: async () => {
    return await getBalancesSocio();
  },
});

const balancesAnuales = computed(() => balanceSocio.value?.balances ?? []);

const chartLineData = computed(() => ({
  labels: balancesAnuales.value?.map((balance) => balance.annio),
  datasets: [
    {
      label: 'Balance General',
      data: balancesAnuales.value.map((balance) => balance.balanceAnual),
      backgroundColor: '#4CAF50',
    },
  ],
}));

const chartData = computed(() => ({
  labels: balancesAnuales.value.map((balance) => balance.annio),
  datasets: [
    {
      label: 'Ingresos',
      data: balancesAnuales.value.map((balance) => balance.ingresos),
      backgroundColor: '#4CAF50',
    },
    {
      label: 'Gastos',
      data: balancesAnuales.value.map((balance) => balance.gastos),
      backgroundColor: '#E57373',
    },
  ],
}));
</script>
