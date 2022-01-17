<template>
    <button
        class="button is-success is-outlined"
        @click="runTrain()"
    >
        Run Train
    </button>
    {{ currentSelectedInformation["state"] }}
    {{ selectedTrain["train_id"] }}
</template>

<script>
import axios from 'axios';

export default {
    name: 'RunTrain',
    props: { selectedTrain: Object },
    data() {
        return {
            is_running: false,
            timer: {},
            run_ids: [],
            run_information_list: {},
            currentSelectedInformation: {},
        };
    },
    watch: {
        selectedTrain(newVal) {
            this.showRunInformation(newVal);
        },
    },
    methods: {
        async runTrain() {
            const url = `${process.env.VUE_APP_STATION_API}/airflow/run_local/run`;
            const postData = {
                train_id: this.selectedTrain.train_id,
            };
            await axios.post(url, postData).then((response) => {
                this.run_ids.push(response.data.run_id);
            });
            await this.getRunInformation();
            this.timer = setInterval(this.getRunInformation, 3000);
            this.showRunInformation(this.selectedTrain);
            this.is_running = true;
        },
        async getRunInformation() {
            // eslint-disable-next-line no-restricted-syntax
            for (const runIdIndex in this.run_ids) {
                const runId = this.run_ids[runIdIndex];
                const url = `${process.env.VUE_APP_STATION_API}/airflow/getAirflowRun/${runId}/run_local`;
                await axios.get(url).then((response) => {
                    const information = response.data;
                    this.run_information_list[information.conf.train_id] = information;
                    if (information.state === 'success') {
                        this.run_ids = this.run_ids.filter((item) => item !== runId);
                        clearInterval(this.timer);
                    } else if (information.state === 'failed') {
                        this.run_ids = this.run_ids.filter((item) => item !== runId);
                        clearInterval(this.timer);
                    }
                });
            }
            if (!(this.run_ids.length > 0)) {
                clearInterval(this.timer);
            }
        },
        showRunInformation(Train) {
            if (Train.train_id in this.run_information_list) {
                this.currentSelectedInformation = this.run_information_list[Train.train_id];
            } else {
                this.currentSelectedInformation = {};
            }
        },
    },
};
</script>

<style scoped>

</style>
