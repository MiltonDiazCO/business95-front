<template>
  <div class="container-fluid">
    <div class="row min-vh-100">
      <!-- Imagén -->
      <div class="bg-layer col col-md-4 col-lg-3 col-xl-4 d-none d-lg-block"></div>

      <!-- Login -->
      <div class="col-md-4 mx-auto p-4" style="margin-top: 25vh">
        <h2 class="fw-bold text-center">Bienvenido</h2>

        <!-- Formulario -->
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="id-socio" class="form-label">ID Socio</label>
            <input
              type="text"
              v-model="idSocio"
              class="form-control"
              placeholder="Ingrese su ID"
              autofocus
            />
          </div>

          <div>
            <p v-if="errorApi" class="alert alert-danger py-1">{{ errorApi }}</p>
            <p v-if="errors.idSocio" class="alert alert-danger py-1">{{ errors.idSocio }}</p>
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-purple">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-layer {
  background: linear-gradient(135deg, var(--color-principal), #7a42c1);
}
</style>

<script lang="ts" setup>
import { getSocio } from '@/modules/socios/services/socios-service';
import { useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const router = useRouter();

const errorApi = ref('');

const schemaValidation = yup.object({
  idSocio: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('El ID del socio es requerido.')
    .typeError('El ID del socio debe ser numérico.'),
});

const { handleSubmit, defineField, errors } = useForm({ validationSchema: schemaValidation });

const [idSocio] = defineField('idSocio');

watch(idSocio, () => {
  errorApi.value = '';
});

const login = handleSubmit(async () => {
  try {
    const { sucess, data: socio, dataError } = await getSocio(Number(idSocio.value));
    if (sucess && socio) {
      localStorage.setItem('socio-token-temporal', socio.idSocio.toString());
      router.push({ name: 'inversiones' });
    } else {
      errorApi.value = dataError?.errores?.[0] ?? 'Ha ocurrido un error';
    }
  } catch (error) {
    console.log(error);
  }
});
</script>
