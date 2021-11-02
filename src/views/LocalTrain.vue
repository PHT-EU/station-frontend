<template>
  <div id="train-container" class="container is-fluid is-centered">
    <div class="columns">
      <div class="column is-one-quarter">
      <localTrainPanel
          :localTrains="localTrains"
          @refresh="loadLocalTrains()"
          @addTrain="addTrainOpen"
          @trainSelected="trainSelected"
      ></localTrainPanel>
      </div>
      <div class="column">
<!--      <uploadEndpoint></uploadEndpoint>
      <showUploadedFiles
          @file="selectFile"
      ></showUploadedFiles> -->
     <!-- <showCode :fileName="fileName" ></showCode> -->
        <localTrainDetails
            :trainID="selectedTrain"
            :localTrains ="localTrains"
            @refresh="loadLocalTrains()"
        ></localTrainDetails>
      </div>
    </div>
  </div>
  <addTrain
    :showAddTrain="showAddTrain"
    @close="closeAddTrain()"
    @refresh="loadLocalTrains()"
  ></addTrain>
</template>

<script>
//import uploadEndpoint from "@/components/localTrains/uploadEndpoint";
//import showCode from "@/components/localTrains/showCode";
//import showUploadedFiles from "@/components/localTrains/showUploadedFiles";
import localTrainDetails from "@/components/localTrains/localTrainDetails";
import localTrainPanel from "@/components/localTrains/localTrainPanel";
import addTrain from "@/components/localTrains/addTrain";
import axios from "axios";
export default {
  name: "LocalTrain",
  components: { localTrainPanel, addTrain, localTrainDetails},
  data() {
    return {
      fileName: "",
      selectedTrain: "",
      localTrains: [],
      showAddTrain: false,
    }
  },
  methods: {
    selectFile(file){
      this.fileName=file;
    },
    closeAddTrain(){
      this.showAddTrain = false;
    },
    addTrainOpen(){
      this.showAddTrain = true;
    },
    trainSelected(trainId){
      this.selectedTrain=trainId;
    },
    async loadLocalTrains(){
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/getAllLocalTrains`;
      await axios.get(url).then(response => {
        this.localTrains = response.data;
      });

    },
  },
  mounted() {
    this.loadLocalTrains();
  }
}
</script>

<style scoped>
#train-container {
  margin-top: 10px;
}
</style>