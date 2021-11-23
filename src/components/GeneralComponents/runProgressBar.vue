<template>
  <div v-for="task in taskList" :key="task.task_id">
    <button v-if="task.state === 'success'" class="button is-success is-outlined">{{taskList.indexOf(task)}}</button>
    <button v-if="task.state === 'failed'" class="button is-danger is-outlined">{{taskList.indexOf(task)}}</button>
    <button v-if="task.state === 'upstream_failed'" class="button is-warning is-outlined">{{taskList.indexOf(task)}}</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "runProgressBar",
  data(){
    return {
      run_information: [],
      taskList : [],
    }
  },
  props:  {  runID: String, trainType: String},
  created() {
    this.getRunInformation();
    // TODO activate for live updates
    //this.timer = setInterval(this.getRunInformation, 1000);
  },

  methods: {
    getRunInformation(){
      console.log(this.runID)
      // TODO  replace localTrain with the location of teh general getAirfloRun
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/getAirflowRun/${this.runID}/${this.trainType}`;
      axios.get(url).then(response => {
        this.run_information = response.data ;
        this.taskList=response.data.tasklist.task_instances ;
        this.taskList=this.taskList.sort(function(a, b) {
          return new Date(a.end_date) - new Date(b.end_date);
        });
      });
    }
  },
  mounted() {
    this.getRunInformation();
  },
}
</script>

<style scoped>

</style>