
<script setup lang="ts">
import { ref } from 'vue';
import { moviesData } from '../utils/movies';

interface IMovie {
  Id?: string,
  Title: string,
  Year: string,
  Plot: string,
  Poster: string
}


  const movies = moviesData;

  const selectedMovie = ref(movies[Math.floor(Math.random() * 12) + 1]);
  const offset = ref(0);

  const showMovieDetails = (movie: IMovie) => {
    selectedMovie.value = movie;
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

<template>
  <div class="home-page">
    <div class="movie-background">
      <div class="background-image" :style="{ backgroundImage: `url(${selectedMovie.Poster})` }">
        <div class="movie-overlay">
          <h1 class="text-4xl font-bold text-white">{{ selectedMovie.Title }}</h1>
          <p class="text-lg text-white">{{ selectedMovie.Plot }}</p>
          <div class="action-buttons">
            <button class="watch-trailer-btn text-white ">Watch Trailer</button>
            <button class="rent-now-btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 play-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9L5 21V3z" />
              </svg>
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="movie-carousel mt-2">
      <h2 class="text-2xl font-semibold mb-4">Filmes em Destaque</h2>
      <div class="carousel" ref="carousel">
        <div class="carousel-inner" :style="{ transform: `translateX(${offset}px)` }">
          <div v-for="movie in movies" :key="movie.Id" class="carousel-item" @click="showMovieDetails(movie)">
            <img :src="movie.Poster" alt="Movie Image" class="movie-image">
            
          </div>
        </div>
        <button class="carousel-control prev" @click="prevSlide">&lt;</button>
        <button class="carousel-control next" @click="nextSlide">&gt;</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  text-align: center;
}

.movie-background {
  position: relative;
  overflow: hidden;
  height: 500px;
  max-width: 100%;
}

.background-image {
  background-size: cover;
  background-position: center;
  height: 100%;
}

.movie-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.movie-description {
  padding: 20px;
}

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

/* Estilos CSS aqui */
.action-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.watch-trailer-btn {
  border-radius: 16px;
  height: 60px;
  width: 200px;
  border-radius: 16px;
  border: solid 1px #FFFFFF;
  font-weight: bold;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}
.watch-trailer-btn:hover {
  border-color: #F5C61C;
  background-color: #F5C61C;
  color: #000000; 
}

.rent-now-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #F5C61C;
  color: #000000;
  font-weight: bold;
  border-radius: 16px;
  height: 60px;
  width: 200px;
  margin-left: 5px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.rent-now-btn:hover {
  background-color: #d4b500; /* Altera a cor de fundo ao passar o mouse sobre o botão */
}
</style>
