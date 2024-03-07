<template>
    <div>
    <Toast />
    <Dialog v-model:visible="visible" modal header="Login Page" :style="{ width: '25rem' }"
      :breakpoints="{ '800px': '75vw', '575px': '90vw' }" :closable="false">
        <div class="max-w-sm">
            <div class="p-fluid p-grid p-formgrid">
                <div class="p-field p-col mb-2">
                    <label for="name" class="block mb-1">Username</label>
                    <InputText id="name" v-model="formData.username" class="w-full sm:w-80" />
                </div>
                <div class="p-field p-col mb-2">
                    <label for="password" class="block mb-1">Password</label>
                    <Password id="password" v-model="formData.password" :feedback="false" class="w-full sm:w-80" />
                </div>
            </div>
        </div>
      <div class="flex items-center gap-2 mt-4">
        <Button label="Login" @click="login" class="w-[8rem] p-button-danger p-button-text"
          severity="success">
        </Button>

      </div>
    </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UserService, { IUser } from '../services/UserService';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';

const visible = ref<boolean>(true);
const formData = ref({
    username: '',
    password: ''
})
const toast = useToast();
const router = useRouter();

onMounted(() => {
    const userDataJson = localStorage.getItem('userData');
    const data: IUser[] = userDataJson ?  JSON.parse(userDataJson) : [];

    const foundUser = data.find(d => d.username === 'admin');

    if (!foundUser) {
        const createUser = {
                id: '0',
                name: 'admin',
                username: 'admin',
                document: 'admin',
                password: 'admin',
                status: 'ACTIVE',
                createdAt: new Date,
                updatedAt: null
        }

        UserService.registerUser(createUser);
    }
})

const login = () => {

    if (!formData.value.username || !formData.value.password) {
        toast.add({
            severity: 'error',
            summary: 'Cancelled',
            detail: `Login failed check your username or password!`,
            life: 3000 
        });
        return;
    }

  const isLoggedIn = verifyLogin();

  if (isLoggedIn) {
    toast.add({ 
        severity: 'success',
        summary: 'Confirmed',
        detail: 'Register was Deleted',
        life: 3000 
    });
    router.push('/home');
  } else {
    toast.add({ severity: 'error',
        summary: 'Cancelled',
        detail: `Login failed check your username or password!`,
        life: 3000 
    });
  }
}

const verifyLogin = () => {

    const userDataJson = localStorage.getItem('userData');
    const data: IUser[] = userDataJson ?  JSON.parse(userDataJson) : [];  

    const user = data.find(user => user.username === formData.value.username && user.password === formData.value.password);

    if (user) {
        const userSession = {
            isLoggedIn: true,
            user
        }
        localStorage
        .setItem('user@session', JSON.stringify(userSession));
        return true;
    } else {
        return false;
    }
}


</script>