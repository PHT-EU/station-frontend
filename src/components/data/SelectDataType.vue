<template>
  <div class="tabs is-centered is-medium">
    <ul>
      <li @click="selectTab('Fhir')" v-bind:class="{'is-active': selectedTab==='Fhir'}">
        <a>
          FHIR &nbsp;  <i class="fas fa-fire-alt"></i>
        </a>
      </li>
      <li @click="selectTab('CSV')" v-bind:class="{'is-active': selectedTab==='CSV'}">
        <a>
          CSV &nbsp;  <i class="fas fa-table"></i>
        </a>
      </li>
      <li @click="selectTab('MinIO')" v-bind:class="{'is-active': selectedTab==='MinIO'}">
        <a>
          MinIO &nbsp; <i class="fas fa-database"></i>
        </a>
      </li>
    </ul>
  </div>
  <div id="tab-content">
    <FhirTable v-if="selectedTab==='Fhir'" :tableData="FhirFilter" @refresh='refresh()'  ></FhirTable>
    <CSVTable v-if="selectedTab==='CSV'" :tableData="CSVFilter" @refresh='refresh()' ></CSVTable>
    <MinIOTable v-if="selectedTab==='MinIO'" :tableData="MinIOFilter" @refresh='refresh()' ></MinIOTable>
    <AddFhir v-if="selectedTab==='Fhir'" @refresh='refresh()'></AddFhir>
    <AddCSV v-if="selectedTab==='CSV'"  @refresh='refresh()'></AddCSV>
    <AddMinIO v-if="selectedTab==='MinIO'" @refresh='refresh()'></AddMinIO>
  </div>
</template>

<script>
import CSVTable from "@/components/data/CSVTable";
import AddCSV from "@/components/data/AddCSV";
import FhirTable from "@/components/data/FhirTable";
import AddFhir from "@/components/data/AddFhir";
import MinIOTable from "@/components/data/MinIOTable";
import AddMinIO from "@/components/data/AddMinIO";
export default {
  name: "SelectDataType",
  props: { tableData: Array},
  emits: ['refresh'],
  components: {CSVTable, FhirTable, MinIOTable, AddCSV, AddFhir, AddMinIO},
  data() {
    return {
      selectedTab: "Fhir",
    }
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    refresh(){
      this.$emit('refresh');
    },
  },
  computed: {
    CSVFilter: function(){
      return  this.tableData.filter(function(row) {
        return row.storage_type === 'csv';
      });
    },
    FhirFilter: function(){
      return  this.tableData.filter(function(row) {
        return row.storage_type === 'fhir';
      });
    },
    MinIOFilter: function(){
      return  this.tableData.filter(function(row) {
        return row.storage_type === 'minio';
      });
    },
  }
}
</script>

<style scoped>

</style>