<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <button
        class="btn btn-principal-outline"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar-lateral"
      >
        <span class="fw-bold">B95$ <i class="bi bi-list"></i></span>
      </button>
      <button @click="logout" class="btn btn-principal-outline">
        <i class="bi bi-power"></i>
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = async () => {
  const authStore = useAuthStore();
  await authStore.logout();
  router.push({ name: 'login' });
};
</script>
