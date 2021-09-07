<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <button v-if="AirflowStatus === false" class="button is-rounded is-danger" @click="getAirflowStatus()">
          <i class="fas fa-wind"></i>
        </button>
        <button v-if="AirflowStatus === true" class="button is-rounded is-success" @click="getAirflowStatus()">
          <i class="fas fa-wind"></i>
        </button> &nbsp; Airflow Status
      </p>
      <button class="card-header-icon" aria-label="more options" @click="AirflowStatusMoreInformation=!AirflowStatusMoreInformation">
          <span class="icon">
            <i v-if="AirflowStatusMoreInformation === false" class="fas fa-angle-down" aria-hidden="true"></i>
            <i v-if="AirflowStatusMoreInformation === true" class="fas fa-angle-up" aria-hidden="true"></i>
          </span>
      </button>
    </header>
    <div  v-if="AirflowStatusMoreInformation === true" class="card-content">
      <div class="content">
        <div class="block has-text-left">
          metadatabase: <strong>{{metaDatabaseStatus}}</strong> <br>
          scheduler: <strong>{{schedulerStatus}}</strong><br>
          updated: {{lastUpdateTime}}<br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AirflowStatus",
  data(){
    return{
      AirflowStatus: false,
      AirflowStatusMoreInformation: false,
      test: "test",
      lastUpdateTime: "none",
      metaDatabaseStatus: "none",
      schedulerStatus: "none"
    }
  },
  created() {
    this.getAirflowStatus();
  },
  methods: {
    async getAirflowStatus() {
      let url = `${process.env.VUE_APP_STATION_API}/status/Airflow`;
      axios.get(url).then(response => {
        if (response.data["metadatabase"]["status"]==="healthy" && response.data["scheduler"]["status"]==="healthy"){
          this.AirflowStatus = true;
        }
        this.lastUpdateTime =response.data["scheduler"]["latest_scheduler_heartbeat"];
        this.metaDatabaseStatus =  response.data["metadatabase"]["status"];
        this.schedulerStatus = response.data["scheduler"]["status"];
        this.data = response.data ;
      })
    },
  }
}
</script>

<style scoped>

</style>