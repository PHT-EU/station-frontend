<template>
  <section class="main-content columns is-fullheight">
    <div  class="is-4 is-hidden-touch column">
      <localTrainPanel
          :localTrains="localTrains"
          @refresh="loadLocalTrains()"
          @addTrain="addTrainOpen"
          @trainSelected="trainSelected"
      ></localTrainPanel>
<!--      <uploadEndpoint></uploadEndpoint>
      <showUploadedFiles
          @file="selectFile"
      ></showUploadedFiles> -->
    </div>
    <div class="container column is-10">
      <showCode :fileName="fileName" ></showCode>
    </div>
  </section>
  <addTrain
    :showAddTrain="showAddTrain"
    @close="closeAddTrain()"
    @refresh="loadLocalTrains()"
  ></addTrain>
</template>

<script>
//import uploadEndpoint from "@/components/localTrains/uploadEndpoint";
import showCode from "@/components/localTrains/showCode";
//import showUploadedFiles from "@/components/localTrains/showUploadedFiles";
import localTrainPanel from "@/components/localTrains/localTrainPanel";
import addTrain from "@/components/localTrains/addTrain";
import axios from "axios";
export default {
  name: "LocalTrain",
  components: {showCode,  localTrainPanel, addTrain},
  data() {
    return {
      fileName: "",
      localTrains: [],
      showAddTrain: false,
    }
  },
  methods: {
    selectFile(file){
      console.log(file);
      console.log("text");
      this.fileName=file;
    },
    closeAddTrain(){
      this.showAddTrain = false;
    },
    addTrainOpen(){
      console.log("addTrain")
      this.showAddTrain = true;
    },
    trainSelected(trainId){
      console.log(trainId)
    },
    async loadLocalTrains(){
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/getAllLocalTrains`;
      await axios.get(url).then(response => {
        this.localTrains = response.data;
        //console.log(this.localTrains)
      });

    },
  },
  mounted() {
    this.loadLocalTrains();
  }

}
</script>

<style scoped>

</style>