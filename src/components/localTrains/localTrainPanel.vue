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
  name: "localTrainPanel",
  props: {
    localTrains: Array,
  },
  emits: ['refresh', 'trainSelected'],
  methods: {
    buttonEvent(event) {
      this.$emit(event);
    },
  }

}
</script>

<style scoped>

</style>