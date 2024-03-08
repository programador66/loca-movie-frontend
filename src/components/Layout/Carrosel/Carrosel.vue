<template>
    <div class="movie-carousel mt-2">
      <h2 class="text-2xl font-semibold mb-4">Filmes em Destaque</h2>
      <div class="carousel" ref="carousel">
        <div class="carousel-inner" :style="{ transform: `translateX(${offset}px)` }">
          <div v-for="movie in data" :key="movie.Id" class="carousel-item" @click="showMovieDetails(movie)">
            <img :src="movie.Poster" alt="Movie Image" class="movie-image">
          </div>
        </div>
        <button class="carousel-control prev" @click="prevSlide">&lt;</button>
        <button class="carousel-control next" @click="nextSlide">&gt;</button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

interface IMovie {
  Id?: string,
  Title: string,
  Year: string,
  Plot: string,
  Poster: string
}

const { data } = defineProps({data: Array<IMovie>});

const offset = ref(0);
const emit = defineEmits(['selectedMovie']);

const showMovieDetails = (movie: IMovie) => {
  emit('selectedMovie', movie)
};

const prevSlide = () => {
  if (offset.value < 0) {
    offset.value += 340;
  }
};

const nextSlide = () => {
  const carousel = document.querySelector('.carousel-inner');
  if (carousel) {
    const maxOffset = carousel.scrollWidth - carousel.clientWidth;
    if (offset.value > -maxOffset) {
      offset.value -= 340;
    }
  }
};
</script>

<style scoped>
.movie-carousel {
  margin-top: 24px;
  margin-bottom: 80px;
}

.carousel {
  overflow: hidden;
  position: relative;
}

.carousel-inner {
  display: flex;
  flex-wrap: nowrap;
  transition: transform 0.5s ease; /* Adiciona transição para o movimento do carrossel */
}

.carousel-item {
  flex: 0 0 auto;
  width: 180px; /* Largura do item do carrossel */
  margin-right: 10px; /* Espaço entre os itens do carrossel */
  transition: transform 0.3s ease;
}

.carousel-item:hover {
  transform: scale(1.1);
}
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 22%;
  z-index: 1;
}

.carousel-control.prev {
  left: 0;
}

.carousel-control.next {
  right: 0;
}

.movie-image {
  width: 100%;
  height: auto;
}
</style>