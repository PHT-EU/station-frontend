<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <span class="icon has-text-danger">  <i class="fas fa-2x fa-microchip"></i> </span>
        &nbsp;&nbsp;<progress class="progress is-success" :value="CPUUsageMean" max="100">{{ CPUUsageMean}}%</progress>
      </p>
      <button class="card-header-icon" aria-label="more options" @click="MoreInformation=!MoreInformation">
          <span class="icon">
            <i v-if="MoreInformation === false" class="fas fa-angle-down" aria-hidden="true"></i>
            <i v-if="MoreInformation === true" class="fas fa-angle-up" aria-hidden="true"></i>
          </span>
      </button>
    </header>
    <div  v-if="MoreInformation === true" class="card-content">
      <div class="content">
        <div v-for="CPU in CPUUsage" v-bind:key="CPU">
       <progress class="progress is-success" :value="CPU" max="100">{{CPU}}%</progress> <br>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: "CPUStatus",
  data(){
    return{
      MoreInformation: false,
      CPUUsage: [],
      CPUUsageMean: NaN,
    }
  },
  created() {
    this.getCPUStatus();
  },
  methods: {
    async getCPUStatus() {
      let url = `${process.env.VUE_APP_STATION_API}/status/total_cpu_util`;

      axios.get(url).then(response => {
        this.CPUUsage = response.data
        this.CPUUsageMean= this.CPUUsage.reduce(function(pv, cv) { return pv + cv; }, 0)/this.CPUUsage.length;
        this.CPUUsage = response.data
        console.log(this.CPUUsage )
      })
    },
  }
}
</script>

<style scoped>

</style>