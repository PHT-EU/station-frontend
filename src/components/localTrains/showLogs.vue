<template>
  <div class="box">
        {{logs}}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "showLogs",
  data(){
    return {
      logs: ""
    }
  },
  watch: {
    selectedTrain: function () {
      this.getLogs()
    }
  },
  props: {selectedTrain :Object},
  methods: {
    async getLogs(){
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/getLogs/`+this.selectedTrain["train_id"];
      axios.get(url).then(response => {
            this.logs =response.data
      });
    }
  },
  mounted() {
    this.getLogs();
  }
}
</script>

<style scoped>

</style>