<template>
    <h2>Test Header</h2>
    <div class="line-numbers">
        <pre :class="language_class">
      <code>
        import os

        print("Hello world")
      </code>
    </pre>
    </div>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-json';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export default {
    name: 'FileViewer',

    props: {
        lang: String,
        fileName: String,
        fileContent: String,
    },

    computed: {
        language_class() {
            return `language-${this.lang}`;
        },

    },

    mounted() {
        Prism.highlightAll();
    },

};
</script>

<style scoped>

</style>
