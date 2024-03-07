<template>
    <Toast />
    <div class="card flex flex-wrap justify-center gap-1">
        <span class="relative flex-grow max-w-[80%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] xl:max-w-[25%]">
            <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
            <InputText 
                v-model="searchMovie"
                placeholder="Search Movie"
                class="pl-10 w-full"
                :disabled="isLoading"
                @keydown.enter="searchMovieService"
            />
        </span>
        <ButtonSecondary :text="'Search Movie'" @click="searchMovieService" :disabled="isLoading" />
    </div>
    <div v-if="isLoading"  class="flex flex-wrap justify-center gap-1" >
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" class="fill-surface-0 dark:fill-surface-800"
        animationDuration=".5s" aria-label="Loading ..." />
    </div>
   
    <div class="card card flex flex-wrap justify-center gap-1"  v-if="!!movieData.Id">
        
        <div>
            <img :src="movieData.Poster"
                alt="Imagem" class="movie-image" />
        </div>
        <div class="ml-5">
            <h3 class="text-4xl font-bold">Título: {{ movieData.Title }}</h3>
            <p class="text-1xl font-bold">Descrição: {{ movieData.Plot }}</p>
            <p class="text-1xl font-bold">Ano: {{ movieData.Year }}</p>
            <ButtonPrimary :icon="'PLAY'" :text="'Rent now'"  class="mt-5" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonSecondary from '../components/Buttons/ButtonSecondary.vue';
import ButtonPrimary from '../components/Buttons/ButtonPrimary.vue';
import ExternalMovieService from '../services/ExternalMovieService.ts';
import { useToast } from 'primevue/usetoast';
import { IOmdbMovies } from '../utils/movies.ts';


const toast = useToast();
const isLoading = ref(false);
const searchMovie = ref<string>('');
const movieData = ref<IOmdbMovies>({
    Id: '',
    Title: '',
    Plot: '',
    Poster: '',
    Year: ''
});

const searchMovieService = async () => {
    try {
        isLoading.value = true;
        const response = await ExternalMovieService.searchMovie(searchMovie.value);
   
        if (response.data.Response === 'False') {
            toast.add({ severity: 'error', summary: 'Alert', detail: `Movie not found`, life: 3000 });
            return;
        }
        const movie = response.data;
        movieData.value.Id = movie.imdbID;
        movieData.value.Title = movie.Title;
        movieData.value.Plot = movie.Plot;
        movieData.value.Poster = movie.Poster;
        movieData.value.Year = movie.Year;
    } catch (error) {
        return error;
    } finally {
        isLoading.value = false;
    }
}

</script>
<style scoped>
.movie-image {
  width: 100px;
  height: 150px;
}
</style>