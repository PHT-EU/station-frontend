<template>
    <div class="container">
        <button
            class="button is-success is-outlined"
            @click="showModal = true"
        >
            <i class="far fa-plus-square" />
        </button>
        <div
            v-if="showModal"
            @close="showModal = false"
        >
            <div
                class="modal-background"
                @click="showModal = false"
            />
            <div class="modal-content">
                <div class="box">
                    <H1 class="title">
                        Add a dataset
                    </H1>
                    <table class="table is-fullwidth">
                        <tbody>
                            <tr>
                                <td> name of the new dataset </td>
                                <td>
                                    <input
                                        v-model="newDataSet.name"
                                        class="input is-primary"
                                        type="text"
                                        placeholder="name"
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td> storage type </td>
                                <td>
                                    <input
                                        v-model="newDataSet.storageType"
                                        class="input is-primary"
                                        type="text"
                                        placeholder="storage type"
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td> data type </td>
                                <td>
                                    <input
                                        v-model="newDataSet.dataType"
                                        class="input is-primary"
                                        type="text"
                                        placeholder="data type"
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td> access path </td><td>
                                    <input
                                        v-model="newDataSet.accessPath"
                                        class="input is-primary"
                                        type="text"
                                        placeholder="access path"
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td> proposal id </td>
                                <td>
                                    <input
                                        v-model="newDataSet.proposalId"
                                        class="input is-primary"
                                        type="text"
                                        placeholder="proposal id"
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td> target field (optional) </td>
                                <td>
                                    <input
                                        v-model="newDataSet.targetField"
                                        class="input is-primary"
                                        type="text"
                                        placeholder="target field"
                                    >
                                </td>
                            </tr>

                            <tr>
                                <td /><td>
                                    <label class="checkbox">
                                        <input
                                            v-model="fhir_server"
                                            class="checkbox is-primary"
                                            type="checkbox"
                                            value="true"
                                        >
                                        add a fhir server
                                    </label>
                                </td>
                            </tr>
                            <tr v-if="fhir_server">
                                <td> user of the fhir server </td><td>
                                    <input
                                        v-if="fhir_server"
                                        v-model="newDataSet.fhirUser"
                                        class="input is-primary"
                                        type="text"
                                        placeholder="fhir user"
                                    >
                                </td>
                            </tr>
                            <tr v-if="fhir_server">
                                <td> password for the fhir user </td><td>
                                    <input
                                        v-if="fhir_server"
                                        v-model="newDataSet.fhirPassword"
                                        class="input is-primary"
                                        type="password"
                                        placeholder="fhir password"
                                    >
                                </td>
                            </tr>
                            <tr v-if="fhir_server">
                                <td> type of fhir server </td><td>
                                    <div
                                        v-if="fhir_server"
                                        class="select is-primary"
                                    >
                                        <select
                                            v-if="fhir_server"
                                            v-model="newDataSet.fhirServerType"
                                        >
                                            <option
                                                disabled
                                                value=""
                                            >
                                                Please select one fhir server type
                                            </option>
                                            <option>blaze</option>
                                            <option>hapi</option>
                                            <option>ibm</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        class="button is-success is-outlined"
                                        @click="addDataset()"
                                    >
                                        add dataset
                                    </button>
                                </td>
                                <td>
                                    <button
                                        class="button is-success is-outlined"
                                        @click="showModal = false"
                                    >
                                        close
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PopUpForm',
    emits: ['refresh'],
    data() {
        return {
            showModal: false,
            fhirServer: false,
            newDataSet: {
                name: '',
                dataType: '',
                storageType: '',
                proposalId: 0,
                accessPath: '',
                targetField: '',
                nItems: 0,
                fhirUser: '',
                fhirPassword: '',
                fhirServerType: '',
            },
        };
    },
    methods: {
        async addDataset() {
            const url = `${process.env.VUE_APP_STATION_API}/datasets`;
            const postDataSet = {
                name: this.newDataSet.name,
                data_type: this.newDataSet.dataType,
                storage_type: this.newDataSet.storageType,
                proposal_id: this.newDataSet.proposalId,
                access_path: this.newDataSet.accessPath,
                target_field: this.newDataSet.targetField,
                n_items: this.newDataSet.nItems,
                fhir_user: this.newDataSet.nItems,
                fhir_password: this.newDataSet.fhirPassword,
                fhir_server_type: this.newDataSet.fhirServerType,
            };
            await axios.post(url, postDataSet);
            this.showModal = false;
            this.$emit('refresh');
        },
    },
};
</script>

<style scoped>
.table{
  align-self: center;
}
.modal-content{
  z-index: 9999;
  position: absolute;
  margin-top: 20%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.modal-background {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}
</style>
