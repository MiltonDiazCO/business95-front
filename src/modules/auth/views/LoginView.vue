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
          <div class="mb-4">
            <label for="correo-electronico" class="form-label">Correo Eletronico</label>
            <input
              type="text"
              v-model="correoElectronico"
              id="correo-electronico"
              class="form-control"
              placeholder="Correo Electronico"
              autofocus
            /> <br>

            <label for="contrasena">Contraseña</label>
            <input
              type="password"
              v-model="contrasena"
              id="contrasena"
              class="form-control"
              placeholder="Contraseña"
            />
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
import type { ErrorB95Api } from '@/common/interfaces/error.b95api.interface';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const router = useRouter();

const dataError = ref('');

const { handleSubmit } = useForm({});

const correoElectronico = ref('');
const contrasena = ref('');

const login = handleSubmit(async () => {
  const authStore = useAuthStore();

  try {
    await authStore.login(correoElectronico.value, contrasena.value);
    router.push('/');
  } catch (error: unknown) {
    const errorApi = error as ErrorB95Api;
    dataError.value = errorApi?.errores?.[0] ?? 'Ha ocurrido un error';
  }
});
</script>
