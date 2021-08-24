<template>
  <table class="table is-fullwidth is-hoverable ">
    <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>created at</th>
      <th>Server url</th>
      <th>proposal id</th>
      <th>items</th>
      <th>user</th>
      <th>password</th>
      <th>server type</th>
      <th>Delete</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in tableData" :key="row.id">
      <td>{{row.id}}</td>
      <td>{{ row.name }}</td>
      <td>{{ row.created_at }}</td>
      <td>{{ row.access_path }}</td>
      <td>{{ row.proposal_id }}</td>
      <td>{{row.n_items}}</td>
      <td>{{row.fhir_user}}</td>
      <td class="hidetext">{{row.fhir_password}}</td>
      <td>{{row.fhir_server_type}}</td>
      <td>
        <button class="button is-danger is-outlined "  v-on:click="deleteDataset(row.id)">
          <i class="far fa-trash-alt"></i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "FhirTable",
  props: {  tableData: Array},
  emits: ['refresh'],
  methods: {
    async deleteDataset(id) {
      let url = `${process.env.VUE_APP_STATION_API}/datasets/`+ id.toString();
      await axios.delete(url);
      this.$emit('refresh');
    },
  }
}
</script>

<style scoped>

</style>