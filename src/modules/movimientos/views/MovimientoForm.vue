<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5">
        <form>
          <div class="mb-1">
            <label for="categoria" class="form-label">Categoria</label>
            <select name="categoria" id="categoria" class="form-select">
              <option selected>Seleccione una categoria</option>
              <option
                v-for="categoria in categorias"
                :key="categoria.idCategoria"
                value="{{ categoria.idCategoria }}"
              >
                {{ categoria.categoria }}
              </option>
            </select>
          </div>

          <div class="mb-1">
            <label for="concepto" class="form-label">Concepto</label>
            <input type="text" class="form-control" id="concepto" placeholder="Concepto" />
          </div>

          <div class="mb-1">
            <label for="moneda" class="form-label">Moneda</label>
            <select name="moneda" id="moneda" class="form-select">
              <option selected>Seleccione una moneda</option>
              <option
                v-for="moneda in monedas"
                :key="moneda.idMoneda"
                value="{{ moneda.idMoneda }}"
              >
                {{ moneda.idMoneda }}
              </option>
            </select>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCategorias } from '@/common/services/categoria.serive';
import { getMonedas } from '@/common/services/monedas-service';
import { useQuery } from '@tanstack/vue-query';

const { data: categorias = [] } = useQuery({
  queryKey: ['categorias'],
  queryFn: async () => {
    return await getCategorias();
  },
});

const { data: monedas = [] } = useQuery({
  queryKey: ['monedas'],
  queryFn: async () => {
    return await getMonedas();
  },
});
</script>
