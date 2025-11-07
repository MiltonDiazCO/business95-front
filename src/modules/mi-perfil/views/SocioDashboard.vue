<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 col-lg-6">
        <LineGraph :chart-data="chartData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LineGraph from '@/common/components/LineGraph.vue';
import { getBalancesSocio } from '@/common/services/socio-service';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';

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
        label: 'Balance Anual',
        data: balancesAnuales.map((balance) => balance.balanceAnual),
        borderColor: 'blue',
        borderWidth: 2,
      },
      {
        label: 'Ingresos',
        data: balancesAnuales.map((balance) => balance.ingresos),
        borderColor: 'green',
        borderWidth: 2,
      },
      {
        label: 'Gastos',
        data: balancesAnuales.map((balance) => balance.gastos),
        borderColor: 'red',
        borderWidth: 2,
      },
    ],
  };
});
</script>
