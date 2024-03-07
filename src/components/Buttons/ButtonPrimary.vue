<template>
    <button class="rent-now-btn">
      <section v-if="icon === 'PENCIL'" >
        <PencilIcon class="h-4 w-5" />
      </section>
      <section v-if="icon === 'PLAY'" >
        <PlayIcon class="h-4 w-5" />
      </section>
        {{ text }}
    </button>
</template>

<script setup lang="ts">
import { defineProps} from 'vue';
import { PencilIcon } from '@heroicons/vue/24/outline';
import { PlayIcon } from '@heroicons/vue/24/solid';

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
  background-color: #F5C61C;
  color: #000000;
  font-weight: bold;
  border-radius: 13px;
  height: 40px;
  width: auto;
  padding: 10px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.rent-now-btn:hover {
  background-color: #d4b500; /* Altera a cor de fundo ao passar o mouse sobre o botão */
}
</style>