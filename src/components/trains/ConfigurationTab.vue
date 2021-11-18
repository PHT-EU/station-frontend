<template>
  <div class="container" id="configuration-container">
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

    <!-- Actual configuration either json or k/v pairs -->
    <div>
      <div class="field is-grouped">
        <label class="label">Airflow Configuration</label>
        <div class="control is-expanded" id="toggleButton">
          <button class="button is-small is-transparent" @click="toggleJson">
            <span v-if="jsonConfig" class="icon is-small is-primary">
              <i class="fas fa-list"></i>
            </span>
            <span v-else class="icon is-small is-primary brackets-curly"></span>
          </button>
        </div>

      </div>

      <!--  Configuration as json string    -->
      <div v-if="jsonConfig">
        <div class="field">
          <div class="control">
            <textarea class="textarea" placeholder="Airflow configuration json" v-model="airflowConfigJson"></textarea>
          </div>
        </div>
      </div>
      <!--   Configuration via key value pairs   -->
      <div v-else>
        <div>
          <div class="field">
            <label class="label">Environment Variables</label>
          </div>

          <div v-for="(envVar, index) in airflowConfigEnvVars" class="field is-horizontal" :key="index">
            <div class="field-body">
              <div class="field">
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="Key" v-model="envVar.key">
                  <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input class="input" type="text" placeholder="Value" v-model="envVar.value">
                  <span class="icon is-small is-left">
                    <i class="fas fa-equals"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="field">
            <button class="button control" @click="addEnvironmentVariable">
                <span class="icon is-small">
                  <i class="fas fa-plus"></i>
                </span>
            </button>
          </div>
        </div>
        <!--     volume configuration  -->
        <div>
          <div class="field">
          </div>
          <label class="label">Data Volumes</label>
          <div v-for="(volume, index) in airflowConfigVolumes" class="field is-horizontal" :key="index">
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input class="input" type="text" placeholder="Host path" v-model="volume.orig">
                  <span class="icon is-small is-left">
              <i class="fas fa-folder"></i>
            </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input class="input" type="text" placeholder="Container path" v-model="volume.dest">
                  <span class="icon is-small is-left">
                  <i class="fas fa-folder"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" v-model="airflowConfigVolumes[index].mode">
                    Write access
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <button class="button control" @click="addDataVolume">
                <span class="icon is-small">
                  <i class="fas fa-plus"></i>
                </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--button controls-->
    <div class="field is-grouped">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="autoExecute">
          Auto execute
        </label>
      </div>
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="saveConfig">
          Save Config
        </label>
      </div>
    </div>
    <div class="field is-grouped" id="config-button-row">
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

import {createDockerTrainConfig, getDockerTrainConfigs} from "@/api/dockerTrainsApi";

export default {
  name: "ConfigurationTab",
  props: {
    train: Object
  },
  data() {
    return {
      configs: null,
      configName: "",
      selectedConfig: null,
      configReady: false,
      airflowConfigEnvVars: [{"key": null, "value": null}],
      airflowConfigVolumes: [{"orig": null, "dest": null, "mode": false}],
      cpuRequirements: null,
      gpuRequirements: null,
      autoExecute: false,
      jsonConfig: false,
      saveConfig: false,
      airflowConfigJson: null
    }
  },

  computed: {
    airflowEnvironment() {
      return this.airflowConfigEnvVars.filter(envVar => envVar.key !== null);
    },
    airflowVolumes() {
      return this.airflowConfigVolumes
          .filter(volume => volume.orig !== null)
          .map(value => {
            return {
              "host_path": value.orig,
              "container_path": value.dest,
              "mode": value.mode ? "rw" : "ro"
            };
          });
    }
  },

  methods: {
    async getConfigs() {
      if (this.train.type === "docker") {
        console.log("Accessing configs");
        this.configs = await getDockerTrainConfigs();
      }

    },
    toggleJson() {
      this.jsonConfig = !this.jsonConfig;
    },
    makeConfig() {

      let airflowConfig;
      if (this.jsonConfig){
        airflowConfig = this.airflowConfigJson;
      }
      else {
        airflowConfig = {
          "env": this.airflowEnvironment,
          "volumes": this.airflowVolumes
        };
      }

      return {
        "name": this.configName,
        "airflow_config": airflowConfig,
        "cpu_requirements": null,
        "gpu_requirements": null,
        "auto_execute": this.autoExecute
      }
    },

    async submitConfig() {
      const config = this.makeConfig();
      console.log("Config");
      console.log(config);
      const resp = await createDockerTrainConfig(config);
      console.log(resp);
    },

    addEnvironmentVariable() {
      this.airflowConfigEnvVars.push({"key": null, "value": null});
    },

    addDataVolume() {
      this.airflowConfigVolumes.push({"orig": null, "dest": null, "write": false})
    }
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
