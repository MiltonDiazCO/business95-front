<template>
  <div class="table-responsive text-end">
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th class="text-start">Socio</th>
          <th>Cantidad</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="balance in props.balancesSocios" :key="balance.socio">
          <td class="text-start">{{ balance.socio }}</td>
          <td>{{ balance.cantidadSocio }}</td>
          <td>{{ balance.balanceSocio }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type {
  BalanceSocio,
  MovimientoBalancesSocios,
} from '@/modules/movimientos/interfaces/movimiento.balances.interface';

interface Props {
  detalleMovimiento?: MovimientoBalancesSocios;
  balancesSocios: BalanceSocio[];
}

const props = defineProps<Props>();
</script>
