<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr class="text-end">
          <th class="text-start">Año</th>
          <th>Ingresos</th>
          <th>Gastos</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="balance in props.balances" :key="balance.annio" class="text-end">
          <td class="text-start">{{ balance.annio }}</td>
          <td>{{ formatoDecimal().format(balance.ingresos) }}</td>
          <td>{{ formatoDecimal().format(balance.gastos) }}</td>
          <td>{{ formatoDecimal().format(balance.balanceAnual) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { BalancesAnuales } from '@/modules/mi-perfil/interfaces/balance.socio';
import { formatoDecimal } from '@/common/utils/formato.moneda';

interface Props {
  balances: BalancesAnuales[];
}

const props = defineProps<Props>();
</script>
