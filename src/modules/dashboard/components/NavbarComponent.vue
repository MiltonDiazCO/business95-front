<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <button
        class="btn btn-purple-outline"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar-lateral"
      >
        <span class="fw-bold">B95$</span>
      </button>
      <button @click="logout" class="btn btn-purple-outline">
        <i class="bi bi-power"></i>
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('socio-token-temporal');
  router.push({ name: 'login' });
};
</script>
