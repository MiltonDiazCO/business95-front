<template>
  <NavbarComponent />
  <SidebarComponent />
  <RouterView />
</template>

<script lang="ts" setup>
import NavbarComponent from '@/modules/layout/components/NavbarComponent.vue';
import { RouterView } from 'vue-router';
import SidebarComponent from '../../layout/components/SidebarComponent.vue';
</script>
