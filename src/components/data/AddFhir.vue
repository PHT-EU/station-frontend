<template>
  <div class="container">
    <button class="button is-success is-outlined"  @click="showModal = true">
      <i class="far fa-plus-square"></i>
    </button>
    <div v-if="showModal" @close="showModal = false">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-content" >
        <div class="box">
          <h1 class="title"> Add a fhir dataset</h1>
          <table class="table is-fullwidth">
            <tbody>
            <tr><td> name of the new dataset </td>
              <td><input class="input is-primary"  v-model="newDataSet.name" type="text" placeholder="name"></td></tr>
            <tr><td> data type </td>
              <td><input class="input is-primary" v-model="newDataSet.dataType" type="text" placeholder="data type"></td></tr>
            <tr><td> url </td><td><input class="input is-primary" v-model="newDataSet.accessPath" type="text" placeholder="access path"></td></tr>
            <tr><td> proposal id </td>
              <td><input class="input is-primary" v-model="newDataSet.proposalId" type="text" placeholder="proposal id"></td></tr>
            <tr ><td> user of the fhir server </td><td><input class="input is-primary" v-model="newDataSet.fhirUser" type="text" placeholder="fhir user"></td></tr>
            <tr ><td> password for the fhir user </td><td><input class="input is-primary" v-model="newDataSet.fhirPassword" type="password" placeholder="fhir password"></td></tr>
            <tr><td> type of fhir server </td><td><div class="select is-primary">
              <select v-model="newDataSet.fhirServerType" >
                <option disabled value="">Please select one fhir server type</option>
                <option>blaze</option>
                <option>hapi</option>
                <option>ibm</option>
              </select>
            </div></td></tr>
            <tr><td><button class="button is-success is-outlined" v-on:click="addDataset()">
              add dataset
            </button></td>
              <td><button class="button is-success is-outlined" @click="showModal = false">
                close
              </button></td></tr>
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
  name: "addFhir",
  data() {
    return  {
      showModal: false,
      fhirServer: false,
      newDataSet: {
        name: "",
        dataType: "fhir",
        storageType: "fhir",
        proposalId: 0,
        accessPath: "",
        targetField: "",
        nItems: 0,
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
            fhir_user:this.newDataSet.nItems,
            fhir_password:this.newDataSet.fhirPassword,
            fhir_server_type:this.newDataSet.fhirServerType
      };
      await axios.post(url, postDataSet);
      this.showModal = false;
      this.$emit('refresh');
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