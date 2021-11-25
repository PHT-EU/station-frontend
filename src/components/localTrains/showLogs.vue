<template>
    <div class="column">
        <div
            v-for="log in logs"
            :key="log.run_id"
            class="card"
        >
            <header class="card-header">
                <p class="card-header-title">
                    {{ log.run_id }}
                </p>
                <runStatusIndicator
                    :run-i-d="log.run_id"
                    :train-type="trainType"
                />
                <button
                    class="card-header-icon"
                    aria-label="more options"
                    @click="log.showLogs=!log.showLogs"
                >
                    <span class="icon">
                        <i
                            v-if="log.showLogs === false"
                            class="fas fa-angle-down"
                            aria-hidden="true"
                        />
                        <i
                            v-if="log.showLogs === true"
                            class="fas fa-angle-up"
                            aria-hidden="true"
                        />
                    </span>
                </button>
            </header>
            <div
                v-if="log.showLogs === true"
                class="card-content"
            >
                <div class="content">
                    <runProgressBar
                        :run-i-d="log.run_id"
                        :train-type="trainType"
                    />
                    {{ log.log }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import runProgressBar from '@/components/GeneralComponents/runProgressBar';
import runStatusIndicator from '../GeneralComponents/runStatusIndicator';

export default {
    name: 'ShowLogs',
    components: { runProgressBar, runStatusIndicator },
    props: { selectedTrain: Object },
    data() {
        return {
            logs: [],
            trainType: 'run_local',
        };
    },
    watch: {
        selectedTrain() {
            this.getLogs();
        },
    },
    mounted() {
        this.getLogs();
    },
    methods: {
        async getLogs() {
            const url = `${process.env.VUE_APP_STATION_API}/localTrains/getLogs/${this.selectedTrain.train_id}`;
            axios.get(url).then((response) => {
                this.logs = response.data;
                for (let i = 0; i < this.logs.length; i++) {
                    this.logs[i].showLogs = false;
                }
                this.logs.reverse();
            });
        },
    },
};
</script>

<style scoped>
.card{
  margin-top: 10px;
}

</style>
