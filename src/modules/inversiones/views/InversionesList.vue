<template>
  <div class="table-responsive">
    <table class="table table-striped table-response">
      <thead>
        <tr>
          <th scope="col">Inversion</th>
          <th scope="col" class="text-end">Ingresos</th>
          <th scope="col" class="text-end">Gatos</th>
          <th scope="col" class="text-end">Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inversion in inversiones" :key="inversion.inversion">
          <td scope="row">{{ inversion.inversion }}</td>
          <td scope="row" class="text-end">{{ formatoMoneda.format(inversion.ingresos) }}</td>
          <td scope="row" class="text-end">{{ formatoMoneda.format(inversion.gastos) }}</td>
          <td scope="row" class="text-end">
            {{ formatoMoneda.format(inversion.balanceInversion) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { getInversionesPorSocio } from '@/modules/inversiones/services/inversiones-service';
import { useQuery } from '@tanstack/vue-query';
import { formatoMoneda } from '@/common/utils/formato.moneda';

const idSocio = localStorage.getItem('socio-token-temporal');

const { data: inversiones = [] } = useQuery({
  queryKey: ['inversiones'],
  queryFn: async () => {
    return await getInversionesPorSocio(Number(idSocio));
  },
});
</script>
