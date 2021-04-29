<template>
  <div class="container">
    <nav class="panel">
      <div class="panel-heading">
        <div class="columns">
          <div class="column is-centered has-text-left">
            Trains
          </div>
          <div class="column has-text-right">
            <button
                id="refreshButton"
                class="btn button is-info is-small is-outlined"
                @click="buttonEvent('refresh')"
            >
              <i class="fas fa-sync"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Search">
          <span class="icon is-left">
            <i class="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <p class="panel-tabs">
        <a class="is-active">All</a>
        <a>Active</a>
        <a>Docker</a>
        <a>Federated</a>
      </p>
      <div v-for="train in trains" v-bind:key="train.train_id" class="panel-block">

        <span v-if="train.type === 'docker'" class="panel-icon docker-icon"></span>
        <span v-else class="icon">
            <i class="fas fa-project-diagram"></i>
        </span>
        {{ train.trainId }}

      </div>

      <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth">
          Reset all filters
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "TrainPanel",
  props: {
    dockerTrains: Array,
    federatedTrains: Array
  },

  computed: {
    trains() {
      let trains = [];
      if (this.dockerTrains.length >= 1) {
        for (let i = 0; i < this.dockerTrains.length; i++) {
          console.log(this.dockerTrains[i])
          trains.push({
                trainId: this.dockerTrains[i].train_id,
                type: "docker",
                active: this.dockerTrains[i].is_active
              }
          )
        }

      }
      if (this.federatedTrains.length >= 1){
        for (let i = 0; i < this.federatedTrains.length; i++) {
          console.log(this.federatedTrains[i])
          trains.push({
                trainId: this.federatedTrains[i].train_id,
                type: "federated",
                active: this.federatedTrains[i].is_active
              }
          )
        }

      }
      return trains

    }
  },
  data() {
    return {
      filterActive: false,
      filterDocker: false,
      filterFederated: false,
    }
  },
  methods: {
    buttonEvent(event) {
      this.$emit(event);

    }
  }
}
</script>

<style scoped>

.docker-icon {
  background: url("~@/assets/docker-logo.svg");
  height: 20px;
  width: 20px;
  display: block;
}

</style>
