<template>
    <div class="container">
        <nav class="panel">
            <div class="panel-heading">
                <div class="columns">
                    <div class="column is-centered has-text-left">
                        Local Trains
                    </div>
                    <div class="column has-text-right">
                        <button
                            id="refreshButton"
                            class="btn button is-info is-small is-outlined"
                            onmouseleave="this.blur()"
                            @click="buttonEvent('refresh')"
                        >
                            <i class="fas fa-sync" />
                        </button>
                    </div>
                </div>
            </div>
            <a
                v-for="(train, idx) in trains"
                :key="train.trainId"
                class="panel-block"
                :class="{'selected': idx === activeIndex}"
                @click="onClickTrain(idx, train.trainId, train.trainName)"
            >
                <span>{{ train.trainName }}</span>
                <span
                    class="small-circle"
                    :class="{'green-circle': train.active, 'yellow-circle': !train.active}"
                />
                <!--        TODO add active status indicator-->
            </a>

            <div class="panel-block">
                <button
                    class="button is-link is-outlined is-fullwidth"
                    @click="buttonEvent('addTrain')"
                >
                    Add New Train
                </button>
                <button
                    class="button is-link is-outlined is-fullwidth"
                    @click="removeTrain()"
                >
                    Remove Selected train
                </button>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LocalTrainPanel',
    props: {
        localTrains: Array,
    },
    emits: ['refresh', 'trainSelected', 'addTrain'],
    data() {
        return {
            activeIndex: null,
            activeTrain: null,
            activeName: null,
        };
    },
    computed: {
        trains() {
            const trains = [];
            if (this.localTrains.length >= 1) {
                for (let i = 0; i < this.localTrains.length; i++) {
                    trains.push({
                        trainId: this.localTrains[i].train_id,
                        trainName: this.localTrains[i].train_name,
                    });
                }
            }
            return trains;
        },
    },
    methods: {
        buttonEvent(event) {
            this.$emit(event);
        },
        onClickTrain(idx, trainId, trainName) {
            if (this.activeIndex === idx) {
                this.activeIndex = null;
                this.activeTrain = null;
                this.activeName = null;
            } else {
                this.activeIndex = idx;
                this.activeTrain = trainId;
                this.activeName = trainName;
                this.$emit('trainSelected', trainId);
            }
        },
        async removeTrain() {
            if (this.activeIndex != null) {
                const url = `${process.env.VUE_APP_STATION_API}/localTrains/deleteTrain/${this.activeTrain}`;

                await axios.delete(url).then((response) => {
                    console.log(response.data);
                });
                this.$emit('refresh');
                this.activeIndex = null;
                this.activeTrain = null;
                this.activeName = null;
            } else {
                console.log('no train selected');
            }
        },
    },
};
</script>

<style scoped>
.selected {
  border-color: hsl(204, 86%, 53%);
  border-style: solid;
  border-width: 1px;
}
</style>
