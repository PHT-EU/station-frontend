<template>
  <div class="dropdown is-active">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" v-on:click="activateDropDown()" aria-controls="dropdown-menu">
        <span>Select</span>
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
  methods: {
    loadAvailableMasterImages() {
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/masterImages`;
      axios.get(url).then(response => {
        this.availableMasterImages = response.data;
      })
    },
    addMasterImage(MasterImage){
      console.log(MasterImage);
      let url = `${process.env.VUE_APP_STATION_API}/localTrains/addMasterImage/${this.selectedTrain["train_id"]}/${MasterImage}`;
      axios.put(url).then(response => {console.log(response)});
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

</style>