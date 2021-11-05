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
        <tr v-for="file in files" :key="file" >
          <td v-on:click="selectFile(file)" >{{ file }} </td>
          <td> {{purposeDict[file]}}</td>
          <td>
            <div class="dropdown is-active">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" v-on:click="activateDropDown(file)" aria-controls="dropdown-menu">
                  <span>Select</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu" v-if="dropDownDict[file] === true" >
                <div class="dropdown-content">
                  <a v-on:click="addQueryFile(file)" class="dropdown-item">
                    Query
                  </a>
                  <a v-on:click="addEntrypointFile(file)" class="dropdown-item">
                    Entrypoint
                  </a>
                </div>
              </div>
            </div>
          </td>
          <td>
            <downloadFile
              :file="file"
              :selectedTrain="selectedTrain"
            ></downloadFile>
          </td>
          <td>
            <button class="button is-danger is-outlined "  v-on:click="deleteDataset(file)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <addFiles :selectedTrain="selectedTrain" @newFilesAdded="loadFileNames(selectedTrain)"></addFiles>
</template>

<script>
import axios from "axios";

import addFiles from "@/components/localTrains/addFiles";
import downloadFile from "@/components/localTrains/downloadFile";
export default {
  name: "showUploadedFiles",
  data(){
    return {
      files: [],
      dropDownDict: {},
      purposeDict:{},
    }
  },
  components: {addFiles, downloadFile},
  props: {selectedTrain :Object},
  emits: ["file", "refresh"],
  watch: {
    selectedTrain: function (newVal) {
      console.log(newVal)
      this.loadFileNames(newVal)
    }
  },
  methods:{
    async deleteDataset(file) {
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/deleteFile/`+this.selectedTrain["train_id"]+'/'+ file;
      await axios.delete(url);
      this.files =this.files.filter(item => item !== file)

    },
    async loadFileNames(train){
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/getAllUploadedFileNames/`+train["train_id"];
      console.log("reload Files")
      await axios.get(url).then(response => {
        let data = response.data.files;
        this.files = []
        for (let index in data ){
          let filename =data[index]["_object_name"].split('/')[1];
          this.files.push(filename);
          this.dropDownDict[filename] = false;
          if (this.selectedTrain["airflow_config_json"]["query"] ===filename){
            this.purposeDict[filename]="query";
          } else if (this.selectedTrain["airflow_config_json"]["entrypoint"] ===filename){
            this.purposeDict[filename]="entrypoint";
          } else{
            this.purposeDict[filename]= "";
          }
        }
      });
    },
    selectFile(file){
      this.$emit("file",file);
    },
    activateDropDown(file){
      this.dropDownDict[file] = !this.dropDownDict[file];
    },
    async addQueryFile(file){
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/addQuery/${this.selectedTrain["train_id"]}/${file}`;
      await axios.put(url).then(response => {console.log(response)});
      this.dropDownDict[file] = false;
      this.$emit('refresh');
    },
    async addEntrypointFile(file){
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/addEntrypoint/${this.selectedTrain["train_id"]}/${file}`;
      await axios.put(url).then(response => {console.log(response)});
      this.dropDownDict[file] = false;
      this.$emit('refresh');
    },

  },
  mounted() {
   this.loadFileNames(this.selectedTrain);
  },
}
</script>

<style scoped>

</style>