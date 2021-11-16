<template>
  {{selectedTrain.train_id}}
  <showLogs :selectedTrain="selectedTrain"></showLogs>
</template>

<script>
import showLogs from "@/components/localTrains/showLogs";
export default {
  name: "localTrainOverview",
  components: {showLogs},
  props: {selectedTrain :Object},
}
</script>

<style scoped>

</style>