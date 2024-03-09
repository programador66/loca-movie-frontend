<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppTopBar from './components/Layout/AppTopBar.vue';
import AppFooter from './components/Layout/AppFooter.vue';

</script>

<template>
  <div>
    <AppTopBar />
      <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped>

</style>
