<template>
  <div class="column is-6 is-offset-3">
    <h1>
      {{selectedTrain['train_id']}}
    </h1>
  </div>
</template>

<script>
export default {
  name: "configureLocalTrain",
  props: {selectedTrain :Object}
}
</script>

<style scoped>

</style>