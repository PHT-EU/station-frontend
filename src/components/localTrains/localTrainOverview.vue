<template>
    {{ selectedTrain.train_id }}
    <showLogs :selected-train="selectedTrain" />
</template>

<script>
import showLogs from '@/components/localTrains/showLogs';

export default {
    name: 'LocalTrainOverview',
    components: { showLogs },
    props: { selectedTrain: Object },
};
</script>

<style scoped>

</style>
