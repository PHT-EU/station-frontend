<template>
  <div class="column is-6 is-offset-3">
    <h1>
      {{selectedTrain['train_id']}}
    </h1>
    <addMasterImage :selectedTrain="selectedTrain" ></addMasterImage>
  </div>
</template>

<script>
import addMasterImage  from "@/components/localTrains/addMasterImage";
export default {
  name: "configureLocalTrain",
  props: {selectedTrain :Object},
  components: {addMasterImage},
}
</script>

<style scoped>

</style>