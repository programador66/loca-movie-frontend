<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="data" paginator :rows="10" dataKey="id" filterDisplay="row" :loading="loading"
                :globalFilterFields="globalFilterFields">
            <template #header>
                <section class="flex items-center justify-between">
                    <div class="flex items-center">
                        <ButtonSecondary 
                                :text="'New Client'" 
                                :icon="'PLUS'" 
                                @click="handleRegisterClient" 
                        />
                    </div>
                    <div class="flex justify-end">
                        <span class="relative">
                            <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search"  class="pl-10 font-normal"/>
                        </span>
                    </div>
                </section>
            </template>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <template v-for="column in columns" :key="column.field">
                <Column v-if="column.field !== 'status'" :field="column.field" :header="column.header" :style="column.style" :class="column.class">
                    <template #body="{ data }">
                        {{ column.field === 'userRegister.name' ? data.userRegister.name : data[column.field] }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="'Search by ' + column.header" />
                    </template>

                </Column>
                <Column v-if="column.field === 'status'" :field="column.field" :header="column.header" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Tag :value="data.status" :severity="getSeverity(data.status)" />
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One" class="p-column-filter" style="min-width: 12rem" :showClear="true">
                            <template #option="slotProps">
                                <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                            </template>
                        </Dropdown>
                    </template>
                </Column>
            </template>
            <template>
                <Column header="Actions">
                <template #body="{ data }">
                    <section class="action-buttons">
                        <ButtonPrimary 
                            :text="'Update'" 
                            :icon="'PENCIL'" 
                            @click="handleUpdateClient(data)" 
                        />
                        <ButtonDanger 
                            :text="'Delete'" 
                            :icon="'TRASH'"
                            @click="handleDeleteClient(data)" 
                        />
                    </section>
                </template>
                </Column>
            </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits} from 'vue';
import { FilterMatchMode } from 'primevue/api';
import ButtonPrimary from '../../components/Buttons/ButtonPrimary.vue';
import ButtonDanger from '../../components/Buttons/ButtonDanger.vue';
import ButtonSecondary from '../../components/Buttons/ButtonSecondary.vue';

const { data } = defineProps({
    data: Array,
})

const localfilter = {
    "global": { value: null, matchMode: FilterMatchMode.CONTAINS },
    "cpf": { value: null, matchMode: FilterMatchMode.CONTAINS },
    "name": { value: null, matchMode: FilterMatchMode.CONTAINS },
    "email": { value: null, matchMode: FilterMatchMode.CONTAINS },
    "userRegister.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
    "status": { value: null, matchMode: FilterMatchMode.EQUALS },
}

const emit = defineEmits([
        'update-client',
        'delete-client',
        'register-client'
    ]);

const filters = ref(localfilter);

const globalFilterFields = ['name', 'status'];

const loading = ref(false);

const columns = [
    { field: 'name', header: 'Name', style: 'min-width: 12rem', class: 'text-gray-700' },
    { field: 'cpf', header: 'Cpf', style: 'min-width: 12rem', class: 'text-gray-700' },
    { field: 'email', header: 'E-mail', style: 'min-width: 12rem', class: 'text-gray-700' },
    { field: 'userRegister.name', header: 'Register By ', style: 'min-width: 12rem' },
    { field: 'status', header: 'Status', style: 'min-width: 12rem' },
];

const statuses = ref(['ACTIVE', 'INACTIVE']);

const getSeverity = (status: string) => {
    switch (status) {
        case 'INACTIVE':
            return 'danger';

        case 'ACTIVE':
            return 'success';
    }
}

const handleRegisterClient = () =>  emit('register-client');

const handleUpdateClient = (rowData:any) => {
  emit('update-client', rowData);
};

const handleDeleteClient = (rowData:any) => {
  emit('delete-client', rowData);
};
</script>

<style>
.action-buttons {
  display: flex;
  align-items: center;
}
</style>
