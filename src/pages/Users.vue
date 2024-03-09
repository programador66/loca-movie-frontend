<template>
  <section>
    <div class="max-w-screen-mlg mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-gray-800 mt-5 ml-8">User List</h2>
      <UserDataTable :data="data" 
        @register-user="openUserModal = true" 
        @update-user="eventToUpdateUser"
        @delete-user="openModalDecisionDeleteUser"
        :key="tableKey" />
    </div>
    <Toast />
    <UserModal  
      :data="formData"
      :openUserModal="openUserModal"
      :isUpdateUser="isUpdateUser"
      @register-new-user="handleRegisterUser"
      @update-user="handleUpdateUser"
      @close-modal="clearFormData"
    />
    <ConfirmPopup></ConfirmPopup>

    <Dialog v-model:visible="visible" modal header="Delete User" :style="{ width: '25rem' }"
      :breakpoints="{ '800px': '75vw', '575px': '90vw' }">
      <p>
        Do you want to proceed with deleting the user?
      </p>
      <div class="flex items-center gap-2 mt-4">
        <Button label="Delete" @click="handleDeleteUser(true)" class="w-[8rem] p-button-danger p-button-text"
          severity="danger"></Button>
        <Button label="Cancel" outlined @click="handleDeleteUser(false)" class="w-[8rem]"></Button>
      </div>
    </Dialog>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UserDataTable from '../components/DataTables/UserDataTable.vue';
import { useToast } from "primevue/usetoast";
import UserService, { IUser } from '../services/UserService';
import { v4 as uuidv4 } from 'uuid';
import UserModal from '../components/Modals/UserModal.vue';
import { validateForm } from '../utils/functions';

onMounted(async () => {
  await getUsers();
});

const toast = useToast();

const openUserModal = ref<boolean>(false);
const isUpdateUser = ref<boolean>(false);
const visible = ref(false);
const data = ref<IUser[]>();
const tableKey = ref(0);


const formData = ref<IUser>({
  id: '',
  name: '',
  document: '',
  username: '',
  password: '',
  status: 'ACTIVE',
  createdAt: new Date(),
  updatedAt: new Date()
})


const handleRegisterUser = async (data: any) => {

  const newUser = {
    id: uuidv4(),
    name: data.value.name,
    document: data.value.document,
    username: data.value.username,
    password: data.value.password,
    status: data.value.status,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const validate = validateForm(newUser);

  if (!validate) {
        toast.add({ severity: 'error', summary: 'Rejected', detail: `Register error - check empty fields!`, life: 3000 });
        return;
    }

  try {
    const userResponse: any = UserService.registerUser(newUser);
    if (userResponse.response === 201) {
      toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Register Successfuly', life: 3000 });
      getUsers();
      tableKey.value += 1;
      clearFormData();
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Rejected', detail: `Register error - ${error}`, life: 3000 });
  }
};

const handleUpdateUser = (userToUpdate: IUser) => {
  try {
    const userResponse: any = UserService.updateUser(userToUpdate);
    console.log('chamou', userResponse);
    if (userResponse.response === 404) {
      toast.add({ severity: 'error', summary: 'Rejected', detail: `Update error - ${userResponse.msg}`, life: 3000 });
      return;
    }
    toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Updated Successfully', life: 3000 });
    getUsers();
    tableKey.value += 1;
    clearFormData();
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Rejected', detail: `Update error - try again`, life: 3000 });
  }

};

const eventToUpdateUser = (userToUpdate: IUser) => {
  formData.value.id = userToUpdate.id;
  formData.value.name = userToUpdate.name;
  formData.value.document = userToUpdate.document;
  formData.value.username = userToUpdate.username;
  formData.value.password = userToUpdate.password;
  formData.value.status = userToUpdate.status;
  openUserModal.value = true;
  isUpdateUser.value = true;
}

const openModalDecisionDeleteUser = (rowData: any) => {
  visible.value = true;
  formData.value = rowData;
}

const handleDeleteUser = (isDeleteUser: boolean) => {
  if (!isDeleteUser) {
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

  const deleteUser = UserService.deleteUser(formData.value.id);

  toast.add({ 
    severity: 'success',
    summary: 'Confirmed',
    detail: 'Register was Deleted',
    life: 3000 
  });
  if (deleteUser.response === 200) {
    clearFormData();
    getUsers();
    visible.value = false;
    tableKey.value += 1;
  }

};

const getUsers = async () => {
  const response = await UserService.getUsers();
  const sortData = response
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return data.value = sortData;
};

const clearFormData = () => {
  
  formData.value.id = '';
  formData.value.name = '';
  formData.value.document = '';
  formData.value.username = '';
  formData.value.password = '';
  formData.value.status = 'ACTIVE';
  formData.value.createdAt = new Date();
  formData.value.updatedAt = new Date();

  openUserModal.value = false;
  isUpdateUser.value = false;
}

</script>

<style></style>
