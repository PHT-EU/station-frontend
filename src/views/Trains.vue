<template>
    <div
        id="train-container"
        className="container is-fluid is-centered"
    >
        <div className="columns">
            <div className="column is-one-quarter">
                <TrainPanel
                    :docker-trains="dockerTrains"
                    :federated-trains="federatedTrains"
                    @refresh="updateTrains(true)"
                    @trainSelected="updateSelectedTrain"
                />
            </div>
            <div className="column">
                <TrainDetails :train="selectedTrain" />
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import TrainPanel from '@/components/trains/TrainListPanel';
import TrainDetails from '@/components/trains/TrainDetails';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Trains',
    components: { TrainPanel, TrainDetails },
    data() {
        return {
            dockerTrains: [],
            federatedTrains: [],
            selectedTrain: null,
        };
    },
    mounted() {
        this.updateTrains();
    },
    methods: {
        async updateTrains() {
            const dockerTrainsUrl = `${process.env.VUE_APP_STATION_API}/trains/docker`;
            const federatedTrainsUrl = `${process.env.VUE_APP_STATION_API}/trains/federated`;

            axios.get(dockerTrainsUrl)
                .then((response) => {
                    this.dockerTrains = response.data.map(
                        (dockerTrain) => {
                            dockerTrain.type = 'docker';
                            return dockerTrain;
                        },
                    );
                });
            axios.get(federatedTrainsUrl)
                .then((response) => {
                    this.federatedTrains = response.data.map(
                        (federatedTrain) => {
                            federatedTrain.type = 'federated';
                            return federatedTrain;
                        },
                    );
                });
        },
        updateSelectedTrain(trainId) {
            const allTrains = this.dockerTrains.concat(this.federatedTrains);
            this.selectedTrain = allTrains.find((train) => train.train_id === trainId);
        },
    },
};
</script>

<style scoped>

#train-container {
    margin-top: 10px;
}

</style>
