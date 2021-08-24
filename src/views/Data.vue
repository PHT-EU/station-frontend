<template>

  <div class="container is-fluid">
    <div class="columns">
      <div class="column">
        <SelectDataType :tableData="tableData" @refresh="getDataSets()"></SelectDataType>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

import SelectDataType from "@/components/data/SelectDataType";
export default {
  name: "Data",
  components:{SelectDataType },
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

</style>
