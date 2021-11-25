<template>
    <div class="column is-hidden-desktop">
        <p class="menu-label is-hidden-desktop">
            Status Local Services
        </p>
        <ul class="menu-list is-hidden-desktop">
            <li>
                <AirflowStatus />
            </li>
            <li>
                <MinIOStatus />
            </li>
            <li>
                <FhirStatus />
            </li>
        </ul>
        <p class="menu-label is-hidden-desktop">
            Status Global Services
        </p>
        <ul class="menu-list is-hidden-desktop">
            <li>
                <HarborStatus />
            </li>
        </ul>
        <p class="menu-label is-hidden-desktop">
            Station Hardware Resources
        </p>
        <ul class="menu-list is-hidden-desktop">
            <li>
                <MemoryStatus />
            </li>
            <li>
                <CPUStatus />
            </li>
            <li>
                <DiskStatus />
            </li>
            <!--      <li>
        <DockerContainerStatus></DockerContainerStatus>
      </li>-->
        </ul>
    </div>
</template>

<script>
import FhirStatus from '@/components/station/FhirStatus';
import AirflowStatus from '@/components/station/AirflowStatus';
import HarborStatus from '@/components/station/HarborStatus';
import MinIOStatus from '@/components/station/MinIOStatus';
import MemoryStatus from '@/components/station/MemoryStatus';
import CPUStatus from '@/components/station/CPUStatus';
import DiskStatus from '@/components/station/DiskStatus';

export default {
    name: 'StatusMobile',
    components: {
        AirflowStatus, HarborStatus, MinIOStatus, FhirStatus, MemoryStatus, CPUStatus, DiskStatus,
    },

};
</script>

<style scoped>

</style>
