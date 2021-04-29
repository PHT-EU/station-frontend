<template>
  <div id="train-container" class="container is-centered">
    <div class="container is-centered my-10">
      <h1 class="title">Trains</h1>
    </div>
    <div class="columns">
      <div class="column is-one-third">
        <TrainPanel
            :dockerTrains="dockerTrains"
            @refresh="updateTrains(true)"
            :federatedTrains="federatedTrains"
        >
        </TrainPanel>
      </div>
      <div class="column">
        {{ federatedTrains }}
      </div>
    </div>

  </div>
</template>

<script>

import axios from "axios";
import TrainPanel from "@/components/TrainPanel";

export default {
  name: "Trains",
  components: {TrainPanel},
  data() {
    return {
      dockerTrains: [],
      federatedTrains: []
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
  },
  mounted() {
    this.updateTrains(true);
  }
}
</script>

<style scoped>

</style>
