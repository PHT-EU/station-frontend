<template>
  <div class="container">
    <button class="button is-success is-outlined"  @click="showModal = true">
      <i class="far fa-plus-square"></i>
    </button>
    <div v-if="showModal" @close="showModal = false">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-content" >
        <div class="box">
          <h1 class="title"> Add a CSV dataset</h1>
          <table class="table is-fullwidth">
            <tbody>
            <tr><td> name of the new dataset </td>
              <td><input class="input is-primary"  v-model="newDataSet.name" type="text" placeholder="name"></td></tr>
            <tr><td> access path </td><td><input class="input is-primary" v-model="newDataSet.accessPath" type="text" placeholder="access path"></td></tr>
            <tr><td> proposal id </td>
              <td><input class="input is-primary" v-model.number="newDataSet.proposalId" type="number" placeholder="proposal id"></td></tr>
            <tr><td> target field (optional) </td>
              <td><input class="input is-primary" v-model="newDataSet.targetField" type="text" placeholder="target field"></td></tr>

            <tr v-if="!postNotWorking" ><td><button class="button is-success is-outlined" v-on:click="addDataset()">
              add dataset
            </button></td>
              <td><button class="button is-success is-outlined" @click="showModal = false">
                close
              </button></td></tr>

            <tr v-if="postNotWorking"><td><button class="button is-danger is-outlined" v-on:click="addDataset()">
              add dataset
            </button></td>
              <td><button class="button is-danger is-outlined" @click="showModal = false; postNotWorking=false">
                close
              </button></td></tr>
            <tr v-if="postNotWorking">
              <td>
                <p>
                  Adding this dataset is not working, the post resulted in following error massage {{error}}
                </p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddCSV",
  data() {
    return  {
      showModal: false,
      fhirServer: false,
      postNotWorking: false,
      error:"",
      newDataSet: {
        name: "",
        dataType: "csv",
        storageType: "csv",
        proposalId: NaN,
        accessPath: "",
        targetField: "",
        nItems: NaN,
        fhirUser: "" ,
        fhirPassword: "",
        fhirServerType: ""
      },
    }
  },
  emits: ['refresh'],
  methods: {
    async addDataset(){
      let url = `${process.env.VUE_APP_STATION_API}/datasets`;
      let postDataSet ={
        name: this.newDataSet.name,
        data_type: this.newDataSet.dataType,
        storage_type:this.newDataSet.storageType,
        proposal_id:this.newDataSet.proposalId,
        access_path:this.newDataSet.accessPath,
        target_field:this.newDataSet.targetField,
        n_items:this.newDataSet.nItems,
        fhir_user:this.newDataSet.fhirUser,
        fhir_password:this.newDataSet.fhirPassword,
        fhir_server_type:this.newDataSet.fhirServerType
      };
      await axios.post(url, postDataSet)
          .then(response =>{
            console.log(response);
            this.showModal = false;
            this.$emit('refresh');
          })
          .catch(error => {
            this.postNotWorking = true;
            console.log(error);
            this.error = error
      });
    }
  }
}
</script>

<style scoped>
.table{
  align-self: center;
}
.modal-content{
  z-index: 9999;
  position: absolute;
  margin-top: 20%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.modal-background {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}
</style>