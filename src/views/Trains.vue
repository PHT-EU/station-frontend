<template>
  <div id="train-container" class="container is-fluid is-centered">
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
        <TrainDetails :train="selectedTrain">
        </TrainDetails>
      </div>
    </div>

  </div>
</template>

<script>

import axios from "axios";
import TrainPanel from "@/components/trains/TrainListPanel";
import TrainDetails from "@/components/trains/TrainDetails";

export default {
  name: "Trains",
  components: {TrainPanel, TrainDetails},
  data() {
    return {
      dockerTrains: [],
      federatedTrains: [],
      selectedTrain: null
    }
  },
  methods: {
    async updateTrains() {
      console.log(process.env.VUE_APP_STATION_API)

      let dockerTrainsUrl = `${process.env.VUE_APP_STATION_API}/trains/docker`;
      let federatedTrainsUrl = `${process.env.VUE_APP_STATION_API}/trains/federated`;

      axios.get(dockerTrainsUrl)
          .then(response => {
                this.dockerTrains = response.data.map(
                    (dockerTrain) => {
                      dockerTrain["type"] = "docker";
                      return dockerTrain;
                    }
                );
              }
          );
      axios.get(federatedTrainsUrl)
          .then(response => {
                this.federatedTrains = response.data.map(
                    (federatedTrain) => {
                      federatedTrain["type"] = "federated";
                      return federatedTrain;
                    }
                );
              }
          );
    },
    updateSelectedTrain(trainId) {
      let allTrains = this.dockerTrains.concat(this.federatedTrains);
      this.selectedTrain = allTrains.find(train => {
            return train.train_id === trainId
          }
      )
    }
  },
  mounted() {
    this.updateTrains();
  }
}
</script>

<style scoped>

#train-container {
  margin-top: 10px;
}

</style>
