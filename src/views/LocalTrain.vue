<template>
  <section class="main-content columns is-fullheight">
    <div  class="is-4 is-hidden-touch column">
      <localTrainPanel :localTrains="localTrains"></localTrainPanel>
      <uploadEndpoint></uploadEndpoint>
      <showUploadedFiles @file="selectFile"  ></showUploadedFiles>
    </div>
    <div class="container column is-10">
      <showCode :fileName="fileName" ></showCode>
    </div>
  </section>
</template>

<script>
import uploadEndpoint from "@/components/localTrains/uploadEndpoint";
import showCode from "@/components/localTrains/showCode";
import showUploadedFiles from "@/components/localTrains/showUploadedFiles";
import localTrainPanel from "@/components/localTrains/localTrainPanel";
export default {
  name: "LocalTrain",
  components: {uploadEndpoint, showCode, showUploadedFiles, localTrainPanel},
  data() {
    return {
      fileName: "",
      localTrains: "",
    }
  },
  methods: {
    selectFile(file){
      console.log(file);
      console.log("text");
      this.fileName=file;
    }
  }

}
</script>

<style scoped>

</style>