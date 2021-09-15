<template>
Local Train
  <upload-endpoint></upload-endpoint>
  <show-endpoint-code></show-endpoint-code>
</template>

<script>
import uploadEndpoint from "@/components/localTrains/uploadEndpoint";
import showEndpointCode from "@/components/localTrains/showEndpointCode";
export default {
  name: "LocalTrain",
  components: {uploadEndpoint, showEndpointCode}
}
</script>

<style scoped>

</style>