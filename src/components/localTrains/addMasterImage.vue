<template>
  <div class="field">
    <label class="label">Master Image: {{selectedTrain.airflow_config_json.repository}}</label>
    <div class="dropdown is-active">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" v-on:click="activateDropDown()" aria-controls="dropdown-menu">
          <span>Select Master Image</span>
          <span class="icon is-small">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu" v-if="dropDown === true" >
        <div class="dropdown-content">
          <a v-for="MasterImage in availableMasterImages" :key="MasterImage" v-on:click="addMasterImage(MasterImage)" class="dropdown-item">
            {{MasterImage}}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "addMasterImage",
  data(){
    return {
      availableMasterImages: [],
      dropDown: false
    }
  },
  props: {selectedTrain :Object},
  emits: ['refresh'],
  methods: {
    loadAvailableMasterImages() {
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/masterImages`;
      axios.get(url).then(response => {
        this.availableMasterImages = response.data;
      })
    },
    async addMasterImage(MasterImage){
      console.log(MasterImage);
      let Data ={
        train_id: this.selectedTrain['train_id'],
        image: MasterImage
      };
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/addMasterImage`;
      await axios.put(url,Data).then(response => {console.log(response)});
      this.$emit('refresh');
      this.dropDown= false;
    },
    activateDropDown(){
      this.dropDown = !this.dropDown;
    }
  },
  mounted() {
    this.loadAvailableMasterImages();
  },
}
</script>

<style scoped>
.button{
  width: 100%;
  margin: 0 auto;
}
</style>