<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { defineComponent } from 'vue';
import { Line } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default defineComponent({
  name: 'LineChart',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line },
  props: {
    chartData: null,
    chartOptions: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
      }),
    },
  },
});
</script>
