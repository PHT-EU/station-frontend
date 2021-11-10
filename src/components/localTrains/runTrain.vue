<template>
  <button class="button is-success is-outlined" @click="runTrain()">
    Run Train
  </button>
  {{currentSelectedInformation["state"]}}
  {{selectedTrain["train_id"]}}
</template>

<script>
import axios from "axios";
export default {
  name: "runTrain",
  data() {
    return {
      is_running: false,
      timer: {},
      run_ids: [] ,
      run_information_list: {},
      currentSelectedInformation: {}
    }
  },
  props: {selectedTrain :Object},
  watch: {
    selectedTrain: function (newVal) {
      this.showRunInformation(newVal)
    }
  },
  methods: {
    async runTrain(){
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/${this.selectedTrain["train_id"]}/run`;
      await axios.post(url).then(response => {
        this.run_ids.push(response.data);
      });
      await this.getRunInformation()
      this.timer = setInterval(this.getRunInformation, 3000);
      this.showRunInformation(this.selectedTrain)
      this.is_running = true;
    },
    async getRunInformation(){
      console.log(this.run_ids);
      for (let run_id_index in this.run_ids) {
        let run_id = this.run_ids[run_id_index]
        let url = `${process.env.VUE_APP_STATION_API}/localTrains/getAirflowRun/${run_id}`;
        await axios.get(url).then(response => {
          let information =  response.data;
          this.run_information_list[information["conf"]["train_id"]] =information;
          if (information.state === "success"){

            this.run_ids = this.run_ids.filter(item => item !== run_id);
            clearInterval(this.timer);
          }
          else if  (information.state === "failed"){
            this.run_ids = this.run_ids.filter(item => item !== run_id);
            clearInterval(this.timer);
          }
        });
      }
      if (!(this.run_ids.length > 0 )) {
        clearInterval(this.timer)
      }
    },
    showRunInformation(Train){
      if (Train["train_id"] in this.run_information_list){
        this.currentSelectedInformation = this.run_information_list[Train["train_id"]];
      } else{
        this.currentSelectedInformation = {};
      }
    }
  }
}
</script>

<style scoped>

</style>
