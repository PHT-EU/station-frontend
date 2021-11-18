<template>
  <div class="column is-8 is-offset-1">
    <div  v-for="log in logs" :key="log.run_id" class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{log.run_id}}
        </p>
        <button class="card-header-icon" aria-label="more options" @click="log.showLogs=!log.showLogs">
          <span class="icon">
            <i v-if="log.showLogs === false" class="fas fa-angle-down" aria-hidden="true"></i>
            <i v-if="log.showLogs === true" class="fas fa-angle-up" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div v-if="log.showLogs === true" class="card-content">
        <div class="content">
          {{log.log}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "showLogs",
  data(){
    return {
      logs: []
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
            for(let i = 0; i < this.logs.length; i++){
              this.logs[i]["showLogs"]= false;
            }
      });
    }
  },
  mounted() {
    this.getLogs();
  }
}
</script>

<style scoped>
.card{
  margin-top: 10px;
}

</style>