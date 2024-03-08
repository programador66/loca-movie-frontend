<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppTopBar from './components/AppTopBar.vue';
import AppFooter from './components/AppFooter.vue';

</script>

<template>
  <div style="padding: 0;">
    <AppTopBar />
      <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped>

</style>
