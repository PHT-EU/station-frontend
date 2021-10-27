<template>
  <div class="column is-6 is-offset-3">
    <table class="table is-fullwidth is-hoverable ">
      <thead>
        <tr>
          <th>Files</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file" >
          <td v-on:click="selectFile(file)" >{{ file }} </td>
          <td>
            <button class="button is-danger is-outlined "  v-on:click="deleteDataset(file)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
  props: {selectedTrain :Object},
  emits: ["file"],
  methods:{
    async deleteDataset(file) {
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/deleteFile/`+ file;
      await axios.delete(url);
      this.files =this.files.filter(item => item !== file)

    },
    async loadFileNames(){
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/getAllUploadedFileNames/`+this.selectedTrain["train_id"];
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