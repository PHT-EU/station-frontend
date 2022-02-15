<template>
    {{ Container }}
</template>

<script>
import axios from 'axios';

export default {
    name: 'DockerContainerStatus',
    data() {
        return {
            MoreInformation: false,
            Container: [],
        };
    },
    created() {
        this.getDockerStatus();
        this.timer = setInterval(this.getDockerStatus, 30000);
    },
    methods: {
        async getDockerStatus() {
            const url = `${process.env.VUE_APP_STATION_API}/station/status/container_resource_util`;
            axios.get(url).then((response) => {
                this.Container = response.data;
            });
        },
    },
};
</script>

<style scoped>

</style>
