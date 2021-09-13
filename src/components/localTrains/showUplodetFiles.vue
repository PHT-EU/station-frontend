<template>
  <table class="table is-fullwidth is-hoverable ">
    <thead>
      <tr>
        <th>Files</th>
      </tr>
    <tbody>
      <tr v-for="file in files" :key="file" >
        <th @click=emit(file) >{{ file }}</th>
      </tr>
  </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "showUploadedFiles",
  data(){
    return {
      files: []
    }
  },
  methods:{
    loadFileNames(){
      let url = `${process.env.VUE_APP_STATION_API}/local_trains/get_all_uploaded_file_name`;
      axios.get(url).then(response => {
        this.dataSets = response.data;
      });
    },
    emit(file){
      return file
    }

  }
}
</script>

<style scoped>

</style>