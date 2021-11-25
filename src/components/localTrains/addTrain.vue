<template>
    <div class="container">
        <div
            v-if="showModal"
            @close="showModal = false"
        >
            <div
                class="modal-background"
                @click="closeModal()"
            />
            <div class="modal-content">
                <div class="box">
                    <h1 class="title">
                        Add a local train
                    </h1>
                    <table class="table is-fullwidth">
                        <tbody>
                            <tr>
                                <td>
                                    <p>Name the new Train</p>
                                </td>
                                <td>
                                    <input
                                        v-model="newTrainName"
                                        class="input is-primary"
                                        type="text"
                                        placeholder="name"
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        class="button is-success is-outlined"
                                        @click="addTrain()"
                                    >
                                        Add Local Train
                                    </button>
                                </td>
                                <td>
                                    <button
                                        class="button is-danger is-outlined"
                                        @click="closeModal()"
                                    >
                                        close
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AddTrain',
    props: { showAddTrain: Boolean },
    emits: ['refresh', 'close'],
    data() {
        return {
            showModal: false,
            newTrainName: null,
        };
    },
    watch: {
        showAddTrain(newVal) {
            this.showModal = newVal;
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        async addTrain() {
            console.log('addTrain');
            const url = `${process.env.VUE_APP_STATION_API}/localTrains/create`;
            const postData = {
                train_name: this.newTrainName,
            };
            await axios.post(url, postData)
                .then((response) => {
                    console.log(response);
                    this.$emit('refresh');
                })
                .catch((error) => {
                    console.log(error);
                    this.error = error;
                });

            this.closeModal();
        },

    },
};
</script>

<style scoped>
.table{
  align-self: center;
}
.modal-content{
  z-index: 9999;
  position: absolute;
  margin-top: 20%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.modal-background {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}
</style>
