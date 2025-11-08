<template>
  <div class="container-fluid">
    <div class="row mx-1 my-2">
      <!-- Columna Izquierda -->
      <div class="col-md-6 col-lg-6 border rounded p-2">
        <div>
          <CardBalanceSocio :balance-socio="balanceSocio" />
        </div>

        <h4 class="mt-3">Gráfico de Balances Anuales</h4>
        <div>
          <StackedBarGraph :chart-data="chartData" />
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

<script lang="ts" setup>
import { getBalancesSocio } from '@/common/services/socio-service';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import CardBalanceSocio from '../components/CardBalanceSocio.vue';
import StackedBarGraph from '@/common/components/StackedBarGraph.vue';
import BalancesAnualesPorSocio from '@/modules/socios/components/BalancesAnualesPorSocio.vue';

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
