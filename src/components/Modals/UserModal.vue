<template>
    <Dialog v-bind:visible="openUserModal" modal :style="{ width: '28rem' }"
        :breakpoints="{ '800px': '90vw', '575px': '100vw' }" :closable="false">
        <div class="flex flex-col items-center p-5 bg-surface-0 dark:bg-surface-700 rounded-md">
            <div
                class="rounded-full bg-primary-500 dark:bg-primary-400 text-surface-0 dark:text-surface-900 inline-flex justify-center items-center h-[6rem] w-[6rem] -mt-[1rem]">
                <i class="pi pi-user text-5xl"></i>
            </div>
            <span class="font-bold text-2xl block mb-2 mt-4">{{ !isUpdateUser ? 'New User' : 'Update User' }}</span>
            <div class="p-fluid p-grid p-formgrid">
                <div class="p-field p-col mb-2" hidden>
                    <label for="id" class="block mb-1">ID</label>
                    <InputText id="id" v-model="formData.id" class="w-full sm:w-80" />
                </div>
                <div class="p-field p-col mb-2">
                    <label for="name" class="block mb-1">Name</label>
                    <InputText id="name" v-model="formData.name" class="w-full sm:w-80" />
                </div>
                <div class="p-field p-col mb-2">
                    <label for="username" class="block mb-1">Username</label>
                    <InputText id="username" v-model="formData.username" class="w-full sm:w-80" />
                </div>
                <div class="p-field p-col mb-2">
                    <label for="document" class="block mb-1">Document</label>
                    <InputText id="document" v-model="formData.document" class="w-full sm:w-80" />
                </div>
                <div class="p-field p-col mb-2">
                    <label for="password" class="block mb-1">Password</label>
                    <Password id="password" v-model="formData.password" class="w-full sm:w-80" />
                </div>
                <div class="p-field p-col pb-8 mb-2">
                    <label for="status" class="block mb-1">Status</label>
                    <Dropdown id="status" v-model="formData.status" :options="formData.statusOptions"
                        optionLabel="label" optionValue="value" class="w-full sm:w-80" />
                </div>
            </div>
            <div class="flex items-center gap-2 mt-4">

                <Button v-if="!isUpdateUser" label="Save" @click="handleRegisterNewUser" class="w-[8rem]"></Button>
                <Button v-else label="Update" @click="handleUpdateUser" class="w-[8rem]"></Button>
                <Button label="Cancel" outlined @click="closeUserModalEvent" class="w-[8rem]"></Button>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, PropType, watch } from 'vue';
import { IUser } from '../../services/UserService';


const { data, openUserModal } = defineProps({
    data: {
        type: Object as PropType<IUser>,
        required: true
    },
    openUserModal: {
        type: Boolean,
        required: true
    },
    isUpdateUser: {
        type: Boolean,
        required: false
    }
});

const formData = ref({
    id: '',
    name: '',
    document: '',
    username: '',
    password: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'ACTIVE',
    statusOptions: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Inactive', value: 'INACTIVE' }
    ]
})

watch(data, (newValue) => {
    fillOutForm(newValue);
}, { deep: true });

const fillOutForm = (data: IUser) => {
    formData.value.id = data.id;
    formData.value.name = data.name;
    formData.value.document = data.document;
    formData.value.username = data.username;
    formData.value.password = data.password;
    formData.value.createdAt = data.createdAt;
    formData.value.updatedAt = data.updatedAt;
    formData.value.status = data.status;
}

const emit = defineEmits(['register-new-user', 'update-user', 'close-modal']);

const handleRegisterNewUser = () => {
    emit('register-new-user', formData);
}


const handleUpdateUser = () => {
    emit('update-user', formData.value);
}

const closeUserModalEvent = () => {
    emit('close-modal');
}

</script>

<style></style>