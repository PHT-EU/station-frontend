<template>
    <div
        id="train-container"
        class="container is-fluid is-centered"
    >
        <div class="columns">
            <div class="column is-one-quarter">
                <localTrainPanel
                    :local-trains="localTrains"
                    @refresh="loadLocalTrains()"
                    @addTrain="addTrainOpen"
                    @trainSelected="trainSelected"
                />
            </div>
            <div class="column">
                <!--      <uploadEndpoint></uploadEndpoint>
      <showUploadedFiles
          @file="selectFile"
      ></showUploadedFiles> -->
                <!-- <showCode :fileName="fileName" ></showCode> -->
                <localTrainDetails
                    :train-i-d="selectedTrain"
                    :local-trains="localTrains"
                    @refresh="loadLocalTrains()"
                />
            </div>
        </div>
    </div>
    <addTrain
        :show-add-train="showAddTrain"
        @close="closeAddTrain()"
        @refresh="loadLocalTrains()"
    />
</template>

<script>
// import uploadEndpoint from "@/components/localTrains/uploadEndpoint";
// import showCode from "@/components/localTrains/showCode";
// import showUploadedFiles from "@/components/localTrains/showUploadedFiles";
import axios from 'axios';
import localTrainDetails from '@/components/localTrains/localTrainDetails';
import localTrainPanel from '@/components/localTrains/localTrainPanel';
import addTrain from '@/components/localTrains/addTrain';

export default {
    name: 'LocalTrain',
    components: { localTrainPanel, addTrain, localTrainDetails },
    data() {
        return {
            fileName: '',
            selectedTrain: '',
            localTrains: [],
            showAddTrain: false,
        };
    },
    mounted() {
        this.loadLocalTrains();
    },
    methods: {
        selectFile(file) {
            this.fileName = file;
        },
        closeAddTrain() {
            this.showAddTrain = false;
        },
        addTrainOpen() {
            this.showAddTrain = true;
        },
        trainSelected(trainId) {
            this.selectedTrain = trainId;
        },
        async loadLocalTrains() {
            const url = `${process.env.VUE_APP_STATION_API}/localTrains/getAllLocalTrains`;
            await axios.get(url).then((response) => {
                this.localTrains = response.data;
            });
        },
    },
};
</script>

<style scoped>
#train-container {
  margin-top: 10px;
}
</style>
