<template>
    <div class="column is-6 is-offset-3">
        <table class="table is-fullwidth is-hoverable ">
            <thead>
                <tr>
                    <th>Files</th>
                    <th>Purpose</th>
                    <th>Purpose Selection</th>
                    <th>Download</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="file in files"
                    :key="file"
                >
                    <td @click="selectFile(file)">
                        {{ file }}
                    </td>
                    <td> {{ purposeDict[file] }}</td>
                    <td>
                        <div class="dropdown is-active">
                            <div class="dropdown-trigger">
                                <button
                                    class="button"
                                    aria-haspopup="true"
                                    aria-controls="dropdown-menu"
                                    @click="activateDropDown(file)"
                                >
                                    <span>Select</span>
                                    <span class="icon is-small">
                                        <i
                                            class="fas fa-angle-down"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </button>
                            </div>
                            <div
                                v-if="dropDownDict[file] === true"
                                id="dropdown-menu"
                                class="dropdown-menu"
                                role="menu"
                            >
                                <div class="dropdown-content">
                                    <a
                                        class="dropdown-item"
                                        @click="addQueryFile(file)"
                                    >
                                        Query
                                    </a>
                                    <a
                                        class="dropdown-item"
                                        @click="addEntrypointFile(file)"
                                    >
                                        Entrypoint
                                    </a>
                                    <a
                                        class="dropdown-item"
                                        @click="removePurpose(file)"
                                    >
                                        no
                                    </a>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <downloadFile
                            :file="file"
                            :selected-train="selectedTrain"
                        />
                    </td>
                    <td>
                        <button
                            class="button is-danger is-outlined "
                            @click="deleteDataset(file)"
                        >
                            <i class="far fa-trash-alt" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <addFiles
        :selected-train="selectedTrain"
        @newFilesAdded="loadFileNames(selectedTrain)"
    />
</template>

<script>
import axios from 'axios';

import addFiles from '@/components/localTrains/addFiles';
import downloadFile from '@/components/localTrains/downloadFile';

export default {
    name: 'ShowUploadedFiles',
    components: { addFiles, downloadFile },
    props: { selectedTrain: Object },
    emits: ['file', 'refresh'],
    data() {
        return {
            files: [],
            dropDownDict: {},
            purposeDict: {},
        };
    },
    watch: {
        selectedTrain(newVal) {
            console.log(newVal);
            this.loadFileNames(newVal);
        },
    },
    mounted() {
        this.loadFileNames(this.selectedTrain);
    },
    methods: {
        async deleteDataset(file) {
            const url = `${process.env.VUE_APP_STATION_API}/localTrains/deleteFile/${this.selectedTrain.train_id}/${file}`;
            await axios.delete(url);
            this.files = this.files.filter((item) => item !== file);
        },
        async loadFileNames(train) {
            const url = `${process.env.VUE_APP_STATION_API}/localTrains/getAllUploadedFileNames/${train.train_id}`;
            console.log('reload Files');
            await axios.get(url).then((response) => {
                const data = response.data.files;
                this.files = [];
                // eslint-disable-next-line no-restricted-syntax
                for (const file in data.values) {
                    // eslint-disable-next-line no-underscore-dangle
                    const filename = file._object_name.split('/').slice(1).join('/');
                    this.files.push(filename);
                    this.dropDownDict[filename] = false;
                    if (this.selectedTrain.airflow_config_json.query === filename) {
                        this.purposeDict[filename] = 'query';
                    } else if (this.selectedTrain.airflow_config_json.entrypoint === filename) {
                        this.purposeDict[filename] = 'entrypoint';
                    } else {
                        this.purposeDict[filename] = '';
                    }
                }
            });
        },
        selectFile(file) {
            this.$emit('file', file);
        },
        activateDropDown(file) {
            this.dropDownDict[file] = !this.dropDownDict[file];
        },
        async addQueryFile(file) {
            const url = `${process.env.VUE_APP_STATION_API}/localTrains/addQuery/${this.selectedTrain.train_id}/${file}`;
            await axios.put(url).then((response) => { console.log(response); });
            this.dropDownDict[file] = false;
            this.$emit('refresh');
        },
        async addEntrypointFile(file) {
            const url = `${process.env.VUE_APP_STATION_API}/localTrains/addEntrypoint/${this.selectedTrain.train_id}/${file}`;
            await axios.put(url).then((response) => { console.log(response); });
            this.dropDownDict[file] = false;
            this.$emit('refresh');
        },
        async removePurpose(file) {
            const key = this.getKey(file);
            console.log(key);
            const url = `${process.env.VUE_APP_STATION_API}/localTrains/RemoveConfigElement/${this.selectedTrain.train_id}/${key}`;
            await axios.put(url).then((response) => { console.log(response); });
            this.dropDownDict[file] = false;
            this.$emit('refresh');
        },
        getKey(file) {
            const config = this.selectedTrain.airflow_config_json;
            return Object.keys(config).find((key) => config[key] === file);
        },
    },
};
</script>

<style scoped>

</style>
