<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>Año</th>
          <th>Ingresos</th>
          <th>Gastos</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="balance in props.balances" :key="balance.annio">
          <td>{{ balance.annio }}</td>
          <td>{{ balance.ingresos }}</td>
          <td>{{ balance.gastos }}</td>
          <td>{{ balance.balanceAnual }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { BalancesAnuales } from '@/modules/mi-perfil/interfaces/balance.socio';

interface Props {
  balances: BalancesAnuales[];
}

const props = defineProps<Props>();
</script>
