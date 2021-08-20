<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <span v-if="AirflowStatus === false" class="tag is-rounded is-danger">
          <i class="far fa-stop-circle"></i>
        </span>
        <span v-if="AirflowStatus === true" class="tag is-rounded is-success">
          <i class="fas fa-wind"></i>
        </span> &nbsp; Airflow Status
      </p>
      <button class="card-header-icon" aria-label="more options" @click="getAirflowStatus">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
      </button>
    </header>
    <div class="card-content">
      <div class="content">
        <i v-if="AirflowStatus === false" class="far fa-stop-circle"></i>
        <i v-if="AirflowStatus === true" class="fas fa-train"></i>
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
    }
  },
  methods: {
    async getAirflowStatus() {
      let url = `${process.env.VUE_APP_STATION_API}/status/Airflow`;
      axios.get(url).then(response => {
        console.log(response);

      })
    }
  }
}
</script>

<style scoped>

</style>