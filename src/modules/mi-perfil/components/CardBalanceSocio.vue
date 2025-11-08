<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ props.balanceSocio?.socio }}</h5>
      <p class="card-text"><strong>Ingresos: </strong> {{ props.balanceSocio?.ingresos }}</p>
      <p><strong>Gastos: </strong> {{ props.balanceSocio?.gastos }}</p>
      <p><strong>Balance: </strong> {{ props.balanceSocio?.balanceSocio }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BalanceSocio } from '../interfaces/balance.socio';

interface Props {
  balanceSocio?: BalanceSocio;
}

const props = defineProps<Props>();
</script>
