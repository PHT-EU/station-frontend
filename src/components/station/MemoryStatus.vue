<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <span class="icon has-text-success">  <i class="fas fa-2x fa-memory "></i> </span>
        &nbsp;&nbsp;<progress class="progress is-success" :value="MemoryUsagePercent" max="100">{{ MemoryUsagePercent}}%</progress>
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
        <div class="block has-text-left">
          Total:  <strong>{{TotalMemory}}</strong> GB<br>
          Free:  <strong>{{FreeMemory}}</strong> GB<br>
          Used: <strong>{{UsedMemory}}</strong> GB<br>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: "MemoryStatus",
  data(){
    return{
      MoreInformation: false,
      MemoryUsagePercent: NaN,
      TotalMemory: NaN,
      UsedMemory: NaN,
      FreeMemory: NaN,
    }
  },
  created() {
    this.getMemoryStatus();
    this.timer = setInterval(this.getMemoryStatus, 30000);
  },
  methods: {
    convertToGB(memoryInByte){
      return (memoryInByte/Math.pow(10,9)).toPrecision(3)
    },
    async getMemoryStatus() {
      let url = `${process.env.VUE_APP_STATION_API}/status/total_memory_util`;
      axios.get(url).then(response => {
        this.MemoryUsagePercent = response.data["percent"];
        this.TotalMemory = this.convertToGB(response.data["total"]);
        this.UsedMemory = this.convertToGB(response.data["used"]);
        this.FreeMemory = (this.TotalMemory -this.UsedMemory).toPrecision(3);
      })
    },
  },
}
</script>

<style scoped>

</style>