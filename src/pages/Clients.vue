<template>
<section>
    <div class="max-w-screen-mlg mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-gray-800 mt-5 ml-8">Client List</h2>
      <ClientDataTable :data="data" @register-client="handleRegisterClient" @update-client="handleUpdateClient"
        @delete-client="openModalDecisionDeleteClient" :key="tableKey" />
    </div>
    <Toast />
    <ConfirmDialog group="headless" style="width: 30rem !important;">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="flex flex-col items-center p-5 bg-surface-0 dark:bg-surface-700 rounded-md">
          <div
            class="rounded-full bg-primary-500 dark:bg-primary-400 text-surface-0 dark:text-surface-900 inline-flex justify-center items-center h-[6rem] w-[6rem] -mt-[3rem]">
            <i class="pi pi-user text-5xl"></i>
          </div>
          <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
          <div class="max-w-sm">
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
          </div>
          <div class="flex items-center gap-2 mt-4">
            <Button label="Save" @click="acceptCallback" class="w-[8rem]"></Button>
            <Button label="Cancel" outlined @click="rejectCallback" class="w-[8rem]"></Button>
          </div>
        </div>
      </template>
    </ConfirmDialog>
    <ConfirmPopup></ConfirmPopup>

    <Dialog v-model:visible="visible" modal header="Delete User" :style="{ width: '25rem' }"
      :breakpoints="{ '800px': '75vw', '575px': '90vw' }">
      <p>
        Do you want to proceed with deleting the Client?
      </p>
      <div class="flex items-center gap-2 mt-4">
        <Button label="Delete" @click="handleDeleteClient(true)" class="w-[8rem] p-button-danger p-button-text"
          severity="danger"></Button>
        <Button label="Cancel" outlined @click="handleDeleteClient(false)" class="w-[8rem]"></Button>
      </div>
    </Dialog>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ClientDataTable from '../components/DataTables/ClientDataTable.vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ClientService, { IClient } from '../services/ClientService';
import { v4 as uuidv4 } from 'uuid';

onMounted(async () => {
  await getClients();
})


const confirm = useConfirm();
const toast = useToast();

const visible = ref(false);
const data = ref<IClient[]>();
const tableKey = ref(0);

const formData = ref({
  id: '',
  name: '',
  fullName: '',
  cpf: '',
  email: '',
  celular: '',
  cep: '',
  status: 'ACTIVE',
  statusOptions: [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' }
  ]
})

const handleRegisterClient = async () => {
  confirm.require({
    group: 'headless',
    header: 'Register New Client',
    message: 'Please confirm to proceed moving forward.',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    acceptLabel: "Save",
    rejectLabel: "Cancel",
    rejectClass: 'p-button-sm p-button-outlined p-button-danger',
    acceptClass: 'p-button-outlined p-button-sm',
    accept: () => {

      const data = localStorage.getItem('user@session');
      const userSession = data ? JSON.parse(data) : null;


      const newUser = {
        id: uuidv4(),
        name: formData.value.name,
        fullName: formData.value.fullName,
        cpf: formData.value.cpf,
        email: formData.value.email,
        celular: formData.value.celular,
        cep: formData.value.cep,
        status: formData.value.status,
        createdAt: new Date(),
        updatedAt: null,
        userRegister: userSession.user
      }

      try {
        const clientResponse: any = ClientService.registerClient(newUser);
        if (clientResponse.response === 201) {
          toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Register Successfuly', life: 3000 });
          clearFormData();
          getClients();
          tableKey.value += 1;
        }
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Rejected', detail: `Register error - ${error}`, life: 3000 });
      }

    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Cancelled', detail: `Operation cancelled`, life: 3000 });
    }
  });
};

const handleUpdateClient = (rowData: any) => {
  // Lidar com o evento do botão de ação aqui
  console.log('Row data:', rowData);
};

const openModalDecisionDeleteClient = (rowData: any) => {
  visible.value = true;
  formData.value = rowData;
}

const handleDeleteClient = (isDeleteClient: boolean) => {
  if (!isDeleteClient) {
    clearFormData();
    toast.add(
      {
        severity: 'error',
        summary: 'Cancelled',
        detail: `Operation cancelled`,
        life: 3000
      });
    visible.value = false;
    return;
  }

  const deleteUser = ClientService.deleteClient(formData.value.id);

  toast.add({ 
    severity: 'success',
    summary: 'Confirmed',
    detail: 'Register was Deleted',
    life: 3000 
  });
  if (deleteUser.response === 200) {
    clearFormData();
    getClients();
    visible.value = false;
    tableKey.value += 1;
  }

};

const getClients = async () => {
  const response = await ClientService.getClient();
  const sortData = response
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return data.value = sortData;
};

const clearFormData = () => {
  formData.value = {
    id: '',
    name: '',
    fullName: '',
    cpf: '',
    email: '',
    celular: '',
    cep: '',
    status: 'ACTIVE',
    statusOptions: [
      { label: 'Active', value: 'ACTIVE' },
      { label: 'Inactive', value: 'INACTIVE' }
    ]
  }
}
</script>
