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
          <td>
            {{ formatoDecimal().format(balance.cantidadSocio) }} {{ detalleMovimiento?.medida }}
          </td>
          <td>
            {{ formatoDecimal().format(balance.balanceSocio) }} {{ detalleMovimiento?.moneda }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { formatoDecimal } from '@/common/utils/formato.moneda';
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
