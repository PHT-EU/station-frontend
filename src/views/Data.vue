<template>

  <div class="container is-fluid">
    <div class="columns">
      <div class="column">
        <table class="table is-fullwidth is-hoverable ">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>created at</th>
              <th>storage type</th>
              <th>delete dataset</th>
            </tr>
           </thead>
          <tbody>
            <tr v-for="row in tableData" :key="row.id">
              <td>{{row.id}}</td>
              <td>{{ row.name }}</td>
              <td>{{ row.created_at }}</td>
              <td>{{ row.storage_type }}</td>
              <td>
                <button class="button is-danger is-outlined "  v-on:click="deleteDataset(row.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
          </table>
        <button class="button is-success is-outlined" v-on:click="addDataset()">
          <i class="far fa-plus-square"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Data",
  data() {
    return  {
      dataSets: [],
      tableData: [],
      newDataSet: {
        name: "fhir_test",
        data_type: "json",
        storage_type: "fhir",
        proposal_id: 42,
        access_path: "https://fhir.personalhealthtrain.de",
        n_items: 0,
        fhir_user: "fhiruser" ,
        fhir_password: "PhT-Fhir",
        fhir_server_type: "ibm"
      },
    }
  },
  methods:  {
    async addDataset(){
      let url = `${process.env.VUE_APP_STATION_API}/datasets`;

      await axios.post(url, this.newDataSet);
      await this.getDataSets();
    },
    async deleteDataset(id) {
      let url = `${process.env.VUE_APP_STATION_API}/datasets/`+ id.toString();
      await axios.delete(url);
      await this.getDataSets();
      console.log("delete");
    },
    async getDataSets() {
      let url = `${process.env.VUE_APP_STATION_API}/datasets`;
      axios.get(url).then(response => {
        this.dataSets = [];
        this.tableData= [];
        this.dataSets =  response.data;
        for (let dataSet in this.dataSets){
          let dataSetDict = {}
          dataSetDict.id = this.dataSets[dataSet].id;
          dataSetDict.name = this.dataSets[dataSet].name;
          dataSetDict.created_at = this.dataSets[dataSet].created_at;
          dataSetDict.storage_type = this.dataSets[dataSet].storage_type;
          this.tableData.push(dataSetDict);
        }
        console.log(this.tableData)


      })
    }

  },
  mounted() {
    this.getDataSets();
  }
}
</script>

<style scoped>

</style>
