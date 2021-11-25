<template>
    <FileViewer lang="python" />
<!--  <FileSelector></FileSelector>-->
</template>

<script>
// import FileSelector from "@/components/trains/review/FileSelector";
import FileViewer from '@/components/trains/review/FileViewer';

export default {
    name: 'ReviewTab',
    components: {
    // FileSelector,
        FileViewer,
    },
    props: {
        train: Object,
    },
};
</script>

<style scoped>

</style>
