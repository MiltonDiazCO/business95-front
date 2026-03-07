<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Bienvenido {{ props.balanceSocio?.socio }}</h4>
      <p class="text-body-secondary mb-2"><strong>Este es tu balance general</strong></p>
      <p class="mb-1">
        <strong>Ingresos: </strong>
        {{ formatoDecimal().format(Number(props.balanceSocio?.ingresos)) }}
        <br />
        <strong>Gastos: </strong>
        {{ formatoDecimal().format(Number(props.balanceSocio?.gastos)) }}
        <br />
        <strong>Balance: </strong>
        {{ formatoDecimal().format(Number(props.balanceSocio?.balance)) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatoDecimal } from '@/utils/formato.moneda';
import type { BalanceSocio } from '@/modules/socios/interfaces/balance.socio.interface';

interface Props {
  balanceSocio?: BalanceSocio;
}

const props = defineProps<Props>();
</script>
