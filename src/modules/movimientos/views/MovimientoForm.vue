<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5">
        <form @submit.prevent="onSubmit">
          <div class="mb-1">
            <label for="categoria" class="form-label">Categoria</label>
            <select v-model="categoria" id="categoria" class="form-select">
              <option
                v-for="categoria in categorias"
                :key="categoria.idCategoria"
                :value="categoria.idCategoria"
              >
                {{ categoria.categoria }}
              </option>
            </select>
          </div>

          <div class="mb-1">
            <label for="concepto" class="form-label">Concepto</label>
            <input
              v-model="concepto"
              type="text"
              class="form-control"
              id="concepto"
              placeholder="Concepto"
            />
          </div>

          <div class="mb-1">
            <label for="moneda" class="form-label">Moneda</label>
            <select v-model="moneda" id="moneda" class="form-select">
              <option v-for="moneda in monedas" :key="moneda.idMoneda" :value="moneda.idMoneda">
                {{ moneda.idMoneda }}
              </option>
            </select>
          </div>

          <div class="mb-1">
            <label for="medida" class="form-label">Medida</label>
            <select v-model="medida" id="medida" class="form-select">
              <option v-for="medida in medidas" :key="medida.idMedida" :value="medida.idMedida">
                {{ medida.descripcion }}
              </option>
            </select>
          </div>

          <div class="mt-2">
            <button type="submit" class="btn btn-purple">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./MovimientoForm.ts"></script>
