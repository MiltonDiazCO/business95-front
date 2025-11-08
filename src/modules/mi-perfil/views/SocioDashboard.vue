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
                id="btn-tab-stackbarchar"
                data-bs-target="#tab-stackbarchar"
                aria-controls="tab-stackbarchar"
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
                id="btn-tab-bar"
                data-bs-target="#tab-bar"
                aria-controls="tab-bar"
                aria-selected="false"
                class="nav-link"
              >
                Gráfico 2
              </button>
            </li>
          </ul>
        </div>

        <!-- Contenido Tabs -->
        <div class="tab-content" id="content-tab">
          <!-- StackedBarGraph -->
          <div
            id="tab-stackbarchar"
            role="tabpanel"
            aria-labelledby="tab-stackbarchar"
            class="tab-pane show active"
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
      <div class="col-md-6 col-lg-6 mt-2 mt-md-0">
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
import BarGraph from '@/common/components/BarGraph.vue';
import StackedBarGraph from '@/common/components/StackedBarGraph.vue';
import { getBalancesSocio } from '@/common/services/socio-service';
import BalancesAnualesPorSocio from '@/modules/socios/components/BalancesAnualesPorSocio.vue';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import CardBalanceSocio from '../components/CardBalanceSocio.vue';

const idSocio = localStorage.getItem('socio-token-temporal');

const { data: balanceSocio } = useQuery({
  queryKey: ['balance-socio'],
  queryFn: async () => {
    return await getBalancesSocio(Number(idSocio));
  },
});

const chartData = computed(() => {
  const balancesAnuales = balanceSocio.value?.balances ?? [];

  return {
    labels: balancesAnuales.map((balance) => balance.annio),
    datasets: [
      {
        label: 'Ingresos',
        data: balancesAnuales.map((balance) => balance.ingresos),
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Gastos',
        data: balancesAnuales.map((balance) => balance.gastos),
        backgroundColor: '#E57373',
      },
    ],
  };
});
</script>
