<template>
  <NavbarComponent />
  <RouterView />
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import NavbarComponent from '@/modules/dashboard/components/NavbarComponent.vue';
</script>
