<template>
  <div class="container is-fluid">
    <h2 class="is-centered">
      Train: {{ train.trainId }}
    </h2>
    <div>
      {{train}}
    </div>
  </div>
</template>

<script>
export default {
  name: "TrainDetails",
  props: {
    train: Object
  }

}
</script>

<style scoped>

</style>
