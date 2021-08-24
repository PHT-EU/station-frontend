<template>
  <div class="container">
    <button class="button is-success is-outlined"  @click="showModal = true">
      <i class="far fa-plus-square"></i>
    </button>
    <div v-if="showModal" @close="showModal = false">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-content" >
        <div class="box">
          <H1 class="title"> Add a fhir dataset</H1>
          <table class="table is-fullwidth">
            <tbody>
            <tr><td> name of the new dataset </td>
              <td><input class="input is-primary"  v-model="newDataSet.name" type="text" placeholder="name"></td></tr>
            <tr><td> data type </td>
              <td><input class="input is-primary"  v-model="newDataSet.data_type" type="text" placeholder="data type"></td></tr>
            <tr><td> url </td><td><input class="input is-primary"  v-model="newDataSet.access_path" type="text" placeholder="access path"></td></tr>
            <tr><td> proposal id </td>
              <td><input class="input is-primary"  v-model="newDataSet.proposal_id" type="text" placeholder="proposal id"></td></tr>
            <tr ><td> user of the fhir server </td><td><input class="input is-primary"   v-model="newDataSet.fhir_user" type="text" placeholder="fhir user"></td></tr>
            <tr ><td> password for the fhir user </td><td><input class="input is-primary"  v-model="newDataSet.fhir_password" type="password" placeholder="fhir password"></td></tr>
            <tr><td> type of fhir server </td><td><div class="select is-primary">
              <select v-model="newDataSet.fhir_server_type" >
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
      fhir_server: false,
      newDataSet: {
        name: "",
        data_type: "fhir",
        storage_type: "fhir",
        proposal_id: 0,
        access_path: "",
        target_field: "",
        n_items: 0,
        fhir_user: "" ,
        fhir_password: "",
        fhir_server_type: ""
      },
    }
  },
  emits: ['refresh'],
  methods: {
    async addDataset(){
      let url = `${process.env.VUE_APP_STATION_API}/datasets`;
      await axios.post(url, this.newDataSet);
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