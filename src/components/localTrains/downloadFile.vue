<template>
    <button
        class="button is-success is-outlined "
        @click="downloadFile()"
    >
        <i class="fas fa-cloud-download-alt" />
    </button>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DownloadFile',
    props: { selectedTrain: Object, file: String },
    methods: {
        async downloadFile() {
            const Data = {
                train_id: this.selectedTrain.train_id,
                file_name: this.file,
            };
            const postUrl = `${process.env.VUE_APP_STATION_API}/localTrains/getFile`;
            console.log(this.file, Data);
            await axios.get(
                postUrl,
                {
                    params: Data,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            ).then((response) => {
                const url = URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', this.file);
                document.body.appendChild(link);
                link.click();
            });
        },
    },
};
</script>

<style scoped>

</style>
