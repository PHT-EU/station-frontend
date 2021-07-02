<template>

  <FileViewer lang="python"></FileViewer>
<!--  <FileSelector></FileSelector>-->
</template>

<script>
// import FileSelector from "@/components/trains/review/FileSelector";
import FileViewer from "@/components/trains/review/FileViewer";

export default {
  name: "ReviewTab",
  props: {
    train: Object
  },
  components: {
    // FileSelector,
    FileViewer
  }
}
</script>

<style scoped>

</style>

