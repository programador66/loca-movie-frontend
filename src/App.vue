<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppTopBar from './components/AppTopBar.vue';
import AppFooter from './components/AppFooter.vue';

</script>

<template>
  <div class="">
    <AppTopBar />
      <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped>

</style>
