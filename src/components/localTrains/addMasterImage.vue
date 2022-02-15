<template>
    <div class="field">
        <label class="label">Master Image: {{ selectedTrain.airflow_config_json.repository }}</label>
        <div class="dropdown is-active">
            <div class="dropdown-trigger">
                <button
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    @click="activateDropDown()"
                >
                    <span>Select Master Image</span>
                    <span class="icon is-small">
                        <i
                            class="fas fa-angle-down"
                            aria-hidden="true"
                        />
                    </span>
                </button>
            </div>
            <div
                v-if="dropDown === true"
                id="dropdown-menu"
                class="dropdown-menu"
                role="menu"
            >
                <div class="dropdown-content">
                    <a
                        v-for="MasterImage in availableMasterImages"
                        :key="MasterImage"
                        class="dropdown-item"
                        @click="addMasterImage(MasterImage)"
                    >
                        {{ MasterImage }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AddMasterImage',
    props: { selectedTrain: Object },
    emits: ['refresh'],
    data() {
        return {
            availableMasterImages: [],
            dropDown: false,
        };
    },
    mounted() {
        this.loadAvailableMasterImages();
    },
    methods: {
        loadAvailableMasterImages() {
            const url = `${process.env.VUE_APP_STATION_API}/localTrains/masterImages`;
            axios.get(url).then((response) => {
                this.availableMasterImages = response.data;
            });
        },
        async addMasterImage(MasterImage) {
            console.log(MasterImage);
            const Data = {
                train_id: this.selectedTrain.train_id,
                image: MasterImage,
            };
            const url = `${process.env.VUE_APP_STATION_API}/localTrains/masterImage`;
            await axios.put(url, Data).then((response) => { console.log(response); });
            this.$emit('refresh');
            this.dropDown = false;
        },
        activateDropDown() {
            this.dropDown = !this.dropDown;
        },
    },
};
</script>

<style scoped>
.button{
  width: 100%;
  margin: 0 auto;
}
</style>
