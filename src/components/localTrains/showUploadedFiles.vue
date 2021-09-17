<template>
  <table class="table is-fullwidth is-hoverable ">
    <thead>
      <tr>
        <th>Files</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files" :key="file" >
        <th v-on:click="selectFile(file)" >{{ file }}</th>
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
      files: [],
    }
  },
  emits: ["file"],
  methods:{
    async loadFileNames(){
      let url = `${process.env.VUE_APP_STATION_API}/local_trains/get_all_uploaded_file_names`;
      await axios.get(url).then(response => {
        let data = response.data.files;
        for (let index in data ){
          this.files.push(data[index]["_object_name"]);
        }
      });

    },
    selectFile(file){
      this.$emit("file",file);
    }

  },
  mounted() {
   this.loadFileNames();
  },
}
</script>

<style scoped>

</style>