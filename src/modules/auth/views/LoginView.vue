<template>
  <div class="container">
    <div class="row">
      <div class="text-center">
        <h1>Bienvenido</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 m-auto">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="id-socio" class="form-label">ID Socio</label>
            <input type="text" v-model="idSocio" class="form-control" placeholder="Ingrese su ID" />
            <p v-if="errorApi" class="text-danger">{{ errorApi }}</p>
            <p v-if="errors.idSocio" class="text-danger">{{ errors.idSocio }}</p>
          </div>
          <button type="submit" class="btn btn-purple">Ingresar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getSocio } from '@/modules/socios/services/socios-service';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref, watch } from 'vue';

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
