<template>
  <div class="line-numbers">
    <pre :class="language_class">
      <code>
        {{endpoint_code}}
<!--        <p v-for="line in lines_code" :key="line">{{line}}
        </p>-->

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
  name: "showCode",
  data(){
    return {
      endpoint_code: "",
      lines_code:[],
      lang: "Python"
    }
  },
  props: {  fileName: String},
  watch: {
    fileName: function (newVal, oldVal) {
      console.log(oldVal)
      console.log("new props")
      this.loadFile(newVal)
    }
  },
  methods:{
    async loadFile(fileName){
      let url = `${process.env.VUE_APP_STATION_API}/local_trains/get_file/`+fileName;
      await axios.get(url).then(response => {
        this.endpoint_code = response.data;
        this.lines_code = response.data.split(/\r?\n/);
      });
      Prism.highlightAll();
    },

  },
  computed: {
    language_class() {
      return`language-${this.lang}`
    },

  },
  async mounted() {
    await this.loadFile(this.fileName);
    Prism.highlightAll();
  },
  async created() {
    await this.loadFile(this.fileName);
    Prism.highlightAll();
  }

}
</script>

<style scoped>

</style>