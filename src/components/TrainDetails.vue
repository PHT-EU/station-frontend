<template>
  <div class="container is-fluid">
    <h2 class="is-centered title">
      Train: {{train ? train['train_id'] : 'test'}}
    </h2>
    <div class="tabs is-centered is-medium">
      <ul>
        <li class="is-active">
          <a>
            Overview
          </a>
        </li>
        <li>
          <a>
            Configure
          </a>
        </li>
        <li>
          <a>
            History
          </a>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrainDetails",
  props: {
    train: Object
  }

}
</script>

<style scoped>

</style>
