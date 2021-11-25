<template>
    {{ selectedTrain["train_id"] }}
</template>

<script>
export default {
    name: 'LocalTrainOverview',
    props: { selectedTrain: Object },
};
</script>

<style scoped>

</style>
