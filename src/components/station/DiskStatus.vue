<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                <span class="icon has-text-success">  <i class="fas fa-2x fa-hdd " /> </span>
        &nbsp;&nbsp;<progress
class="progress is-success"
:value="DiskUsage"
max="100"
>
{{ DiskUsage }}%
</progress>
            </p>
            <button
                class="card-header-icon"
                aria-label="more options"
                @click="MoreInformation=!MoreInformation"
            >
                <span class="icon">
                    <i
                        v-if="MoreInformation === false"
                        class="fas fa-angle-down"
                        aria-hidden="true"
                    />
                    <i
                        v-if="MoreInformation === true"
                        class="fas fa-angle-up"
                        aria-hidden="true"
                    />
                </span>
            </button>
        </header>
        <div
            v-if="MoreInformation === true"
            class="card-content"
        >
            <div class="content">
                <div class="block has-text-left">
                    Total:  <strong>{{ Total }}</strong> GB<br>
                    Free: <strong>{{ Free }}</strong> GB<br>
                    Used: <strong>{{ Used }}</strong> GB<br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DiskStatus',
    data() {
        return {
            MoreInformation: false,
            DiskUsage: NaN,
            Free: NaN,
            Used: NaN,
            Total: NaN,
        };
    },
    created() {
        this.getDiskStatus();
        this.timer = setInterval(this.getDiskStatus, 30000);
    },
    methods: {
        async getDiskStatus() {
            const url = `${process.env.VUE_APP_STATION_API}/station/status/total_disk_util`;
            axios.get(url).then((response) => {
                this.DiskUsage = response.data.percent;
                this.Free = Math.round(response.data.free / 10 ** 9);
                this.Used = Math.round(response.data.used / 10 ** 9);
                this.Total = this.Free + this.Used;
            });
        },
    },
};
</script>

<style scoped>

</style>
