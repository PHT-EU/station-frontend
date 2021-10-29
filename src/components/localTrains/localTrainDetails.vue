<template>
  <h2 class="is-centered title">
    Train: {{ selectedTrain ? selectedTrain['train_name'] : 'Not selected' }}
  </h2>
  <div class="tabs is-centered is-medium">
    <ul>
      <li @click="selectTab('Overview')" v-bind:class="{'is-active': selectedTab==='Overview'}">
        <a>
          Overview &nbsp;  <i class="fas fa-fire-alt"></i>
        </a>
      </li>
      <li @click="selectTab('Configure')" v-bind:class="{'is-active': selectedTab==='Configure'}">
        <a>
          Configure &nbsp;  <i class="fas fa-table"></i>
        </a>
      </li>
      <li @click="selectTab('History')" v-bind:class="{'is-active': selectedTab==='History'}">
        <a>
          History &nbsp;<i class="fas fa-history"></i>
        </a>
      </li>
      <li @click="selectTab('Files')" v-bind:class="{'is-active': selectedTab==='Files'}">
        <a>
          Files &nbsp; <i class="fas fa-database"></i>
        </a>
      </li>
    </ul>
  </div>
  <div id="tab-content">
    <configureLocalTrain v-if="selectedTab==='Configure'"  :selectedTrain="selectedTrain" ></configureLocalTrain>
    <showUploadedFiles v-if="selectedTab==='Files'" @refresh="refresh()" :key="selectedTrain" :selectedTrain="selectedTrain" ></showUploadedFiles>
  </div>
</template>

<script>

import configureLocalTrain from "@/components/localTrains/configureLocalTrain";
import showUploadedFiles from "@/components/localTrains/showUploadedFiles";

export default {
  name: "localTrainDetails",
  data() {
    return {
      fileName: "",
      selectedTrain: Object,
      localTrainsList: [],
      selectedTab: "",
    }
  },
  emits:['refresh'],
  components: {configureLocalTrain ,showUploadedFiles},
    props: {trainID: String ,
    localTrains: Array },
  watch: {
    trainID: function (newVal) {
      this.getTrain(newVal);
    },
    localTrains: function (newVal) {
      this.localTrainsList = newVal;
    }
  },
  methods: {
    refresh() {
      this.$emit('refresh');
    },
    getTrain(trainID){
      for (let i = 0; i < this.localTrainsList.length; i++){
        if(trainID == this.localTrainsList[i]['train_id']){
          this.selectedTrain = this.localTrainsList[i];
        }
      }
    },
    selectTab(tap){
      this.selectedTab = tap;
      console.log(this.selectedTab)
    }
  }
}
</script>

<style scoped>

</style>
