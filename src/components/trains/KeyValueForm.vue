<template>
  <div>
    <div class="field">
      <label class="label">Environment Variables</label>
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
          <button class="button" @click="addEnvironmentVariable">
                <span class="icon is-small">
                  <i class="fas fa-plus"></i>
                </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'KeyValueForm',
  props: {
    addEnvironmentVariable: {},
    airflowConfigEnvVars: {},
    labelName:  {},
  }
}
</script>
