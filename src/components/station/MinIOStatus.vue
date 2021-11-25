<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                <button
                    v-if="MinIOStatus === false"
                    class="button is-rounded is-danger"
                    @click="getMinIOStatus()"
                >
                    <i class="fas fa-database" />
                </button>
                <button
                    v-if="MinIOStatus === true"
                    class="button is-rounded is-success"
                    @click="getMinIOStatus()"
                >
                    <i class="fas fa-database" />
                </button> &nbsp; MinIO Status
            </p>
            <button
                class="card-header-icon"
                aria-label="more options"
                @click="MinIOStatusMoreInformation=!MinIOStatusMoreInformation"
            >
                <span class="icon">
                    <i
                        v-if="MinIOStatusMoreInformation === false"
                        class="fas fa-angle-down"
                        aria-hidden="true"
                    />
                    <i
                        v-if="MinIOStatusMoreInformation === true"
                        class="fas fa-angle-up"
                        aria-hidden="true"
                    />
                </span>
            </button>
        </header>
        <div
            v-if="MinIOStatusMoreInformation === true"
            class="card-content"
        >
            <div class="content">
                <div class="block has-text-left">
                    No additional information at this moment
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'MinIOStatus',
    data() {
        return {
            MinIOStatus: false,
            MinIOStatusMoreInformation: false,
        };
    },
    created() {
        this.getMinIOStatus();
    },
    methods: {
        async getMinIOStatus() {
            const url = `${process.env.VUE_APP_STATION_API}/status/Minio`;
            axios.get(url).then((response) => {
                if (response.data.status === 'healthy') {
                    this.MinIOStatus = true;
                }
            });
        },
    },
};
</script>

<style scoped>

</style>
