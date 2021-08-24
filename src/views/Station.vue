<template>
  <div id="Station" class="container is-fluid is-centered">
    <div class="columns pt-4">
      <div class="column is-one-quarter">
        <AirflowStatus></AirflowStatus>
      </div>
      <div class="column is-one-quarter">
        <MinIOStatus></MinIOStatus>
      </div>
      <div class="column is-one-quarter">
        <FhirStatus></FhirStatus>
      </div>
    </div>
    <div class="columns pt-4">
      <div class="column is-one-quarter">
        <HarborStatus></HarborStatus>
      </div>

    </div>
  </div>
</template>

<script>
import FhirStatus from '@/components/station/FhirStatus'
import AirflowStatus from '@/components/station/AirflowStatus';
import HarborStatus from '@/components/station/HarborStatus'
import MinIOStatus from "@/components/station/MinIOStatus";
export default {
  name: "Station",
  components: {AirflowStatus, HarborStatus, MinIOStatus, FhirStatus},

}
</script>

<style scoped>

</style>