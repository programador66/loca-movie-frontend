<template>
<section>
    <div class="max-w-screen-mlg mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-gray-800 mt-5 ml-8">Client List</h2>
      <ClientDataTable 
        :data="data" 
        @register-client="openUserModal = true"
        @update-client="eventToUpdateClient"
        @delete-client="openModalDecisionDeleteClient"
        :key="tableKey" />
    </div>
    <Toast />
    <ClientModal 
      :data="formData"
      :open-client-modal="openUserModal"
      :is-update-client="isUpdateUser"
      @register-new-client="handleRegisterClient"
      @update-client="handleUpdateClient"
      @close-modal="clearFormData"
    />
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

import { useToast } from "primevue/usetoast";
import ClientService, { ClientWithoutUser, IClient } from '../services/ClientService';
import { v4 as uuidv4 } from 'uuid';
import ClientModal from '../components/Modals/ClientModal.vue';
import { validateForm } from '../utils/functions';
import UserService from '../services/UserService';

onMounted(async () => {
  await getClients();
})

const toast = useToast();

const openUserModal = ref<boolean>(false);
const isUpdateUser = ref<boolean>(false);

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
  createdAt: new Date(),
  updatedAt: new Date(),
})

const handleRegisterClient = async (clientRegister: ClientWithoutUser) => {

      const { user } = UserService.getSession();

      const newClient = {
        ...clientRegister,
        id: uuidv4(),
        userRegister: user
      }

      const validate = validateForm(newClient);

      if (!validate) {
        toast.add({ severity: 'error', summary: 'Rejected', detail: `Register error - check empty fields!`, life: 3000 });
        return;
      }

      try {
        const clientResponse: any = ClientService.registerClient(newClient);
        if (clientResponse.response === 201) {
          toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Register Successfuly', life: 3000 });
          clearFormData();
          getClients();
          tableKey.value += 1;
        }
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Rejected', detail: `Register error - ${error}`, life: 3000 });
      }

};

const eventToUpdateClient = (clientToUpdate: ClientWithoutUser) => {
  formData.value.id = clientToUpdate.id;
  formData.value.name = clientToUpdate.name;
  formData.value.fullName = clientToUpdate.fullName;
  formData.value.cpf = clientToUpdate.cpf;
  formData.value.email = clientToUpdate.email;
  formData.value.celular = clientToUpdate.celular;
  formData.value.cep = clientToUpdate.cep;
  formData.value.status = clientToUpdate.status;

  openUserModal.value = true;
  isUpdateUser.value = true;
}

const handleUpdateClient = (clientToUpdate: ClientWithoutUser) => {
  try {
  
    const { user } = UserService.getSession();

    const updateClient = {
      ...clientToUpdate,
      userRegister: user
    }

    const clientResponse: any = ClientService.updateClient(updateClient);
    if (clientResponse.response === 404) {
      toast.add({ severity: 'error', summary: 'Rejected', detail: `Update error - ${clientResponse.msg}`, life: 3000 });
      return;
    }
    toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Updated Successfully', life: 3000 });
    getClients();
    tableKey.value += 1;
    clearFormData();
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Rejected', detail: `Update error - try again`, life: 3000 });
  }
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
  formData.value.id = '';
  formData.value.name = '';
  formData.value.fullName = '';
  formData.value.cpf = '';
  formData.value.email = '';
  formData.value.celular = '';
  formData.value.cep = '';
  formData.value.createdAt = new Date();
  formData.value.updatedAt = new Date();
  formData.value.status = 'ACTIVE';

  openUserModal.value = false;
  isUpdateUser.value = false;
}
</script>
