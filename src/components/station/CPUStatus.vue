<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <span class="icon has-text-success">  <i class="fas fa-2x fa-microchip"></i> </span>
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
        <div v-for="CPU in CPUUsage" v-bind:key="CPU.id">
          <div class="box">
            logical core {{CPU.id}}: {{CPU.usage}}% <progress class="progress is-success" :value="CPU.usage" max="100"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
//import "vue3-circle-progress/dist/circle-progress.css";
//import CircleProgress from "vue3-circle-progress"
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
    this.timer = setInterval(this.getCPUStatus, 30000);
  },
  //components: {CircleProgress},
  methods: {
    async getCPUStatus() {
      let url = `${process.env.VUE_APP_STATION_API}/status/total_cpu_util`;

      axios.get(url).then(response => {
        let data = response.data
        this.CPUUsageMean= Math.round(data.reduce(function(pv, cv) { return pv + cv; }, 0)/data.length);
        this.CPUUsage = []
        for (let cpu in data){
          let cpuDict = {}
          cpuDict.id = cpu
          cpuDict.usage = Math.round(data[cpu])
          this.CPUUsage.push(cpuDict)
        }
      })
    },
  }
}
</script>

<style scoped>
.box{
  align-items: center;
}
</style>