<template>
  <div id="Station" class="container is-fluid is-centered">
    <div class="columns">
      <div class="column is-one-quarter">
       <AirflowStatus></AirflowStatus>
      </div>
    </div>
  </div>
</template>

<script>

import AirflowStatus from '@/components/Station/AirflowStatus';
export default {
  name: "Station",
  components: {AirflowStatus},

}
</script>

<style scoped>

</style>