<template>
    <button class="rent-now-btn">
      <section v-if="icon === 'TRASH'" >
        <TrashIcon class="h-5 w-5" />
      </section>
      {{ text }}
    </button>
</template>

<script setup lang="ts">
import { defineProps} from 'vue';
import { TrashIcon } from '@heroicons/vue/24/outline';

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
  background-color: #dc3545;
  color: #FFFFFF;
  font-weight: bold;
  border-radius: 13px;
  height: 40px;
  width: auto;
  padding: 10px;
  margin-left: 5px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.rent-now-btn:hover {
  background-color: #c82333; /* Altera a cor de fundo ao passar o mouse sobre o botão */
}
</style>