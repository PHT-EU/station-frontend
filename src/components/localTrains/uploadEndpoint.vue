<template>
    <input
        id="file"
        ref="file"
        class="input is-hovered"
        type="file"
        webkitdirectory
        multiple
        @change="handleFileUpload()"
    >
    <button @click="submitFile()">
        Submit
    </button>
</template>

<script>

import axios from 'axios';

export default {
    name: 'UploadEndpoint',
    data() {
        return {
            files: [],
        };
    },
    methods: {
        handleFileUpload() {
            this.files = this.$refs.file.files;
        },
        async submitFile() {
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const index in this.files) {
                // eslint-disable-next-line no-console
                console.log(this.files[index]);
                const formData = new FormData();
                formData.append('upload_file', this.files[index]);
                const postUrl = `${process.env.VUE_APP_STATION_API}/local_trains/upload_train_file`;
                await axios.post(
                    postUrl,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                ).then(() => {
                    console.log('file up');
                }).catch(() => {
                    console.log('failed');
                });
            }
        },
    },
};
</script>

<style scoped>

</style>
