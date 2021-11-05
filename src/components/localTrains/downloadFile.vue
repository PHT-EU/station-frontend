<template>
  <button class="button is-success is-outlined "  v-on:click="downloadFile()">
    <i class="fas fa-cloud-download-alt"></i>
  </button>
</template>

<script>
import axios from "axios";
export default {
  name: "downloadFile",
  props: {selectedTrain :Object, file: String},
  methods: {
     async downloadFile(){
       let Data ={
         train_id: this.selectedTrain['train_id'],
         file_name: this.file
       };
       let post_url = `${process.env.VUE_APP_STATION_API}/localTrains/getFile` ;
      console.log(this.file,Data)
      await axios.get(post_url,
          {params:Data,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.file);
        document.body.appendChild(link);
        link.click();
      });
    }
  }
}
</script>

<style scoped>

</style>