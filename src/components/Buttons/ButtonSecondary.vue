<template>
    <button class="rent-now-btn">
      <section v-if="icon === 'PLUS'" >
        <PlusIcon class="h-5 w-5" />
      </section>
        {{ text }}
    </button>
</template>

<script setup lang="ts">
import { defineProps} from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';

defineProps({
  text: String,
  icon: String
});

</script>

<style scoped>
.rent-now-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: rgba(17, 24, 39);
  color: #ffffff;
  font-weight: bold;
  border-radius: 13px;
  height: 40px;
  width: auto;
  padding: 10px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.rent-now-btn:hover {
  background-color:  rgba(0, 0, 0, 0.7); /* Altera a cor de fundo ao passar o mouse sobre o botão */
}
</style>