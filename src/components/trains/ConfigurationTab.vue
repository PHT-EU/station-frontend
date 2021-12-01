<template>
    <div
        id="configuration-container"
        class="container"
    >
        <div class="field has-addons">
            <div class="field-label is-normal">
                <label class="label">Select an existing configuration as template: </label>
            </div>
            <div class="control">
                <div class="select">
                    <select
                        v-model="selectedConfig"
                        name="configSelect"
                    >
                        <option
                            v-for="config in configs"
                            :key="config.name"
                            :value="config"
                        >
                            {{ config.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="control">
                <button
                    type="submit"
                    class="button is-primary"
                >
                    Choose
                </button>
            </div>
        </div>

        <div class="field">
            <label class="label">Configuration Name</label>
            <div class="control has-icons-left has-icons-right">
                <input
                    v-model="configName"
                    class="input is-success"
                    type="text"
                    placeholder="Enter configuration name"
                >
                <span class="icon is-small is-left">
                    <i class="fas fa-cog" />
                    <!-- todo name validation -->
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check" />
                </span>
            </div>
            <p class="help is-success">
                This config name is available
            </p>
        </div>

        <!-- Actual configuration either json or k/v pairs -->
        <div>
            <div class="field is-grouped">
                <label class="label">Airflow Configuration</label>
                <div
                    id="toggleButton"
                    class="control is-expanded"
                >
                    <button
                        class="button is-small is-transparent"
                        @click="toggleJson"
                    >
                        <span
                            v-if="jsonConfig"
                            class="icon is-small is-primary"
                        >
                            <i class="fas fa-list" />
                        </span>
                        <span
                            v-else
                            class="icon is-small is-primary brackets-curly"
                        />
                    </button>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label class="checkbox">
                        <input
                            v-model="autoExecute"
                            type="checkbox"
                        >
                        Auto execute
                    </label>
                </div>
            </div>

            <!--  Configuration as json string    -->
            <div v-if="jsonConfig">
                <div class="field">
                    <div class="control">
                        <textarea
                            v-model="airflowConfigJson"
                            class="textarea"
                            placeholder="Airflow configuration json"
                        />
                    </div>
                </div>
            </div>
            <!--   Configuration via key value pairs   -->
            <div v-else>
                <div>
                    <div class="field">
                        <label class="label">Environment Variables</label>
                    </div>

                    <div
                        v-for="(envVar, index) in airflowConfigEnvVars"
                        :key="index"
                        class="field is-horizontal"
                    >
                        <div class="field-body">
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input
                                        v-model="envVar.key"
                                        class="input"
                                        type="text"
                                        placeholder="Key"
                                    >
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-key" />
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left has-icons-right">
                                    <input
                                        v-model="envVar.value"
                                        class="input"
                                        type="text"
                                        placeholder="Value"
                                    >
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-equals" />
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <button
                            class="button control"
                            @click="addEnvironmentVariable"
                        >
                            <span class="icon is-small">
                                <i class="fas fa-plus" />
                            </span>
                        </button>
                    </div>
                </div>
                <!--     volume configuration  -->
                <div>
                    <div class="field" />
                    <label class="label">Data Volumes</label>
                    <div
                        v-for="(volume, index) in airflowConfigVolumes"
                        :key="index"
                        class="field is-horizontal"
                    >
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded has-icons-left">
                                    <input
                                        v-model="volume.orig"
                                        class="input"
                                        type="text"
                                        placeholder="Host path"
                                    >
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-folder" />
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left has-icons-right">
                                    <input
                                        v-model="volume.dest"
                                        class="input"
                                        type="text"
                                        placeholder="Container path"
                                    >
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-folder" />
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <label class="checkbox">
                                        <input
                                            v-model="airflowConfigVolumes[index].mode"
                                            type="checkbox"
                                        >
                                        Write access
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <button
                            class="button control"
                            @click="addDataVolume"
                        >
                            <span class="icon is-small">
                                <i class="fas fa-plus" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--button controls-->
        <div class="field">
            <div class="control p-2">
                <label class="checkbox">
                    <input
                        v-model="saveConfig"
                        type="checkbox"
                    >
                    Save Config
                </label>
            </div>
        </div>
        <div
            id="config-button-row"
            class="field is-grouped"
        >
            <div class="control">
                <button
                    class="button is-link"
                    @click="submitConfig"
                >
                    Save
                </button>
            </div>
            <div class="control">
                <button class="button is-link is-light">
                    Discard
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import { createDockerTrainConfig, getDockerTrainConfigs } from '@/api/dockerTrains';

export default {
    name: 'ConfigurationTab',
    props: {
        train: Object,
    },
    data() {
        return {
            configs: null,
            configName: '',
            selectedConfig: null,
            configReady: false,
            airflowConfigEnvVars: [{ key: null, value: null }],
            airflowConfigVolumes: [{ orig: null, dest: null, mode: false }],
            cpuRequirements: null,
            gpuRequirements: null,
            autoExecute: false,
            jsonConfig: false,
            saveConfig: false,
            airflowConfigJson: null,
        };
    },

    computed: {
        airflowEnvironment() {
            return this.airflowConfigEnvVars.filter((envVar) => envVar.key !== null);
        },
        airflowVolumes() {
            return this.airflowConfigVolumes
                .filter((volume) => volume.orig !== null)
                .map((value) => ({
                    host_path: value.orig,
                    container_path: value.dest,
                    mode: value.mode ? 'rw' : 'ro',
                }));
        },
    },

    watch: {
        train() {
            this.getConfigs();
            this.configReady = true;
        },
    },

    async mounted() {
        await this.getConfigs();
        this.configReady = true;
    },

    methods: {
        async getConfigs() {
            if (this.train.type === 'docker') {
                console.log('Accessing configs');
                this.configs = await getDockerTrainConfigs();
            }
        },
        toggleJson() {
            this.jsonConfig = !this.jsonConfig;
        },
        makeConfig() {
            let airflowConfig;
            if (this.jsonConfig) {
                airflowConfig = this.airflowConfigJson;
            } else {
                airflowConfig = {
                    env: this.airflowEnvironment,
                    volumes: this.airflowVolumes,
                };
            }

            return {
                name: this.configName,
                airflow_config: airflowConfig,
                cpu_requirements: null,
                gpu_requirements: null,
                auto_execute: this.autoExecute,
            };
        },

        async submitConfig() {
            const config = this.makeConfig();
            console.log('Config');
            console.log(config);
            const resp = await createDockerTrainConfig(config);
            console.log(resp);
        },

        addEnvironmentVariable() {
            this.airflowConfigEnvVars.push({ key: null, value: null });
        },

        addDataVolume() {
            this.airflowConfigVolumes.push({ orig: null, dest: null, write: false });
        },
    },

};
</script>

<style scoped>

#configuration-container {
  max-width: available;
  margin-right: 10em;
  margin-left: 10em;
}

#config-div-header {
  display: flex;
  align-items: end;
  justify-content: end;
  padding-right: 0.5em;
}

.brackets-curly {
  background: url("~@/assets/brackets.png");
  background-size: cover;
  height: 1em;
  width: 1em;
  display: block;
}

#config-button-row {
  padding: 1em;
}

#toggleButton {
  text-align: right;
}
</style>
