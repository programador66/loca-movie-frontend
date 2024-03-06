<template>
  <section>
    <div class="max-w-screen-mlg mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-gray-800 mt-5 ml-8">User List</h2>
      <UserDataTable :data="data" @register-user="handleRegisterUser" @update-user="handleUpdateUser"
        @delete-user="handleDeleteUser" />
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
                <label for="document" class="block mb-1">Document</label>
                <InputText id="document" v-model="formData.document" class="w-full sm:w-80" />
              </div>
              <div class="p-field p-col mb-2">
                <label for="password" class="block mb-1">Password</label>
                <Password id="password" v-model="formData.password" class="w-full sm:w-80" />
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
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserDataTable from '../components/DataTables/UserDataTable.vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const data = ref([
  {
    id: "1",
    name: "Caio Cesar",
    document: "240150053",
    password: "12345",
    status: 'ACTIVE',
    passport: '1232',
  },
  {
    id: "2",
    name: "Suzana Lacerda",
    document: "2401145053",
    password: "12345",
    status: 'ACTIVE',
    passport: '1232',
  },
  {
    id: "3",
    name: "Laura Lacerda",
    document: "24242445053",
    password: "12345",
    status: 'ACTIVE',
    passport: '1232',
  },
  {
    id: "4",
    name: "Caio Black",
    document: "252150053",
    password: "12345",
    status: 'ACTIVE',
    passport: '1232',
  },
]);

const formData = ref({
  id: '',
  name: '',
  document: '',
  password: '',
  status: null,
  statusOptions: [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' }
  ]
})

const handleRegisterUser = () => {
  confirm.require({
    group: 'headless',
    header: 'Register New User',
    message: 'Please confirm to proceed moving forward.',
    // icon: 'pi pi-user-circle',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    acceptLabel: "Save",
    rejectLabel: "Cancel",
    rejectClass: 'p-button-sm p-button-outlined p-button-danger',
    acceptClass: 'p-button-outlined p-button-sm',
    accept: () => {
      console.log('data', formData);
      toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Register Successfuly', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  });
};

const handleUpdateUser = (rowData: any) => {
  // Lidar com o evento do botão de ação aqui
  console.log('Row data:', rowData);
};

const handleDeleteUser = (rowData: any) => {
  // Lidar com o evento do botão de ação aqui
  console.log('delete data:', rowData);
};

</script>

<style></style>
