<template>
  <div class="container" style="max-width: 700px">
<!--    <h1>
      {{selectedTrainLocal['train_id']}}
    </h1>-->
    <br>
    <addMasterImage :selectedTrain="selectedTrain" @refresh="refreshTrain()" ></addMasterImage>
  </div>
</template>

<script>
import addMasterImage  from "@/components/localTrains/addMasterImage";
export default {
  name: "configureLocalTrain",
  props: {selectedTrain :Object},
  components: {addMasterImage},
  emits: ['refresh'],
  methods: {
    refreshTrain(){
      this.$emit('refresh');
    }
  }
}
</script>

<style scoped>

</style>