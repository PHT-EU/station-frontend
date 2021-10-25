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
      <a v-for="(train, idx) in trains" v-bind:key="train.trainId" class="panel-block"
         :class="{'selected': idx === activeIndex}"
         @click="onClickTrain(idx, train.trainId)">
        <span>{{ train.trainName }}</span>
        <span class="small-circle" v-bind:class="{'green-circle': train.active, 'yellow-circle': !train.active}"></span>
        <!--        TODO add active status indicator-->
      </a>

      <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth" v-on:click="buttonEvent('reset')">
          Add New Train
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return{
      activeIndex: null
    }
  },
  name: "localTrainPanel",
  props: {
    localTrains: Array,
  },
  emits: ['refresh', 'trainSelected', 'addTrain'],
  methods: {
    buttonEvent(event) {
      this.$emit(event);
    },
    onClickTrain(idx, trainId) {
      console.log(this.activeIndex)
      if (this.activeIndex === idx){
        this.activeIndex = null;
      }
      else {
        this.activeIndex = idx;
        this.$emit("trainSelected", trainId);
      }

    },
  },
  computed: {
    trains() {
      let trains = [];
      if (this.localTrains.length >= 1) {
        for (let i = 0; i < this.localTrains.length; i++) {
          trains.push({
                trainId: this.localTrains[i].train_id,
                trainName: this.localTrains[i].train_name,
              }
          )
        }
      }
      return trains
    }
  },
}
</script>

<style scoped>
.selected {
  border-color: hsl(204, 86%, 53%);
  border-style: solid;
  border-width: 1px;
}
</style>