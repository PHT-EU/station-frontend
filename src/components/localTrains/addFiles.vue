<template>
  <button class="button is-success is-outlined"  @click="showModal = true">
    <i class="far fa-plus-square"></i>
  </button>
  <div class="container">
    <div v-if="showModal" @close="showModal = false">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-content" >
        <div class="box">
          <h1 class="title">Add a file to the Train {{selectedTrain["train_name"]}}</h1>
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" id="file" ref="file" v-on:change="handleFileUpload()">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
            </label>
          </div>
          <button class="button is-success is-outlined" v-on:click="submitFile()">Submit</button>
          <button class="button is-danger is-outlined" @click="showModal = false">
               close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addFiles",
  data() {
    return {
      showModal: false,
    }
  },
  props: {selectedTrain:Object },
  methods: {
    handleFileUpload(){
      this.files = this.$refs.file.files;
    },
    async submitFile() {
      console.log(this.files[0])
      const formData = new FormData();
      formData.append('upload_file', this.files[0]);
      let post_url = `${process.env.VUE_APP_STATION_API}/localTrains/uploadTrainFile/`+this.selectedTrain["train_id"] ;
      await axios.post(post_url, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).then(function () {
            console.log('file up');
          }
      ).catch(function () {
        console.log('failed');
      });

    }
  }
}
</script>

<style scoped>
.modal-content{
  z-index: 9999;
  position: absolute;
  margin-top: 20%;
  left: 50%;
  top: 50%;
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
</style>