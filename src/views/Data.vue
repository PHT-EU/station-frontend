<template>
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <SelectDataType
                    :table-data="tableData"
                    @refresh="getDataSets()"
                />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import SelectDataType from '@/components/data/SelectDataType';

export default {
    name: 'Data',
    components: { SelectDataType },
    data() {
        return {
            dataSets: [],
            tableData: [],
            newDataSet: {
                name: '',
                dataType: '',
                storageType: '',
                proposalId: 0,
                accessPath: '',
                nItems: 0,
                fhirUser: '',
                fhirPassword: '',
                fhirServerType: '',
            },
        };
    },
    mounted() {
        this.getDataSets();
    },
    methods: {
        async addDataset() {
            const url = `${process.env.VUE_APP_STATION_API}/datasets`;

            await axios.post(url, this.newDataSet);
            await this.getDataSets();
        },
        async getDataSets() {
            const url = `${process.env.VUE_APP_STATION_API}/datasets`;
            axios.get(url).then((response) => {
                this.dataSets = [];
                this.tableData = [];
                this.dataSets = response.data;
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
                for (const dataSet in this.dataSets) {
                    const dataSetDict = {};
                    dataSetDict.id = this.dataSets[dataSet].id;
                    dataSetDict.name = this.dataSets[dataSet].name;
                    dataSetDict.createdAt = this.dataSets[dataSet].created_at;
                    dataSetDict.storageType = this.dataSets[dataSet].storage_type;
                    dataSetDict.dataType = this.dataSets[dataSet].data_type;
                    dataSetDict.proposalId = this.dataSets[dataSet].proposal_id;
                    dataSetDict.accessPath = this.dataSets[dataSet].access_path;
                    dataSetDict.nItems = this.dataSets[dataSet].n_items;
                    dataSetDict.targetField = this.dataSets[dataSet].target_field;
                    dataSetDict.fhirUser = this.dataSets[dataSet].fhir_user;
                    dataSetDict.fhirPassword = this.dataSets[dataSet].fhir_password;
                    dataSetDict.fhirServerType = this.dataSets[dataSet].fhir_server_type;
                    this.tableData.push(dataSetDict);
                }
                console.log(this.tableData);
            });
        },

    },
};
</script>

<style scoped>

</style>
