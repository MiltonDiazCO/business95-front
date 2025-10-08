<template>
  <NavbarComponent />
  <SidebarComponent />
  <RouterView />
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import NavbarComponent from '@/modules/dashboard/components/NavbarComponent.vue';
import SidebarComponent from '../components/SidebarComponent.vue';
</script>
