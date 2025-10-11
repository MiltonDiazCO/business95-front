<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="table-responsive">
          <table class="table table-striped table-hover table-bordered mt-2">
            <thead>
              <tr>
                <th scope="col">Inversion</th>
                <th scope="col" class="text-end">Ingresos</th>
                <th scope="col" class="text-end">Gatos</th>
                <th scope="col" class="text-end">Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inversion in inversiones" :key="inversion.idInversion">
                <td scope="row">{{ inversion.inversion }}</td>
                <td class="text-end">{{ formatoMoneda.format(inversion.ingresos) }}</td>
                <td class="text-end">{{ formatoMoneda.format(inversion.gastos) }}</td>
                <td class="text-end">
                  {{ formatoMoneda.format(inversion.balanceInversion) }}
                </td>
                <td class="text-center">
                  <router-link
                    :to="{ name: 'movimientos', params: { idInversion: inversion.idInversion } }"
                    title="Movimientos"
                  >
                    <i class="bi bi-clipboard"></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getInversionesPorSocio } from '@/services/inversiones-service';
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
