<template>
    <div class="tabs is-centered is-medium">
        <ul>
            <li
                :class="{'is-active': selectedTab==='Fhir'}"
                @click="selectTab('Fhir')"
            >
                <a>
                    FHIR
                    <i class="fas fa-fire-alt" />
                </a>
            </li>
            <li
                :class="{'is-active': selectedTab==='CSV'}"
                @click="selectTab('CSV')"
            >
                <a>
                    CSV &nbsp;  <i class="fas fa-table" />
                </a>
            </li>
            <li
                :class="{'is-active': selectedTab==='MinIO'}"
                @click="selectTab('MinIO')"
            >
                <a>
                    MinIO &nbsp; <i class="fas fa-database" />
                </a>
            </li>
        </ul>
    </div>
    <div id="tab-content">
        <FhirTable
            v-if="selectedTab==='Fhir'"
            :table-data="FhirFilter"
            @refresh="refresh()"
        />
        <CSVTable
            v-if="selectedTab==='CSV'"
            :table-data="CSVFilter"
            @refresh="refresh()"
        />
        <MinIOTable
            v-if="selectedTab==='MinIO'"
            :table-data="MinIOFilter"
            @refresh="refresh()"
        />
        <AddFhir
            v-if="selectedTab==='Fhir'"
            @refresh="refresh()"
        />
        <AddCSV
            v-if="selectedTab==='CSV'"
            @refresh="refresh()"
        />
        <AddMinIO
            v-if="selectedTab==='MinIO'"
            @refresh="refresh()"
        />
    </div>
</template>

<script>
import CSVTable from '@/components/data/CSVTable';
import AddCSV from '@/components/data/AddCSV';
import FhirTable from '@/components/data/FhirTable';
import AddFhir from '@/components/data/AddFhir';
import MinIOTable from '@/components/data/MinIOTable';
import AddMinIO from '@/components/data/AddMinIO';

export default {
    name: 'SelectDataType',
    components: {
        CSVTable, FhirTable, MinIOTable, AddCSV, AddFhir, AddMinIO,
    },
    props: { tableData: Array },
    emits: ['refresh'],
    data() {
        return {
            selectedTab: 'Fhir',
        };
    },
    computed: {
        CSVFilter() {
            return this.tableData.filter((row) => row.storageType === 'csv');
        },
        FhirFilter() {
            return this.tableData.filter((row) => row.storageType === 'fhir');
        },
        MinIOFilter() {
            return this.tableData.filter((row) => row.storageType === 'minio');
        },
    },
    methods: {
        selectTab(tab) {
            this.selectedTab = tab;
        },
        refresh() {
            this.$emit('refresh');
        },
    },
};
</script>

<style scoped>

</style>
