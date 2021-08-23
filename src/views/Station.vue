<template>
  <div id="Station" class="container is-fluid is-centered">
    <div class="columns">
      <div class="column is-one-quarter">
        <AirflowStatus></AirflowStatus>
      </div>
      <div class="column is-one-quarter">
        <HarborStatus></HarborStatus>
      </div>
    </div>
  </div>
</template>

<script>

import AirflowStatus from '@/components/station/AirflowStatus';
import HarborStatus from '@/components/station/haborStatus'
export default {
  name: "Station",
  components: {AirflowStatus, HarborStatus},

}
</script>

<style scoped>

</style>