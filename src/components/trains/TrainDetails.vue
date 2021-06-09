<template>
  <div class="container is-fluid">
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
        <li @click="selectTab('history')" v-bind:class="{'is-active': selectedTab==='history'}">
          <a>
            History
          </a>
        </li>
      </ul>
    </div>
    <div id="tab-content">
      <OverviewTab v-if="selectedTab==='overview'"></OverviewTab>
      <ConfigurationTab v-else-if="selectedTab==='configure'"></ConfigurationTab>
      <HistoryTab v-else-if="selectedTab==='history'"></HistoryTab>
      <OverviewTab v-else></OverviewTab>
    </div>
  </div>
</template>

<script>
import OverviewTab from "@/components/trains/OverviewTab";
import ConfigurationTab from "@/components/trains/ConfigurationTab";
import HistoryTab from "@/components/trains/HistoryTab";

export default {
  name: "TrainDetails",
  components: {OverviewTab, ConfigurationTab, HistoryTab},
  props: {
    train: Object
  },
  data() {
    return {
      selectedTab: "overview"
    }
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    }
  }
}
</script>

<style scoped>

</style>
