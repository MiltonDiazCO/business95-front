<template>
  <div class="container-fluid">
    <div class="row min-vh-100">
      <!-- Imagén -->
      <div class="bg-lateral col col-md-4 col-lg-3 col-xl-4 d-none d-lg-block"></div>

      <!-- Login -->
      <div class="col-md-4 mx-auto p-4" style="margin-top: 25vh">
        <h2 class="fw-bold text-center">Bienvenido</h2>

        <!-- Formulario -->
        <form @submit.prevent="login">
          <div class="mb-2">
            <label for="correo-electronico" class="form-label">Correo Eletronico</label>
            <input
              type="text"
              v-model="correoElectronico"
              id="correo-electronico"
              class="form-control"
              placeholder="Correo Electronico"
              autofocus
            />
            <p v-if="errors.correoElectronico" class="my-1 text-danger">
              {{ errors.correoElectronico }}
            </p>

            <label for="contrasena">Contraseña</label>
            <input
              type="password"
              v-model="contrasena"
              id="contrasena"
              class="form-control"
              placeholder="Contraseña"
            />
            <p v-if="errors.contrasena" class="my-1 text-danger">
              {{ errors.contrasena }}
            </p>
          </div>

          <div v-if="authError" class="alert alert-danger mb-2" role="alert">
            <p class="m-0">{{ authError.error }}</p>
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-principal">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-lateral {
  background: linear-gradient(135deg, var(--color-principal), #7a42c1);
}
</style>

<script lang="ts" setup>
import type { B95AuthError } from '@/api/interfaces/b95.auth.error.interface';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { useAuthStore } from '../stores/auth.store';

const router = useRouter();

const authError = ref<B95AuthError>();

const schema = yup.object({
  correoElectronico: yup.string().email().required(),
  contrasena: yup.string().min(4).required(),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
});

const [correoElectronico] = defineField('correoElectronico');
const [contrasena] = defineField('contrasena');

const login = handleSubmit(async () => {
  const authStore = useAuthStore();

  try {
    await authStore.login(correoElectronico.value, contrasena.value);
    router.push('/');
  } catch (error: unknown) {
    const errorAuth = error as B95AuthError;
    authError.value = errorAuth ?? 'Ha ocurrido un error';
  }
});
</script>
