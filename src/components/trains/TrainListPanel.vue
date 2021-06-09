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
        <a v-bind:class="{'is-active': noFilter}" v-on:click="panelFilterClick('reset')">All</a>
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
      <a v-for="(train, idx) in trains" v-bind:key="train.trainId" class="panel-block"
           :class="{'selected': idx === activeIndex}"
           @click="onClickTrain(idx, train.trainId)">

        <span v-if="train.type === 'docker'" class="panel-icon docker-icon"></span>
        <span v-else class="icon">
            <i class="fas fa-project-diagram"></i>
        </span>
        <span>{{ train.trainId }}</span>
        <span class="small-circle" v-bind:class="{'green-circle': train.active, 'yellow-circle': !train.active}"></span>
        <!--        TODO add active status indicator-->
      </a>

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
  emits: ['refresh', 'trainSelected'],
  computed: {
    trains() {
      // TODO sort by most recent
      // TODO implement search
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
      if (this.federatedTrains.length >= 1) {
        for (let i = 0; i < this.federatedTrains.length; i++) {
          trains.push({
                trainId: this.federatedTrains[i].train_id,
                type: "federated",
                active: this.federatedTrains[i].is_active
              }
          )
        }

      }
      if (this.filterActive) {
        trains = trains.filter((el) => el.active);
        if (this.filterDocker) {
          return trains.filter((el) => el.type === "docker")
        }
        if (this.filterFederated) {
          return trains.filter((el) => el.type === "federated")
        }
      } else {
        if (this.filterDocker) {
          return trains.filter((el) => el.type === "docker")
        }
        if (this.filterFederated) {
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
      noFilter: true,
      activeIndex: null
    }
  },
  methods: {
    buttonEvent(event) {
      this.$emit(event);
    },

    onClickTrain(idx, trainId) {

      if (this.activeIndex === idx){
        this.activeIndex = null;
      }
      else {
        this.activeIndex = idx;
        this.$emit("trainSelected", trainId);
      }

    },

    panelFilterClick(filter) {
      // TODO improve this
      if (filter === "active") {
        this.filterActive = !this.filterActive;
        this.noFilter = false;
      }
      if (filter === "docker") {
        this.filterDocker = !this.filterDocker;
        this.filterFederated = false;
        this.noFilter = false;
      }
      if (filter === "federated") {
        this.filterFederated = !this.filterFederated;
        this.filterDocker = false
        this.noFilter = false;
      }
      if (filter === "reset") {
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

.selected {
  border-color: hsl(204, 86%, 53%);
  border-style: solid;
  border-width: 1px;
}

.small-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 8px;
}

.red-circle {
  background: red;
}
.yellow-circle {
  background: yellow;
}
.green-circle {
  background: green;
}





</style>
