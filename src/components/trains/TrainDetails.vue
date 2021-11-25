<template>
    <div class="container">
        <h2 class="is-centered title">
            Train: {{ train ? train['train_id'] : 'test' }}
        </h2>
        <div class="tabs is-centered is-medium">
            <ul>
                <li
                    :class="{'is-active': selectedTab==='overview'}"
                    @click="selectTab('overview')"
                >
                    <a>
                        Overview
                    </a>
                </li>
                <li
                    :class="{'is-active': selectedTab==='configure'}"
                    @click="selectTab('configure')"
                >
                    <a>
                        Configure
                    </a>
                </li>
                <li
                    :class="{'is-active': selectedTab==='review'}"
                    @click="selectTab('review')"
                >
                    <a>
                        Review
                    </a>
                </li>
                <li
                    :class="{'is-active': selectedTab==='history'}"
                    @click="selectTab('history')"
                >
                    <a>
                        History
                    </a>
                </li>
            </ul>
        </div>
        <div id="tab-content">
            <OverviewTab
                v-if="selectedTab==='overview'"
                :train="train"
            />
            <ConfigurationTab
                v-else-if="selectedTab==='configure'"
                :train="train"
            />
            <HistoryTab
                v-else-if="selectedTab==='history'"
                :train="train"
            />
            <ReviewTab v-else-if="selectedTab==='review'" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import OverviewTab from '@/components/trains/OverviewTab';
import ConfigurationTab from '@/components/trains/ConfigurationTab';
import HistoryTab from '@/components/trains/HistoryTab';
import ReviewTab from '@/components/trains/ReviewTab';

export default {
    name: 'TrainDetails',
    components: {
        OverviewTab, ConfigurationTab, HistoryTab, ReviewTab,
    },
    props: {
        train: Object,
    },
    data() {
        return {
            selectedTab: 'overview',
            trainState: Object,
            trainConfig: Object,
            configs: Array,
        };
    },
    mounted() {
        this.getTrainState();
        this.getTrainConfig();
        this.getConfigs();
    },
    created() {
        this.getTrainState();
        this.getTrainConfig();
        this.getConfigs();
    },
    methods: {
        selectTab(tab) {
            this.selectedTab = tab;
        },
        async getTrainState() {
            let url = null;
            if (this.train.type === 'docker') {
                url = `${process.env.VUE_APP_STATION_API}/trains/docker/${this.train.trainId}/state`;
            } else {
                url = `${process.env.VUE_APP_STATION_API}/trains/federated/${this.train.trainId}/state`;
            }
            axios.get(url)
                .then((response) => {
                    this.trainState = response.data;
                });
        },
        async getTrainConfig() {
            let url = null;
            if (this.train.type === 'docker') {
                url = `${process.env.VUE_APP_STATION_API}/trains/docker/${this.train.trainId}/config`;
            } else {
                url = `${process.env.VUE_APP_STATION_API}/trains/federated/${this.train.trainId}/config`;
            }
            axios.get(url)
                .then((response) => {
                    this.trainConfig = response.data;
                });
        },

        async getConfigs() {
            let url = null;
            await this.train;
            if (this.train.type === 'docker') {
                url = `${process.env.VUE_APP_STATION_API}/trains/docker/configs/`;
            } else {
                url = `${process.env.VUE_APP_STATION_API}/trains/federated/configs/`;
            }

            axios.get(url)
                .then((response) => {
                    this.configs = response.data;
                });
        },

    },
};
</script>

<style scoped>

</style>
