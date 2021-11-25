<template>
    <div class="line-numbers">
        <pre :class="language_class">
     <code><!-- The <p> is not suportet to be inside of code but was needed to get formation {{endpoint_code}}} did not work  -->
        <p
v-for="line in lines_code"
:key="line"
>{{ line }}
        </p>
      </code>
    </pre>
    </div>
</template>

<script>
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-json';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export default {
    name: 'ShowCode',
    props: { fileName: String },
    data() {
        return {
            endpoint_code: '',
            lines_code: [],
            lang: 'Python',
        };
    },
    computed: {
        language_class() {
            return `language-${this.lang}`;
        },

    },
    watch: {
        fileName(newVal) {
            this.loadFile(newVal);
            console.log('print watch ');
        },
    },
    methods: {
        async loadFile(fileName) {
            this.endpoint_code = '';
            this.lines_code = [];
            const url = `${process.env.VUE_APP_STATION_API}/local_trains/get_file`;
            await axios.get(url, { params: { file_name: fileName } }).then((response) => {
                this.endpoint_code = response.data;
                this.lines_code = response.data.split(/\r?\n/);
            });
            Prism.highlightAll();
            // console.log("load file")
        },

    },

};
</script>

<style scoped>

</style>
