<template>
    <Toast />
    <div class="card flex flex-wrap justify-center gap-1">
        <span class="relative flex-grow max-w-[80%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] xl:max-w-[25%]">
            <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
            <InputText v-model="searchMovie" placeholder="Search Movie" class="pl-10 w-full" :disabled="isLoading"
                @keydown.enter="searchMovieService" />
        </span>
        <ButtonSecondary :text="'Search Movie'" @click="searchMovieService" :disabled="isLoading" />
    </div>
    <div v-if="isLoading" class="flex flex-wrap justify-center gap-1">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" class="fill-surface-0 dark:fill-surface-800"
            animationDuration=".5s" aria-label="Loading ..." />
    </div>
    <!-- TODO modifify do card component-->
    <div class="card card flex flex-wrap justify-center gap-1" v-if="!!movieData.Id">
        <div>
            <img :src="movieData.Poster" alt="Imagem" class="movie-image" />
        </div>
        <div class="ml-5">
            <h3 class="text-4xl font-bold">Título: {{ movieData.Title }}</h3>
            <p class="text-1xl font-bold">Descrição: {{ movieData.Plot }}</p>
            <p class="text-1xl font-bold">Ano: {{ movieData.Year }}</p>
            <ButtonPrimary :icon="'PLAY'" :text="'Rent now'" class="mt-5" @click="handleRegisterRentMovie" />
        </div>
    </div>
    <RentMovieDataTable :data="rentMovieData" @delivery-rent-movie="handleDeliveryRentMovie" />

    <ConfirmDialog group="headless" style="width: 30rem !important;">
        <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex flex-col items-center p-5 bg-surface-0 dark:bg-surface-700 rounded-md">
                <div
                    class="rounded-full bg-primary-500 dark:bg-primary-400 text-surface-0 dark:text-surface-900 inline-flex justify-center items-center h-[6rem] w-[6rem] -mt-[3rem]">
                    <i class="pi pi-video text-5xl"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
                <div class="max-w-sm">
                    <div class="p-fluid p-grid p-formgrid">
                        <div class="p-field p-col mb-2" hidden>
                            <label for="id" class="block mb-1">ID</label>
                            <InputText id="id" v-model="movieData.Id" class="w-full sm:w-80" />
                        </div>
                        <div class="p-field p-col mb-2">
                            <label for="movie" class="block mb-1 font-bold ">Movie</label>
                            <InputText id="movie" v-model="movieData.Title" class="w-full sm:w-80" disabled />
                        </div>
                        <div class="p-field p-col mb-2">
                            <label for="icondisplay" class="font-bold block mb-2"> Date Rent </label>
                            <Calendar v-model="rentMovie.date_location" showIcon iconDisplay="input"
                                inputId="icondisplay" date-format="dd/mm/yy" />
                        </div>
                        <div class="p-field p-col mb-2">
                            <label for="icondisplay" class="font-bold block mb-2"> Date Delivery Rent </label>
                            <Calendar v-model="rentMovie.date_delivery" showIcon iconDisplay="input"
                                inputId="icondisplay" date-format="dd/mm/yy" />
                        </div>
                        <div class="p-field p-col pb-8 mb-2">
                            <label for="status" class="block mb-1 font-bold">Status</label>
                            <Dropdown id="status" v-model="rentMovie.status" :options="statusOptions"
                                optionLabel="label" optionValue="value" class="w-full sm:w-80" disabled />
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-4">
                    <Button label="Save" @click="acceptCallback" class="w-[8rem]"></Button>
                    <Button label="Cancel" outlined @click="rejectCallback" class="w-[8rem]"></Button>
                </div>
            </div>
        </template>
    </ConfirmDialog>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonSecondary from '../components/Buttons/ButtonSecondary.vue';
import ButtonPrimary from '../components/Buttons/ButtonPrimary.vue';
import RentMovieDataTable from '../components/DataTables/RentMovieDataTable.vue';
import ExternalMovieService from '../services/ExternalMovieService.ts';
import { useToast } from 'primevue/usetoast';
import { IOmdbMovies } from '../utils/movies.ts';
import { IRentMovie, Status } from '../services/RentMovieService.ts';
import { useConfirm } from "primevue/useconfirm";
import { v4 as uuidv4 } from 'uuid';

const confirm = useConfirm();
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

const rentMovie = ref({
    id: '',
    date_location: '',
    date_delivery: '',
    status: Status.ALUGADO,
    createdAt: '',
    updatedAt: '',
    movieRented: '',
    clientRegister: '',
    rentedBy: '',
})
const statusOptions = ref([
    { label: 'Alugar', value: Status.ALUGADO },
    { label: 'Entregar', value: Status.ENTREGUE }
]);

const rentMovieData = ref<IRentMovie[]>();

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

const handleRegisterRentMovie = async () => {
    confirm.require({
        group: 'headless',
        header: 'New Rent Movie',
        message: 'Please confirm to proceed moving forward.',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        acceptLabel: "Save",
        rejectLabel: "Cancel",
        rejectClass: 'p-button-sm p-button-outlined p-button-danger',
        acceptClass: 'p-button-outlined p-button-sm',
        accept: () => {

            const dataUser = localStorage.getItem('user@session');
            const dataClient = localStorage.getItem('ClientData');
            
            const userSession = dataUser ? JSON.parse(dataUser) : null;
            const client = dataClient ? JSON.parse(dataClient) : null;

            //   const newRentMovie: IRentMovie = {
            //     id: uuidv4(),
            //     date_location: new Date(rentMovie.value.date_location),
            //     date_delivery: new Date(rentMovie.value.date_delivery),
            //     status: rentMovie.value.status,
            //     createdAt: new Date(),
            //     updatedAt: null,
            //     movieRented: {

            //     },
            //     clientRegister: client,
            //     rentedBy: userSession,
            //   }

            //   try {
            //     const clientResponse: any = ClientService.registerClient(newUser);
            //     if (clientResponse.response === 201) {
            //       toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Register Successfuly', life: 3000 });
            //       clearFormData();
            //       getClients();
            //       tableKey.value += 1;
            //     }
            //   } catch (error) {
            //     toast.add({ severity: 'error', summary: 'Rejected', detail: `Register error - ${error}`, life: 3000 });
            //   }

        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Cancelled', detail: `Operation cancelled`, life: 3000 });
        }
    });
}

const handleDeliveryRentMovie = async () => {

}

</script>
<style scoped>
.movie-image {
    width: 100px;
    height: 150px;
}
</style>