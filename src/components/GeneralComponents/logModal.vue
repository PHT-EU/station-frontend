<template>
    <div class="container ">
        <div
            v-if="showModal"
            @close="showModal = false"
        >
            <div
                class="modal-background"
                @click="showModal = false"
            />
            <div class="modal-content">
                <div class="box">
                    <h1 class="title">
                        Show Task log {{ taskID }}
                    </h1>
                    <div
                        v-for="lin in log"
                        :key="lin"
                        class="log-text"
                    >
                        <p>{{ lin }}</p>
                    </div>

                    <button
                        class="button is-danger is-outlined"
                        @click="showModal = false"
                    >
                        close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LogModal',
    props: {
        runID: String, trainType: String, taskID: String, modalVisibility: Boolean,
    },
    data() {
        return {
            log: [],
            showModal: false,
        };
    },
    watch: {
        modalVisibility() {
            this.showModal = !this.showModal;
            this.getTaskLog();
        },
    },
    methods: {
        getTaskLog() {
            console.log(this.runID);
            // {dag_id}/{run_id}/{task_id}/{task_try_number}
            const url = `${process.env.VUE_APP_STATION_API}/airflow/getAirflowTaskLog/${this.trainType}/${this.runID}/${this.taskID}/1`;
            axios.get(url).then((response) => {
                this.log = response.data.run_info.split(/\r?\n/);
            });
        },
    },
};
</script>

<style scoped>
.modal-content{
  z-index: 9999;
  position: fixed;
  margin-top: 2%;
  left: 50%;
  top: 50%;
  width: 90%;
  transform: translate(-50%, -50%);
}
.modal-background {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}
.log-text{
    text-align:  start;
}
.container{

}
</style>
