<template>
    <div
        id="indicator"
        class="content"
    >
        <button
            v-if="runStatus === 'success'"
            class="button is-success "
        >
            <i class="far fa-check-circle" />
        </button>
        <button
            v-if="runStatus === 'failed'"
            class="button is-danger "
        >
            <i class="fas fa-bug" />
        </button>
        <button
            v-if="runStatus === 'running'"
            class="button is-warning "
        >
            <i class="fas fa-running" />
        </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RunStatusIndicator',
    props: { runID: String, trainType: String },
    data() {
        return {
            runInformation: [],
            taskList: [],
            runStatus: '',
        };
    },
    mounted() {
        this.getRunInformation();
    },
    // created() {
    // this.getRunInformation();
    // TODO activate for live updates
    // this.timer = setInterval(this.getRunInformation, 1000);
    // },

    methods: {
        getRunInformation() {
            console.log(this.runID);
            const url = `${process.env.VUE_APP_STATION_API}/airflow/getAirflowRun/${this.runID}/${this.trainType}`;
            axios.get(url).then((response) => {
                this.runInformation = response.data;
                this.taskList = response.data.tasklist.task_instances;
                const states = this.taskList.map(({ state }) => state);
                if (states.every((state) => state === 'success')) {
                    this.runStatus = 'success';
                } else if (states.some((state) => state === 'failed')) {
                    this.runStatus = 'failed';
                } else {
                    this.runStatus = 'running';
                }
            });
        },
    },
};
</script>

<style scoped>
.content{
    margin-top: 20px;
}

</style>
