<template>
  <div id="train-container" class="container is-fluid is-centered">
    <div class="container is-centered my-10">
      <h1 class="title">Trains</h1>
    </div>
    <div class="columns">
      <div class="column is-one-quarter">
        <TrainPanel
            :dockerTrains="dockerTrains"
            @refresh="updateTrains(true)"
            :federatedTrains="federatedTrains"
            @trainSelected="updateSelectedTrain"
        >
        </TrainPanel>
      </div>
      <div class="column">
        {{ federatedTrains }}
        <TrainDetails :train="selectedTrain">
        </TrainDetails>
      </div>
    </div>

  </div>
</template>

<script>

import axios from "axios";
import TrainPanel from "@/components/TrainListPanel";
import TrainDetails from "@/components/TrainDetails";

export default {
  name: "Trains",
  components: {TrainPanel, TrainDetails},
  data() {
    return {
      dockerTrains: [],
      federatedTrains: [],
      selectedTrain: Object
    }
  },
  methods: {
    async updateTrains(refresh) {
      console.log(process.env.VUE_APP_STATION_API)
      let url = `${process.env.VUE_APP_STATION_API}/station/trains`;
      if (refresh) {
        url = `${process.env.VUE_APP_STATION_API}/station/trains?refresh=true`;
      }

      axios.get(url)
          .then(response => {
                this.dockerTrains = response.data["docker_trains"]
                this.federatedTrains = response.data["federated_trains"]
              }
          )
    },
    updateSelectedTrain(trainId) {
      console.log(trainId);
    }
  },
  mounted() {
    this.updateTrains(true);
  }
}
</script>

<style scoped>

</style>
