<template>
  <div class="container">
    <h2 class="is-centered title">
      Train: {{ train ? train['train_id'] : 'test' }}
    </h2>
    <div class="tabs is-centered is-medium">
      <ul>
        <li @click="selectTab('overview')" v-bind:class="{'is-active': selectedTab==='overview'}">
          <a>
            Overview
          </a>
        </li>
        <li @click="selectTab('configure')" v-bind:class="{'is-active': selectedTab==='configure'}">
          <a>
            Configure
          </a>
        </li>
        <li @click="selectTab('review')" v-bind:class="{'is-active': selectedTab==='review'}">
          <a>
            Review
          </a>
        </li>
        <li @click="selectTab('history')" v-bind:class="{'is-active': selectedTab==='history'}">
          <a>
            History
          </a>
        </li>
      </ul>
    </div>
    <div id="tab-content">
      <OverviewTab v-if="selectedTab==='overview'" :train="train"></OverviewTab>
      <ConfigurationTab v-else-if="selectedTab==='configure'" :train="train"></ConfigurationTab>
      <HistoryTab v-else-if="selectedTab==='history'" :train="train"></HistoryTab>
      <ReviewTab v-else-if="selectedTab==='review'"></ReviewTab>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OverviewTab from "@/components/trains/OverviewTab";
import ConfigurationTab from "@/components/trains/ConfigurationTab";
import HistoryTab from "@/components/trains/HistoryTab";
import ReviewTab from "@/components/trains/ReviewTab";


export default {
  name: "TrainDetails",
  components: {OverviewTab, ConfigurationTab, HistoryTab, ReviewTab},
  props: {
    train: Object
  },
  data() {
    return {
      selectedTab: "overview",
      trainState: Object,
      trainConfig: Object,
      configs: Array
    }
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    async getTrainState() {
      let url = null;
      if (this.train.type === "docker") {
        url = `${process.env.VUE_APP_STATION_API}/trains/docker/${this.train.trainId}/state`;
      } else {
        url = `${process.env.VUE_APP_STATION_API}/trains/federated/${this.train.trainId}/state`;
      }
      axios.get(url)
          .then(response => {
                this.trainState = response.data;
              }
          )
    },
    async getTrainConfig() {
      let url = null;
      if (this.train.type === "docker") {
        url = `${process.env.VUE_APP_STATION_API}/trains/docker/${this.train.trainId}/config`;
      } else {
        url = `${process.env.VUE_APP_STATION_API}/trains/federated/${this.train.trainId}/config`;
      }
      axios.get(url)
          .then(response => {
                this.trainConfig = response.data;
              }
          )
    },

    async getConfigs() {
      let url = null;
      console.log(this.train)
      await this.train;
      if (this.train.type === "docker") {
        url = `${process.env.VUE_APP_STATION_API}/trains/docker/configs/`;
      } else {
        url = `${process.env.VUE_APP_STATION_API}/trains/federated/configs/`
      }

      axios.get(url)
          .then(response => {
                this.configs = response.data;
                console.log(this.configs)
              }
          )

    }

  },
  mounted() {
    this.getTrainState();
    this.getTrainConfig();
    this.getConfigs();
  },
  created() {
    this.getTrainState();
    this.getTrainConfig();
    this.getConfigs();
  }
}
</script>

<style scoped>

</style>
