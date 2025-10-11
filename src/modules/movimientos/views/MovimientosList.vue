<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <router-link :to="{ name: 'movimientos-crear' }" class="btn btn-purple mt-2">
          Nuevo Movimiento <i class="bi bi-plus-circle-fill"></i>
        </router-link>

        <div class="table-responsive">
          <table class="table table-striped table-hover table-bordered mt-2">
            <thead>
              <tr>
                <th scope="col" class="text-center">ID</th>
                <th scope="col">Categoria</th>
                <th scope="col">Concepto</th>
                <th scope="col" class="text-end">Cantidad</th>
                <th scope="col">Medida</th>
                <th scope="col" class="text-end">Balance</th>
                <th scope="col">Moneda</th>
                <th scope="col">Fecha Última Actividad</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movimiento in movimientos" :key="movimiento.idMovimiento">
                <td scope="row" class="text-center">{{ movimiento.idMovimiento }}</td>
                <td>{{ movimiento.categoria }}</td>
                <td>{{ movimiento.concepto }}</td>
                <td class="text-end">{{ movimiento.cantidadMovimiento }}</td>
                <td>{{ movimiento.medida }}</td>
                <td class="text-end">{{ formatoMoneda.format(movimiento.balanceMovimiento) }}</td>
                <td>{{ movimiento.moneda }}</td>
                <td>{{ movimiento.fechaUltimaActividad }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatoMoneda } from '@/common/utils/formato.moneda';
import { useQuery } from '@tanstack/vue-query';
import { getMovimientosPorInversion } from '../../../common/services/movimiento-service';

interface Props {
  idInversion: number;
}

const props = defineProps<Props>();

const { data: movimientos = [] } = useQuery({
  queryKey: ['movimientos'],
  queryFn: async () => {
    return await getMovimientosPorInversion(props.idInversion);
  },
});
</script>
