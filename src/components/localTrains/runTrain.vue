<template>
  <button class="button is-success is-outlined" @click="runTrain()">
    Run Train
  </button>
  {{run_information}}
</template>

<script>
import axios from "axios";
export default {
  name: "runTrain",
  data() {
    return {
      is_running: false,
      timer: {},
      run_id: "",
      run_information: {}
    }
  },
  props: {selectedTrain :Object},
  methods: {
    async runTrain(){
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/${this.selectedTrain["train_id"]}/run`;
      await axios.post(url).then(response => {
        this.run_id =response.data;
        console.log(this.run_id);

      });
      this.timer = setInterval(this.getRunInformation, 3000);
      this.is_running = true;
    },
    async getRunInformation(){
      console.log("check train")
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/getAirflowRun/${this.run_id}`;
      await axios.get(url).then(response => {
        this.run_information = response.data;
        console.log(this.run_information);
      });
      if (this.run_information.state === "success"){
        clearInterval(this.timer)
        console.log("stop run information ")
      }
    }
  }
}
</script>

<style scoped>

</style>
