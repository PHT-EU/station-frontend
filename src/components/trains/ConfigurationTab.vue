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
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          Auto execute
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          I agree to the <a href="#">terms and conditions</a>
        </label>
      </div>
    </div>


    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Save</button>
      </div>
      <div class="control">
        <button class="button is-link is-light">Discard</button>
      </div>
    </div>
  </div>

</template>

<script>

import {getDockerTrainConfigs} from "@/api/dockerTrainsApi";

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
    }
  },

  computed: {
    airflowConfig() {
      if( this.selectedConfig) {
        return JSON.stringify(this.selectedConfig["airflow_config_json"], null, "  ");
      }
      else {
        return null;
      }
    },
    configName() {
      return this.selectedConfig? this.selectedConfig.name : null;
    }
  },

  methods: {
    async getConfigs() {
      if (this.train.type === "docker") {
        this.configs = await getDockerTrainConfigs();
      }
    },
  },

  async mounted() {
    await this.getConfigs();
    this.configReady = true;
  }

}
</script>

<style scoped>

</style>
