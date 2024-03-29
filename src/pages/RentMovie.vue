<template>
    <Toast />
    <div class="card flex flex-wrap justify-center gap-1">
        <span class="relative flex-grow max-w-[80%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] xl:max-w-[25%]">
            <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
            <InputText v-model="searchMovie" placeholder="Search movie to rent" class="pl-10 w-full" :disabled="isLoading"
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
            <ButtonPrimary :icon="'PLAY'" :text="'Rent now'" class="mt-5" @click="isRentModalOpen = true;" />
        </div>
    </div>
    <RentMovieDataTable :data="rentMovieData" @delivery-rent-movie="handleOpenDeliverModal" :key="tableKey" />

    <Dialog v-model:visible="isRentModalOpen" modal header="New Movie Rent" :style="{ width: '28rem' }"
      :breakpoints="{ '800px': '90vw', '575px': '100vw' }" :closable="true">
            <div class="flex flex-col items-center p-5 bg-surface-0 dark:bg-surface-700 rounded-md">
                <div
                    class="rounded-full bg-primary-500 dark:bg-primary-400 text-surface-0 dark:text-surface-900 inline-flex justify-center items-center h-[6rem] w-[6rem] -mt-[1rem]">
                    <i class="pi pi-video text-5xl"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-4">New Movie Rent</span>
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
                            <label for="movie" class="block mb-1 font-bold ">Client</label>
                            <AutoComplete v-model="selectedClients" :disabled="isDeliveryMovie" :inputStyle="{ width: '280px' }" optionLabel="name" :suggestions="filteredClients"
                                @complete="searchClient" />
                        </div>
                        <div class="p-field p-col mb-2">
                            <label for="icondisplay" class="font-bold block mb-2"> Date Rent </label>
                            <Calendar v-model="rentMovieForm.date_location" showIcon iconDisplay="input" :disabled="isDeliveryMovie"
                                inputId="icondisplay" date-format="dd/mm/yy" />
                        </div>
                        <div class="p-field p-col mb-2">
                            <label for="icondisplay" class="font-bold block mb-2"> Date Delivery Rent </label>
                            <Calendar v-model="rentMovieForm.date_delivery" showIcon iconDisplay="input" :disabled="isDeliveryMovie"
                                inputId="icondisplay" date-format="dd/mm/yy" />
                        </div>
                        <div class="p-field p-col pb-8 mb-2">
                            <label for="status" class="block mb-1 font-bold">Status</label>
                            <Dropdown id="status" v-model="rentMovieForm.status" :options="statusOptions"
                                optionLabel="label" optionValue="value" class="w-full sm:w-80" disabled />
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-4">

                    <Button v-if="!isDeliveryMovie" label="Rent" @click="handleRegisterRentMovie" class="w-[8rem]"></Button>
                    <Button v-else label="Delivery" @click="handleDeliveryRentMovie" class="w-[8rem]"></Button>
                    <Button label="Cancel" outlined @click="isRentModalOpen = false" class="w-[8rem]"></Button>
                </div>
            </div>
    </Dialog>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ButtonSecondary from '../components/Buttons/ButtonSecondary.vue';
import ButtonPrimary from '../components/Buttons/ButtonPrimary.vue';
import RentMovieDataTable from '../components/DataTables/RentMovieDataTable.vue';
import ExternalMovieService from '../services/ExternalMovieService.ts';
import { useToast } from 'primevue/usetoast';
import { IOmdbMovies } from '../utils/movies.ts';
import RentMovieService, { IRentMovie, Status } from '../services/RentMovieService.ts';
import { v4 as uuidv4 } from 'uuid';
import ClientService from '../services/ClientService.ts';
import { convetDate, validateForm } from '../utils/functions.ts';

const toast = useToast();
const isLoading = ref(false);
const isRentModalOpen = ref<boolean>(false);
const isDeliveryMovie = ref<boolean>(false);

const searchMovie = ref<string>('');
const movieData = ref<IOmdbMovies>({
    Id: '',
    Title: '',
    Plot: '',
    Poster: '',
    Year: ''
});

const rentMovieForm = ref({
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

const clients = ref();
const selectedClients = ref();
const filteredClients = ref();
const tableKey = ref(0);

onMounted(async () => {
    await getRentMovies();
    const client = await ClientService.getClient();
    clients.value = client;
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

const handleRegisterRentMovie = async () => {
    const dataUser = localStorage.getItem('user@session');
    const userSession = dataUser ? JSON.parse(dataUser) : null;

    const validateRentDate = validateForm({
        date_location: rentMovieForm.value.date_location,
        date_delivery: rentMovieForm.value.date_delivery,
    });

    if (!validateRentDate) {
        toast.add({ severity: 'error', summary: 'Rejected', detail: `Register error - check empty  dates to rent`, life: 3000 });
        return;
    }

    const newRentMovie: IRentMovie = {
        id: uuidv4(),
        date_location: new Date(rentMovieForm.value.date_location),
        date_delivery: new Date(rentMovieForm.value.date_delivery),
        status: rentMovieForm.value.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        movieRented: movieData.value,
        clientRegister: selectedClients.value,
        rentedBy: userSession.user,
    }

    const validate = validateForm(newRentMovie);

    if (!validate) {
        toast.add({ severity: 'error', summary: 'Rejected', detail: `Register error - check empty fields!`, life: 3000 });
        return;
    }

    try {
        const rentMovieResponse: any = RentMovieService.registerRentMovie(newRentMovie);
        if (rentMovieResponse.response === 400) {
            toast.add({ severity: 'error', summary: 'Rejected', detail: `Register error - ${rentMovieResponse.msg}`, life: 3000 });
            return;
        }
        toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Register Successfuly', life: 3000 });
        clearFormData();
        getRentMovies();
        tableKey.value += 1;
        isRentModalOpen.value = false;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Rejected', detail: `Register error - ${error}`, life: 3000 });
    }

}

const handleOpenDeliverModal = (data:IRentMovie) => {
    isDeliveryMovie.value = true;
    isRentModalOpen.value = true;
    rentMovieForm.value.id = data.id;
    movieData.value.Title = data.movieRented.Title;
    selectedClients.value = data.clientRegister.name;
    rentMovieForm.value.date_location = convetDate(data.date_location);
    rentMovieForm.value.date_delivery = convetDate(data.date_delivery);
    rentMovieForm.value.status = Status.ENTREGUE;
}

const handleDeliveryRentMovie = async () => {
    try {
        const delivery: any = RentMovieService.deliveryMovie(rentMovieForm.value.id);

        if (delivery.response === 404) {
            toast.add({ severity: 'error', summary: 'Rejected', detail: `Delivery error, rent not found`, life: 3000 });
            return;
        }

        toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Movie delivery with Successfuly', life: 3000 });
        clearFormData();
        getRentMovies();
        tableKey.value += 1;
        isRentModalOpen.value = false;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Rejected', detail: `Delivery - ${error}`, life: 3000 });
    }
}

const getRentMovies = async () => {
    const response = await RentMovieService.getRentMovie();
    const sortData = response
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return rentMovieData.value = sortData;
};

const searchClient = (event: any) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredClients.value = [...clients.value];
        } else {
            filteredClients.value = clients.value.filter((client: any) => {
                return client.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}

const clearFormData = () => {
    rentMovieForm.value = {
        id: '',
        date_location: '',
        date_delivery: '',
        status: Status.ALUGADO,
        createdAt: '',
        updatedAt: '',
        movieRented: '',
        clientRegister: '',
        rentedBy: '',
    }

    movieData.value = {
        Id: '',
        Title: '',
        Plot: '',
        Poster: '',
        Year: ''
    }
    isDeliveryMovie.value = false;
    searchMovie.value = '';
}

</script>
<style scoped>
.movie-image {
    width: 100px;
    height: 150px;
}
</style>