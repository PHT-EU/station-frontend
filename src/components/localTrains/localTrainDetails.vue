<template>
    <h2 class="is-centered title">
        Train: {{ selectedTrain ? selectedTrain['train_name'] : 'Not selected' }}
    </h2>
    <div class="tabs is-centered is-medium">
        <ul>
            <li
                :class="{'is-active': selectedTab==='Overview'}"
                @click="selectTab('Overview')"
            >
                <a>
                    Overview &nbsp;  <i class="fas fa-fire-alt" />
                </a>
            </li>
            <li
                :class="{'is-active': selectedTab==='Configure'}"
                @click="selectTab('Configure')"
            >
                <a>
                    Configure &nbsp;  <i class="fas fa-table" />
                </a>
            </li>
            <li
                :class="{'is-active': selectedTab==='Run Train'}"
                @click="selectTab('Run Train')"
            >
                <a>
                    Run Train &nbsp;<i class="fas fa-history" />
                </a>
            </li>
            <li
                :class="{'is-active': selectedTab==='Files'}"
                @click="selectTab('Files')"
            >
                <a>
                    Files &nbsp; <i class="fas fa-database" />
                </a>
            </li>
        </ul>
    </div>
    <div id="tab-content">
        <configureLocalTrain
            v-if="selectedTab==='Configure'"
            :selected-train="selectedTrain"
            @refresh="refreshTrain()"
        />
        <showUploadedFiles
            v-if="selectedTab==='Files'"
            :key="selectedTrain"
            :selected-train="selectedTrain"
            @refresh="refresh()"
        />
        <runTrain
            v-if="selectedTab==='Run Train'"
            :selected-train="selectedTrain"
        />
        <localTrainOverview
            v-if="selectedTab==='Overview'"
            :selected-train="selectedTrain"
        />
    </div>
</template>

<script>

import configureLocalTrain from '@/components/localTrains/configureLocalTrain';
import showUploadedFiles from '@/components/localTrains/showUploadedFiles';
import runTrain from '@/components/localTrains/runTrain';
import localTrainOverview from '@/components/localTrains/localTrainOverview';

export default {
    name: 'LocalTrainDetails',
    components: {
        configureLocalTrain, showUploadedFiles, runTrain, localTrainOverview,
    },
    props: { trainID: String, localTrains: Array },
    emits: ['refresh'],
    data() {
        return {
            fileName: '',
            selectedTrain: Object,
            localTrainsList: [],
            selectedTab: '',
        };
    },
    watch: {
        trainID(newVal) {
            this.getTrain(newVal);
        },
        localTrains(newVal) {
            this.localTrainsList = newVal;
            this.getTrain(this.trainID);
        },
    },
    methods: {
        refresh() {
            this.$emit('refresh');
        },
        getTrain(trainID) {
            let trainSelected = false;
            for (let i = 0; i < this.localTrainsList.length; i++) {
                if (trainID === this.localTrainsList[i].train_id) {
                    this.selectedTrain = this.localTrainsList[i];
                    trainSelected = true;
                }
            }
            // this is needed to prevent problems when no train was selected
            if (!trainSelected) {
                this.selectedTrain = {
                    airflow_config_json: {
                        entrypoint: null,
                        env: null,
                        query: null,
                        repository: '',
                        tag: '',
                        train_id: '',
                        volumes: null,
                    },
                    created_at: '',
                    id: NaN,
                    is_active: false,
                    train_id: '',
                    train_name: 'No train Selected',
                    updated_at: '',
                };
                console.log('get train in local trains details ');
            }
            console.log('get train in local trains details ');
        },
        selectTab(tap) {
            this.selectedTab = tap;
            console.log(this.selectedTab);
        },
        refreshTrain() {
            this.$emit('refresh');
        },
    },
};
</script>

<style scoped>

</style>
