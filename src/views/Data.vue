<template>

  <div class="container is-fluid">
    <div class="columns">
      <div class="column">
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
              <th><button class="button is-primary is-outlined "  v-on:click="getDataSets()">
                <i class="fas fa-sync-alt"></i>
              </button></th>
            </tr>
           </thead>
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
      </div>
    </div>
    <div class="column">
      <div class="columns">
        <PopUpForm></PopUpForm>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import PopUpForm from '@/components/data/PopUpForm';

export default {
  name: "Data",
  components:{PopUpForm},
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
          dataSetDict.data_type = this.dataSets[dataSet].data_type;
          dataSetDict.proposal_id = this.dataSets[dataSet].proposal_id;
          dataSetDict.access_path = this.dataSets[dataSet].access_path;
          dataSetDict.n_items = this.dataSets[dataSet].n_items;
          dataSetDict.target_field = this.dataSets[dataSet].target_field;
          dataSetDict.fhir_user = this.dataSets[dataSet].fhir_user;
          dataSetDict.fhir_password = this.dataSets[dataSet].fhir_password;
          dataSetDict.fhir_server_type = this.dataSets[dataSet].fhir_server_type;
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
.hidetext { -webkit-text-security: disc; /* Default */ }
</style>
