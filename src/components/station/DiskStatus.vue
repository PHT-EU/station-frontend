<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <span class="icon has-text-success">  <i class="fas fa-2x fa-hdd "></i> </span>
        &nbsp;&nbsp;<progress class="progress is-success" :value="DiskUsage" max="100">{{ DiskUsage}}%</progress>
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
          Total:  <strong>{{Total}}</strong> GB<br>
          Free: <strong>{{Free}}</strong> GB<br>
          Used: <strong>{{Used}}</strong> GB<br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "DiskStatus",
  data(){
    return{
      MoreInformation: false,
      DiskUsage: NaN,
      Free: NaN,
      Used: NaN,
      Total: NaN,
    }
  },
  created() {
    this.getDiskStatus();
    this.timer = setInterval(this.getDiskStatus, 30000);
  },
  methods: {
    async getDiskStatus() {
      let url = `${process.env.VUE_APP_STATION_API}/status/total_disk_util`;
      axios.get(url).then(response => {
        this.DiskUsage = response.data["percent"];
        this.Free = Math.round(response.data["free"]/Math.pow(10,9));
        this.Used = Math.round(response.data["used"]/Math.pow(10,9));
        this.Total = this.Free+ this.Used;
      })
    },
  }
}
</script>

<style scoped>

</style>