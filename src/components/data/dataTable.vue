<template>
  <table class="table is-fullwidth is-hoverable ">
    <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>storage type</th>
      <th>created at</th>
      <th>access path</th>
      <th>proposal id</th>
      <th>items</th>
      <th>target field</th>
      <th>fhir user</th>
      <th>fhir password</th>
      <th>fhir server type</th>
      <th>Delete/Add</th>
    </tr>
    </thead>
    <tfoot>
    <tr>
      <th>id</th>
      <th><input class="input is-primary" type="text" placeholder="name"></th>
      <th><input class="input is-primary" type="text" placeholder="storage type"></th>
      <th>created at</th>
      <th><input class="input is-primary" type="text" placeholder="access path"></th>
      <th><input class="input is-primary" type="text" placeholder="proposal id"></th>
      <th>n_items</th>
      <th><input class="input is-primary" type="text" placeholder="target field"></th>
      <th><input class="input is-primary" type="text" placeholder="fhir user"></th>
      <th><input class="input is-primary" type="password" placeholder="fhir password"></th>
      <th><input class="input is-primary" type="text" placeholder="fhir server type"></th>
      <th>
        <button class="button is-success is-outlined" v-on:click="addDataset()">
          <i class="far fa-plus-square"></i>
        </button>
      </th>
    </tr>
    </tfoot>
    <tbody>
    <tr v-for="row in tableData" :key="row.id">
      <td>{{row.id}}</td>
      <td>{{ row.name }}</td>
      <td>{{ row.storage_type }}</td>
      <td>{{ row.created_at }}</td>
      <td>{{ row.access_path }}</td>
      <td>{{ row.proposal_id }}</td>
      <td>{{row.n_items}}</td>
      <td>{{row.target_field}}</td>
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

export default {
  name: "dataTable",
  props: {  tableData: Array},

}
</script>

<style scoped>
.hidetext { -webkit-text-security: disc; /* Default */ }
</style>
