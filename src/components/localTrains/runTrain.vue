<template>
  <button class="button is-success is-outlined" @click="runTrain()">
    close
  </button>
</template>

<script>
export default {
  name: "runTrain",
  methods: {
    runTrain(){
      console.log("runTrain")
    }
  }
}
</script>

<style scoped>

</style>