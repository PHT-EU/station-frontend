<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <button v-if="FhirStatus === false" class="button is-rounded is-danger" @click="getFhirStatus()">
          <i class="fas fa-fire-alt"></i>
        </button>
        <button v-if="FhirStatus === true" class="button is-rounded is-success" @click="getFhirStatus()">
          <i class="fas fa-fire-alt"></i>
        </button> &nbsp; Fhir Status
      </p>
      <button class="card-header-icon" aria-label="more options" @click="FhirStatusMoreInformation=!FhirStatusMoreInformation">
          <span class="icon">
            <i v-if="FhirStatusMoreInformation === false" class="fas fa-angle-down" aria-hidden="true"></i>
            <i v-if="FhirStatusMoreInformation === true" class="fas fa-angle-up" aria-hidden="true"></i>
          </span>
      </button>
    </header>
    <div  v-if="FhirStatusMoreInformation === true" class="card-content">
      <div class="content">
        <div class="block has-text-left">
          No additional information at this moment
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: "FhirStatus",
  data(){
    return{
      FhirStatus: false,
      FhirStatusMoreInformation: false,
    }
  },
  created() {
    this.getFhirStatus();
  },
  methods: {
    async getFhirStatus() {
      let url = `${process.env.VUE_APP_STATION_API}/status/fhir`;
      axios.get(url).then(response => {
        if (response.data.status ==="healthy"){
          this.FhirStatus = true
        }
      })
    },
  }
}
</script>

<style scoped>

</style>