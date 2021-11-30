<template>
    <div
        class="container"
        style="max-width: 700px"
    >
        <!--    <h1>
      {{selectedTrainLocal['train_id']}}
    </h1>-->
        <br>
        <addMasterImage
            :selected-train="selectedTrain"
            @refresh="refreshTrain()"
        />
    </div>
</template>

<script>
import addMasterImage from '@/components/localTrains/addMasterImage';

export default {
    name: 'ConfigureLocalTrain',
    components: { addMasterImage },
    props: { selectedTrain: Object },
    emits: ['refresh'],
    methods: {
        refreshTrain() {
            this.$emit('refresh');
        },
    },
};
</script>

<style scoped>

</style>
