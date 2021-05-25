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
                onmouseleave="this.blur()"
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
        <a v-bind:class="{'is-active': noFilter}">All</a>
        <a
            v-on:click="panelFilterClick('active')"
            v-bind:class="{'is-active': filterActive}">
          Active
        </a>
        <a
            v-on:click="panelFilterClick('docker')"
            v-bind:class="{'is-active': filterDocker}">
          Docker
        </a>
        <a
            v-on:click="panelFilterClick('federated')"
            v-bind:class="{'is-active': filterFederated}">
          Federated
        </a>
      </p>
      <div v-for="train in trains" v-bind:key="train.train_id" class="panel-block">

        <span v-if="train.type === 'docker'" class="panel-icon docker-icon"></span>
        <span v-else class="icon">
            <i class="fas fa-project-diagram"></i>
        </span>
        {{ train.trainId }}

      </div>

      <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth" v-on:click="panelFilterClick('reset')">
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
          trains.push({
                trainId: this.federatedTrains[i].train_id,
                type: "federated",
                active: this.federatedTrains[i].is_active
              }
          )
        }

      }
      if (this.filterActive){
        trains = trains.filter((el) => el.active);
        if (this.filterDocker){
          return trains.filter((el) => el.type === "docker")
        }
        if (this.filterFederated){
          return trains.filter((el) => el.type === "federated")
        }
      }
      else {
        if (this.filterDocker){
          return trains.filter((el) => el.type === "docker")
        }
        if (this.filterFederated){
          return trains.filter((el) => el.type === "federated")
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
      noFilter: true
    }
  },
  methods: {
    buttonEvent(event) {
      this.$emit(event);

    },
    panelFilterClick(filter) {
      if (filter === "active"){
        this.filterActive = !this.filterActive;
        this.noFilter = false;
      }
      if (filter === "docker"){
        this.filterDocker = !this.filterDocker;
        this.filterFederated = false;
        this.noFilter = false;
      }
      if (filter === "federated"){
        this.filterFederated = !this.filterFederated;
        this.filterDocker = false
        this.noFilter = false;
      }
      if (filter === "reset"){
        this.filterActive = false;
        this.filterDocker = false;
        this.filterFederated = false;
        this.noFilter = true;
      }
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
