<template>
  <div class="container" style="max-width: 700px">
    <div class="field has-addons">
      <div class="field-label is-normal">
        <label class="label">Select an existing configuration: </label>
      </div>
      <div class="control">
        <div class="select">
          <select name="configSelect" v-model="selectedConfig" @change="onConfigSelect($event)">
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
        <input class="input is-success" type="text" placeholder="Enter configuration name">
        <span class="icon is-small is-left">
      <i class="fas fa-cog"></i>
    </span>
        <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
      </div>
      <p class="help is-success">This username is available</p>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
        <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
        <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
      </div>
      <p class="help is-danger">This email is invalid</p>
    </div>

    <div class="field">
      <label class="label">Subject</label>
      <div class="control">
        <div class="select">
          <select>
            <option>Select dropdown</option>
            <option>With options</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Message</label>
      <div class="control">
        <textarea class="textarea" placeholder="Textarea"></textarea>
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

    <div class="field">
      <div class="control">
        <label class="radio">
          <input type="radio" name="question">
          Yes
        </label>
        <label class="radio">
          <input type="radio" name="question">
          No
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-light">Cancel</button>
      </div>
    </div>
  </div>
  <div class="field is-horizontal is-align-content-start">
    <div class="field-label is-normal container">
      <label class="label">Select an existing configuration</label>
    </div>
    <div class="control">
      <input class="input" type="text" placeholder="Text input">
    </div>
  </div>

  <div class="field is-horizontal p-5">
    <label class="label">Username</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input is-success" type="text" placeholder="Text input" value="bulma">
      <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
      <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
    </div>
    <p class="help is-success">This username is available</p>
  </div>

  <div class="field">
    <label class="label">Email</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
      <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
      <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
    </div>
    <p class="help is-danger">This email is invalid</p>
  </div>

  <div class="field">
    <label class="label">Subject</label>
    <div class="control">
      <div class="select">
        <select>
          <option>Select dropdown</option>
          <option>With options</option>
        </select>
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label">Message</label>
    <div class="control">
      <textarea class="textarea" placeholder="Textarea"></textarea>
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

  <div class="field">
    <div class="control">
      <label class="radio">
        <input type="radio" name="question">
        Yes
      </label>
      <label class="radio">
        <input type="radio" name="question">
        No
      </label>
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link">Submit</button>
    </div>
    <div class="control">
      <button class="button is-link is-light">Cancel</button>
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
    }
  },

  methods: {
    async getConfigs() {
      if (this.train.type === "docker") {
        this.configs = await getDockerTrainConfigs();
      }
    },
    onConfigSelect(event) {
      console.log(event.target.value)
    }
  },

  async mounted() {
    await this.getConfigs();
  }

}
</script>

<style scoped>

</style>
