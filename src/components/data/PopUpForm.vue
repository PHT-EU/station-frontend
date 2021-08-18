<template>
  <div class="container">
    <button class="button is-success is-outlined"  @click="showModal = true">
      <i class="far fa-plus-square"></i>
    </button>
  <modal v-if="showModal" @close="showModal = false">
    <div class="modal-background" @click="showModal = false"></div>
    <div class="modal-content" >
      <div class="box">
        <input class="input is-primary"  v-model="newDataSet.name" type="text" placeholder="name"><br><br>
        <input class="input is-primary"  v-model="newDataSet.data_type" type="text" placeholder="storage type"><br><br>
        <input class="input is-primary"  v-model="newDataSet.storage_type" type="text" placeholder="access path"><br><br>
        <input class="input is-primary"  v-model="newDataSet.proposal_id" type="text" placeholder="proposal id"><br><br>
        <input class="input is-primary"  v-model="newDataSet.access_path" type="text" placeholder="target field"><br><br>
        <label class="checkbox">
        <input  class="checkbox is-primary" type="checkbox"   value="true" v-model="fhir_server">
          add a fhir server
        </label>
        <input class="input is-primary" v-if="fhir_server"  v-model="newDataSet.fhir_user" type="text" placeholder="fhir user"><br>
        <input class="input is-primary" v-if="fhir_server"  v-model="newDataSet.fhir_password" type="password" placeholder="fhir password"><br>
        <div class="select is-primary" v-if="fhir_server">
        <select v-model="newDataSet.fhir_server_type" v-if="fhir_server">
          <option disabled value="">Please select one fhir server type</option>
          <option>blaze</option>
          <option>hapi</option>
          <option>ibm</option>
        </select>
        </div>
        <button class="button is-success is-outlined" v-on:click="addDataset()">
          <i class="far fa-plus-square"></i>
        </button><br>

    <button class="button is-success is-outlined" @click="showModal = false">
      close
    </button>

      </div>
    </div>
  </modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PopUpForm",
  data() {
    return  {
      showModal: false,
      fhir_server: false,
      newDataSet: {
        name: "fhir_test",
        data_type: "json",
        storage_type: "fhir",
        proposal_id: 42,
        access_path: "https://fhir.personalhealthtrain.de",
        n_items: 0,
        fhir_user: "fhiruser" ,
        fhir_password: "PhT-Fhir",
        fhir_server_type: "ibm"
      },
      //["blaze", "hapi", "ibm"]
    }
  },
  methods: {
    async addDataset(){
      let url = `${process.env.VUE_APP_STATION_API}/datasets`;
      await axios.post(url, this.newDataSet);
      //await this.getDataSets();
      this.showModal = false
    }
  }
}
</script>

<style scoped>
.modal-content{
  z-index: 9999;
  position: absolute;
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