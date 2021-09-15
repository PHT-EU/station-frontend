<template>
  <div class="line-numbers">
    <pre :class="language_class">
      <code>{{endpoint_code}}
      </code>
    </pre>
  </div>
</template>

<script>
import axios from "axios";
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-r'
import 'prismjs/components/prism-json'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
export default {
  name: "showEndpoints",
  data(){
    return {
      endpoint_code: "",
      lang: "python"
    }
  },
  methods:{
    loadFileNames(){
      let url = `${process.env.VUE_APP_STATION_API}/local_trains/get_endpoint`;
      axios.get(url).then(response => {
        this.endpoint_code = response.data;
      });
    },
  },
  computed: {
    language_class() {
      return`language-${this.lang}`
    },

  },
  mounted() {
    this.loadFileNames()
    Prism.highlightAll()
  }


}
</script>

<style scoped>

</style>