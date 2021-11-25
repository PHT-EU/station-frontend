<template>
    <div class="container">
        <nav class="panel">
            <div class="panel-heading">
                <div class="columns">
                    <div class="column is-centered has-text-left">
                        Trains
                    </div>
                    <div class="column has-text-right">
                        <button
                            id="refreshButton"
                            class="btn button is-info is-small is-outlined"
                            onmouseleave="this.blur()"
                            @click="buttonEvent('refresh')"
                        >
                            <i class="fas fa-sync" />
                        </button>
                    </div>
                </div>
            </div>
            <div class="panel-block">
                <p class="control has-icons-left">
                    <input
                        class="input"
                        type="text"
                        placeholder="Search"
                    >
                    <span class="icon is-left">
                        <i
                            class="fas fa-search"
                            aria-hidden="true"
                        />
                    </span>
                </p>
            </div>
            <p class="panel-tabs">
                <a
                    :class="{'is-active': noFilter}"
                    @click="panelFilterClick('reset')"
                >All</a>
                <a
                    :class="{'is-active': filterActive}"
                    @click="panelFilterClick('active')"
                >
                    Active
                </a>
                <a
                    :class="{'is-active': filterDocker}"
                    @click="panelFilterClick('docker')"
                >
                    Docker
                </a>
                <a
                    :class="{'is-active': filterFederated}"
                    @click="panelFilterClick('federated')"
                >
                    Federated
                </a>
            </p>
            <a
                v-for="(train, idx) in trains"
                :key="train.trainId"
                class="panel-block"
                :class="{'selected': idx === activeIndex}"
                @click="onClickTrain(idx, train.trainId)"
            >

                <span
                    v-if="train.type === 'docker'"
                    class="panel-icon docker-icon"
                />
                <span
                    v-else
                    class="icon"
                >
                    <i class="fas fa-project-diagram" />
                </span>
                <span>{{ train.trainId }}</span>
                <span
                    class="small-circle"
                    :class="{'green-circle': train.active, 'yellow-circle': !train.active}"
                />
                <!--        TODO add active status indicator-->
            </a>

            <div class="panel-block">
                <button
                    class="button is-link is-outlined is-fullwidth"
                    @click="panelFilterClick('reset')"
                >
                    Reset all filters
                </button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'TrainPanel',
    props: {
        dockerTrains: Array,
        federatedTrains: Array,
    },
    emits: ['refresh', 'trainSelected'],
    data() {
        return {
            filterActive: false,
            filterDocker: false,
            filterFederated: false,
            noFilter: true,
            activeIndex: null,
        };
    },
    computed: {
        trains() {
            // TODO sort by most recent
            // TODO implement search
            let trains = [];
            if (this.dockerTrains.length >= 1) {
                for (let i = 0; i < this.dockerTrains.length; i++) {
                    trains.push({
                        trainId: this.dockerTrains[i].train_id,
                        type: 'docker',
                        active: this.dockerTrains[i].is_active,
                    });
                }
            }
            if (this.federatedTrains.length >= 1) {
                for (let i = 0; i < this.federatedTrains.length; i++) {
                    trains.push({
                        trainId: this.federatedTrains[i].train_id,
                        type: 'federated',
                        active: this.federatedTrains[i].is_active,
                    });
                }
            }
            if (this.filterActive) {
                trains = trains.filter((el) => el.active);
                if (this.filterDocker) {
                    return trains.filter((el) => el.type === 'docker');
                }
                if (this.filterFederated) {
                    return trains.filter((el) => el.type === 'federated');
                }
            } else {
                if (this.filterDocker) {
                    return trains.filter((el) => el.type === 'docker');
                }
                if (this.filterFederated) {
                    return trains.filter((el) => el.type === 'federated');
                }
            }

            return trains;
        },
    },
    methods: {
        buttonEvent(event) {
            this.$emit(event);
        },

        onClickTrain(idx, trainId) {
            if (this.activeIndex === idx) {
                this.activeIndex = null;
            } else {
                this.activeIndex = idx;
                this.$emit('trainSelected', trainId);
            }
        },

        panelFilterClick(filter) {
            // TODO improve this
            if (filter === 'active') {
                this.filterActive = !this.filterActive;
                this.noFilter = false;
            }
            if (filter === 'docker') {
                this.filterDocker = !this.filterDocker;
                this.filterFederated = false;
                this.noFilter = false;
            }
            if (filter === 'federated') {
                this.filterFederated = !this.filterFederated;
                this.filterDocker = false;
                this.noFilter = false;
            }
            if (filter === 'reset') {
                this.filterActive = false;
                this.filterDocker = false;
                this.filterFederated = false;
                this.noFilter = true;
            }
        },
    },
};
</script>

<style scoped>

.docker-icon {
  background: url("~@/assets/docker-logo.svg");
  height: 20px;
  width: 20px;
  display: block;
}

.selected {
  border-color: hsl(204, 86%, 53%);
  border-style: solid;
  border-width: 1px;
}

.small-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 8px;
}

.red-circle {
  background: red;
}
.yellow-circle {
  background: yellow;
}
.green-circle {
  background: green;
}

</style>
