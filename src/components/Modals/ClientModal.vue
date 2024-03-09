<template>
    <Dialog v-bind:visible="openClientModal" modal  :style="{ width: '28rem' }"
      :breakpoints="{ '800px': '90vw', '575px': '100vw' }" :closable="false">
            <div class="flex flex-col items-center p-5 bg-surface-0 dark:bg-surface-700 rounded-md">
                <div
                    class="rounded-full bg-primary-500 dark:bg-primary-400 text-surface-0 dark:text-surface-900 inline-flex justify-center items-center h-[6rem] w-[6rem] -mt-[1rem]">
                    <i class="pi pi-user text-5xl"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-4">{{ !isUpdateClient ? 'New Client' : 'Update Client'}}</span>
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
                <label for="fullname" class="block mb-1">Full Name</label>
                <InputText id="fullname" v-model="formData.fullName" class="w-full sm:w-80" />
              </div>
              <div class="p-field p-col mb-2">
                <label for="cpf" class="block mb-1">Cpf</label>
                <InputMask id="cpf" v-model="formData.cpf" mask="999.999.999-99" placeholder="999.999.999-99"  class="w-full sm:w-80" />
              </div>
              <div class="p-field p-col mb-2">
                <label for="email" class="block mb-1">E-mail</label>
                <InputText id="email" v-model="formData.email" class="w-full sm:w-80" />
              </div>
              <div class="p-field p-col mb-2">
                <label for="celular" class="block mb-1">Celular</label>
                <InputMask  id="celular" v-model="formData.celular" mask="99-99999-9999" placeholder="99-99999-9999" class="w-full sm:w-80" />
              </div>
              <div class="p-field p-col mb-2">
                <label for="cep" class="block mb-1">cep</label>
                <InputMask id="cep" v-model="formData.cep" mask="99999-999" placeholder="99999-999" class="w-full sm:w-80" />
              </div>
              <div class="p-field p-col pb-8 mb-2">
                <label for="status" class="block mb-1">Status</label>
                <Dropdown id="status" v-model="formData.status" :options="formData.statusOptions" optionLabel="label"
                  optionValue="value" class="w-full sm:w-80" />
              </div>
            </div>
                <div class="flex items-center gap-2 mt-4">
                    <Button v-if="!isUpdateClient" label="Save" @click="handleRegisterNewClient" class="w-[8rem]"></Button>
                    <Button v-else label="Update" @click="handleUpdateClient" class="w-[8rem]"></Button>
                    <Button label="Cancel" outlined @click="closeUserModalEvent" class="w-[8rem]"></Button>
                </div>
            </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, PropType, watch } from 'vue';
import { ClientWithoutUser } from '../../services/ClientService';

const { data, openClientModal }  = defineProps({
    data: {
        type: Object as PropType<ClientWithoutUser>,
            required: true
        },
    openClientModal: {
        type: Boolean,
        required: true
    },
    isUpdateClient: {
        type: Boolean,
        required: false
    }
});

const formData = ref({
  id: '',
  name: '',
  fullName: '',
  cpf: '',
  email: '',
  celular: '',
  cep: '',
  status: 'ACTIVE',
  createdAt: new Date(),
  updatedAt: new Date(),
  statusOptions: [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' }
  ]
})

watch(data, (newValue: ClientWithoutUser) => {
    fillOutForm(newValue);
}, { deep: true });

const fillOutForm = (data: ClientWithoutUser) => {
    formData.value.id = data.id;
    formData.value.name = data.name;
    formData.value.fullName = data.fullName;
    formData.value.cpf = data.cpf;
    formData.value.email = data.celular;
    formData.value.celular = data.celular;
    formData.value.cep = data.cep;
    formData.value.status = data.status;
    formData.value.createdAt = data.createdAt;
    formData.value.updatedAt = data.updatedAt;
}

const emit = defineEmits(['register-new-client', 'update-client', 'close-modal']);

const handleRegisterNewClient = () => {
    emit('register-new-client', formData.value);
}


const handleUpdateClient = () => {
    emit('update-client', formData.value);
}

const closeUserModalEvent = () => {
    emit('close-modal');
}

</script>

<style>

</style>