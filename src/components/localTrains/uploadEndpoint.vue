<template>
  <input class="input is-hovered" type="file" id="file" ref="file" webkitdirectory multiple v-on:change="handleFileUpload()"/>
  <button v-on:click="submitFile()">Submit</button>
</template>

<script>

import axios from "axios";

export default {
  name: "uploadEndpoint",
  data(){
    return {
      files: []
    }
  },
  methods:{
    handleFileUpload(){
      this.files = this.$refs.file.files;
    },
    async submitFile() {
      for(let index in this.files ) {
        console.log(this.files[index])
        const formData = new FormData();
        formData.append('upload_file', this.files[index]);
        let post_url = `${process.env.VUE_APP_STATION_API}/local_trains/upload_train_file`;
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
    },
  }
}
</script>

<style scoped>

</style>