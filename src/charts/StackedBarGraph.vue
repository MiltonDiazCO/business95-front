<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  name: 'StackedBarChart',
  components: { Bar },
  props: {
    chartData: null,
    chartOptions: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      }),
    },
  },
});
</script>
