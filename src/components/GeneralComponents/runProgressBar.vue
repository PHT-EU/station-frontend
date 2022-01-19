<template>
    <div
        v-for="task in taskList"
        :key="task.task_id"
    >
        <!--      {{taskList.indexOf(task)}}-->
        <button
            v-if="task.state === 'success'"
            class="button is-success is-outlined"
            @click=" task.showModal= !task.showModal "
        >
            {{ taskList.indexOf(task) }}
        </button>
        <button
            v-if="task.state === 'failed'"
            class="button is-danger is-outlined"
            @click=" task.showModal= !task.showModal "
        >
            {{ taskList.indexOf(task) }}
        </button>
        <button
            v-if="task.state === 'upstream_failed'"
            class="button is-warning is-outlined"
            @click=" task.showModal= !task.showModal "
        >
            {{ taskList.indexOf(task) }}
        </button>
        <logModal
            :modal-visibility="task.showModal"
            :run-i-d="runID"
            :train-type="trainType"
            :task-i-d="task.task_id"
        />
    </div>
</template>

<script>
import axios from 'axios';
import logModal from './logModal';

export default {
    name: 'RunProgressBar',
    components: { logModal },
    props: { runID: String, trainType: String },
    data() {
        return {
            runInformation: [],
            taskList: [],
        };
    },
    created() {
        this.getRunInformation();
    // TODO activate for live updates
    // this.timer = setInterval(this.getRunInformation, 1000);
    },
    mounted() {
        this.getRunInformation();
    },

    methods: {

        getRunInformation() {
            console.log(this.runID);
            const url = `${process.env.VUE_APP_STATION_API}/airflow/logs/${this.trainType}/${this.runID}`;
            axios.get(url).then((response) => {
                this.runInformation = response.data;
                this.taskList = response.data.tasklist.task_instances;
                this.taskList = this.taskList.sort((a, b) => new Date(a.end_date) - new Date(b.end_date));
                for (let i = 0; i < this.taskList.length; i++) {
                    this.taskList.showModal = false;
                }
            });
        },
    },
};
</script>

<style scoped>
.button{
    float: left;
    margin-left: 5px;
}

</style>
