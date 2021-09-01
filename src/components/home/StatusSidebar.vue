<template>
  <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
    <p class="menu-label is-hidden-touch">Status Local Services</p>
    <ul class="menu-list">
      <li>
        <AirflowStatus></AirflowStatus>
      </li>
      <li>
        <MinIOStatus></MinIOStatus>
      </li>
      <li>
        <FhirStatus></FhirStatus>
      </li>
    </ul>
    <p class="menu-label is-hidden-touch">Status Global Services</p>
    <ul class="menu-list">
        <li>
          <HarborStatus></HarborStatus>
        </li>
    </ul>
    <p class="menu-label is-hidden-touch">Station Hardware Resources </p>
    <ul class="menu-list">
      <li>
        <MemoryStatus></MemoryStatus>
      </li>
      <li>
        <CPUStatus></CPUStatus>
      </li>
      <li>
        <DiskStatus></DiskStatus>
      </li>
    </ul>
  </aside>
</template>

<script>
import FhirStatus from '@/components/station/FhirStatus';
import AirflowStatus from '@/components/station/AirflowStatus';
import HarborStatus from '@/components/station/HarborStatus';
import MinIOStatus from "@/components/station/MinIOStatus";
import MemoryStatus from "@/components/station/MemoryStatus";
import CPUStatus from "@/components/station/CPUStatus";
import DiskStatus from "@/components/station/DiskStatus";
export default {
  name: "StatusSidebar",
  components: {AirflowStatus, HarborStatus, MinIOStatus, FhirStatus, MemoryStatus, CPUStatus, DiskStatus
  },

}
</script>

<style scoped>

</style>