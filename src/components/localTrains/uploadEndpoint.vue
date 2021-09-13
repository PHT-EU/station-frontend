<template>
  <input class="input is-hovered" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
  <button v-on:click="submitFile()">Submit</button>
</template>

<script>

import axios from "axios";

export default {
  name: "uploadEndpoint",
  data(){
    return {
      file: ''
    }
  },
  methods:{
    handleFileUpload(){
      console.log("upload")
      this.file = this.$refs.file.files[0];
    },
    async submitFile() {
      const formData = new FormData();
      formData.append('upload_file', this.file);
      let post_url =`${process.env.VUE_APP_STATION_API}/local_trains/upload_endpoint`;
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
    },
  }
}
</script>

<style scoped>

</style>