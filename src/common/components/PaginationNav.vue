<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item">
        <button
          class="page-link color-principal"
          :class="{ disabled: props.pageResponse.first }"
          :disabled="props.pageResponse.first"
          @click="retroceder()"
        >
          <i class="bi bi-caret-left-fill"></i>
        </button>
      </li>

      <li v-for="pagina in tamannioPaginador" :key="pagina" class="page-item">
        <button
          v-if="inicioPaginador + (pagina - 1) < totalPaginas"
          class="page-link color-principal"
          :class="{ 'btn-principal': inicioPaginador + (pagina - 1) === props.pageResponse.number }"
          @click="enviarPaginador(inicioPaginador + (pagina - 1), tamannioPagina)"
        >
          {{ inicioPaginador + pagina }}
        </button>
      </li>

      <li class="page-item">
        <button
          class="page-link color-principal"
          :class="{ disabled: props.pageResponse.last }"
          :disabled="props.pageResponse.last"
          @click="avanzar()"
        >
          <i class="bi bi-caret-right-fill"></i>
        </button>
      </li>

      <li>
        <select
          name="tamannio-pagina"
          id="tamannio-pagina"
          class="page-link color-principal"
          v-model.number="tamannioPagina"
          @change="enviarPaginador(0, tamannioPagina)"
        >
          <option v-for="tamannio in tamanniosPagina" :key="tamannio" :value="tamannio">
            {{ tamannio }}
          </option>
        </select>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup generic="T">
import { computed, ref } from 'vue';
import type { PageControl } from '../interfaces/page.control.interface';
import type { PageResponse } from '../interfaces/page.response.interface';

interface props {
  pageResponse: PageResponse<T>;
}

const props = defineProps<props>();

const emit = defineEmits<{
  (e: 'info-paginador', value: PageControl): void;
}>();

const tamannioPagina = ref<number>(10);
const tamanniosPagina = [5, 10, 25, 50];
const tamannioPaginador = ref<number>(5);

const paginaActual = computed(() => props.pageResponse.number);
const totalPaginas = computed(() => props.pageResponse.totalPages);

const inicioPaginador = computed(
  () => Math.trunc(paginaActual.value / tamannioPaginador.value) * tamannioPaginador.value,
);

const enviarPaginador = (pagina: number, limite: number) => {
  emit('info-paginador', { pagina, limite });
};

const retroceder = () => {
  enviarPaginador(paginaActual.value - 1, tamannioPagina.value);
};

const avanzar = () => {
  enviarPaginador(paginaActual.value + 1, tamannioPagina.value);
};
</script>
