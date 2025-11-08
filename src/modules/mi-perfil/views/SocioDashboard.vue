<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 col-lg-6">
        <div>
          <CardBalanceSocio :balance-socio="balanceSocio" />
        </div>
        <div>
          <StackedBarGraph :chart-data="chartData" />
        </div>
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
        backgroundColor: '#EF5350',
      },
    ],
  };
});
</script>
