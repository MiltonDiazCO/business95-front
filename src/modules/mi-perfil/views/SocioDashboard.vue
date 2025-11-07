<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <LineGraph :chart-data="data" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LineGraph from '@/common/components/LineGraph.vue';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
};
</script>
