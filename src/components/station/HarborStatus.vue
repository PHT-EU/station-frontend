<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <button v-if="HarborStatus === false" class="button is-rounded is-danger" @click="getHarborStatus()">
          <i class="fas fa-ship"></i>
        </button>
        <button v-if="HarborStatus === true" class="button is-rounded is-success" @click="getHarborStatus()">
          <i class="fas fa-ship"></i>
        </button> &nbsp; Harbor Status
      </p>
      <button class="card-header-icon" aria-label="more options" @click="HarborStatusMoreInformation=!HarborStatusMoreInformation">
          <span class="icon">
            <i v-if="HarborStatusMoreInformation === false" class="fas fa-angle-down" aria-hidden="true"></i>
            <i v-if="HarborStatusMoreInformation === true" class="fas fa-angle-up" aria-hidden="true"></i>
          </span>
      </button>
    </header>
    <div  v-if="HarborStatusMoreInformation === true" class="card-content">
      <div class="content">
        <div class="block has-text-left">
          core: <strong>{{core}}</strong> <br>
          database: <strong>{{database}}</strong><br>
          jobservice: <strong>{{jobservice}}</strong><br>
          portal: <strong>{{portal}}</strong><br>
          redis: <strong>{{redis}}</strong><br>
          registry: <strong>{{registry}}</strong><br>
          registryctl: <strong>{{registryctl}}</strong><br>
          trivy: <strong>{{trivy}}</strong><br>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: "HarborStatus",
  data(){
    return{
      HarborStatus: false,
      HarborStatusMoreInformation: false,
      core: "none",
      database: "none",
      jobservice: "none",
      portal: "none",
      redis: "none",
      registry: "none",
      registryctl: "none",
      trivy: "none",
    }
  },
  created() {
    this.getHarborStatus();
  },
  methods: {
    async getHarborStatus() {
      let url = `${process.env.VUE_APP_STATION_API}/status/Harbor`;
      axios.get(url).then(response => {
        if (response.data.status === "healthy"){
          this.HarborStatus = true;
        }
        let data = response.data.components;
        this.core = data[0].status;
        this.database = data[1].status;
        this.jobservice = data[2].status;
        this.portal = data[3].status;
        this.redis = data[4].status;
        this.registry = data[5].status;
        this.registryctl = data[6].status;
        this.trivy = data[7].status;

      });
    },
  }
}
</script>

<style scoped>

</style>