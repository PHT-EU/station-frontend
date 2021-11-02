<template>
  <button class="button is-success is-outlined" @click="runTrain()">
    Run Train
  </button>
</template>

<script>
import axios from "axios";
export default {
  name: "runTrain",
  props: {selectedTrain :Object},
  methods: {
    async runTrain(){
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/${this.selectedTrain["train_id"]}/run`;
      await axios.post(url).then(response => {console.log(response)});
    }
  }
}
</script>

<style scoped>

</style>