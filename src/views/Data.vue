<template>

  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-one-quarter">
        Dataset List
      </div>
      <div class="column">
        Details
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Data",
  data() {
    return  {
      dataSets: []
    }
  },
  methods:  {
    async getDataSets() {
      let url = `${process.env.VUE_APP_STATION_API}/datasets`;
      axios.get(url).then(response => {
        this.dataSets = response.data;
      })
    }

  },
  mounted() {
    this.getDataSets();
  }
}
</script>

<style scoped>

</style>
