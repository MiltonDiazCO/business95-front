<template>
  <NavbarComponent />
  <SidebarComponent />
  <RouterView />
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import NavbarComponent from '@/modules/layout/components/NavbarComponent.vue';
import SidebarComponent from '../../layout/components/SidebarComponent.vue';
</script>
