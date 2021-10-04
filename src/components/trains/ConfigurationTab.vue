<template>
  <div class="container" style="max-width: 700px">
    <div class="field has-addons">
      <div class="field-label is-normal">
        <label class="label">Select an existing configuration as template: </label>
      </div>
      <div class="control">
        <div class="select">
          <select name="configSelect" v-model="selectedConfig">
            <option v-for="config in configs" :value="config" :key="config.name">
              {{ config.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="control">
        <button type="submit" class="button is-primary">Choose</button>
      </div>
    </div>

    <div class="field">
      <label class="label">Configuration Name</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input is-success" type="text" placeholder="Enter configuration name" v-model="configName">
        <span class="icon is-small is-left">
          <i class="fas fa-cog"></i>
          <!-- todo name validation -->
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </div>
      <p class="help is-success">This config name is available</p>
    </div>


    <div class="field">
      <label class="label">Airflow Configuration</label>
      <div class="control">
        <textarea class="textarea" placeholder="Airflow configuration json" :value="airflowConfig"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Airflow Environment Variables</label>
    </div>

    <div v-for="(envVar, index) in airflowConfigEnvVars" class="field is-horizontal" :key="index">
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="Key" v-model="envVar.key">
            <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control is-expanded has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="Value" v-model="envVar.value">
            <span class="icon is-small is-left">
              <i class="fas fa-equals"></i>
            </span>
          </p>
        </div>

        <div v-if="index === (airflowConfigEnvVars.length - 1)" class="field">
          <button class="button" @click="addEnvironmentVariable()">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
          </button>
        </div>
      </div>
    </div>


    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="autoExecute">
          Auto execute
        </label>
      </div>
    </div>


    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="submitConfig">Save</button>
      </div>
      <div class="control">
        <button class="button is-link is-light">Discard</button>
      </div>
    </div>
  </div>

</template>

<script>

import {getDockerTrainConfigs, createDockerTrainConfig} from "@/api/dockerTrainsApi";

export default {
  name: "ConfigurationTab",
  props: {
    train: Object
  },
  data() {
    return {
      configs: null,
      selectedConfig: null,
      configReady: false,
      airflowConfigEnvVars: [{"key": null, "value": null}],
      cpuRequirements: null,
      gpuRequirements: null,
      autoExecute: false
    }
  },

  computed: {
    airflowConfig() {
      if (this.selectedConfig) {
        return JSON.stringify(this.selectedConfig["airflow_config_json"], null, "  ");
      } else {
        return null;
      }
    },
    configName() {
      return this.selectedConfig ? this.selectedConfig.name : null;
    }
  },

  methods: {
    async getConfigs() {
      if (this.train.type === "docker") {
        console.log("Accessing configs");
        this.configs = await getDockerTrainConfigs();
      }

    },
    makeAirflowConfig() {
      let airflowConfig = null;
      if (this.airflowConfig === null) {
        airflowConfig = {
          "env": {}
        }
      } else {
        airflowConfig = this.selectedConfig["airflow_config_json"]
      }
      for (const envVar in this.airflowConfigEnvVars) {
        if (envVar.key != null) {
          airflowConfig["env"][envVar.key] = envVar.value;
        }
      }

      return airflowConfig
    },
    makeConfig() {
      return {
        name: this.configName,
        airflow_config_json: this.makeAirflowConfig(),
        cpu_requirements: {},
        gpu_requirements: {},
        auto_execute: this.autoExecute
      }
    },

    async submitConfig() {
      const config = this.makeConfig();
      const resp = await createDockerTrainConfig(config);
      console.log(resp)
    },

    addEnvironmentVariable() {
      this.airflowConfigEnvVars.push({"key": null, "value": null});
    },
  },

  watch: {
    train() {
      this.getConfigs();
      this.configReady = true;
    }
  },

  async mounted() {
    await this.getConfigs();
    this.configReady = true;
  }

}
</script>

<style scoped>

</style>
