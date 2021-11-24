<template>
  <div  class="level">
    <div v-for="task in taskList" :key="task.task_id">
<!--      {{taskList.indexOf(task)}}-->
      <button v-if="task.state === 'success'" v-on:click=" task.showModal= !task.showModal " class="button is-success is-outlined">{{task.task_id}}</button>
      <button v-if="task.state === 'failed'" v-on:click=" task.showModal= !task.showModal " class="button is-danger is-outlined">{{task.task_id}}</button>
      <button v-if="task.state === 'upstream_failed'" v-on:click=" task.showModal= !task.showModal " class="button is-warning is-outlined">{{task.task_id}}</button>
      <logModal :modal-visibility="task.showModal"
                :runID="runID"
                :trainType="trainType"
                :taskID="task.task_id">
      </logModal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import logModal from "./logModal";
export default {
  name: "runProgressBar",
  data(){
    return {
      runInformation: [],
      taskList : [],
    }
  },
  props:  {  runID: String, trainType: String},
  components: {logModal},
  created() {
    this.getRunInformation();
    // TODO activate for live updates
    //this.timer = setInterval(this.getRunInformation, 1000);
  },

  methods: {

    getRunInformation(){
      console.log(this.runID)
      let url = `${process.env.VUE_APP_STATION_API}/airflow/getAirflowRun/${this.runID}/${this.trainType}`;
      axios.get(url).then(response => {
        this.runInformation = response.data ;
        this.taskList=response.data.tasklist.task_instances ;
        this.taskList=this.taskList.sort(function(a, b) {
          return new Date(a.end_date) - new Date(b.end_date);
        });
        for (let i = 0; i < this.taskList.length; i++){
          this.taskList["showModal"] =false;
        }
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