<template>
    <div
        id="Station"
        class="container is-fluid is-centered"
    >
        <div class="columns pt-4">
            <div class="column is-one-quarter">
                <AirflowStatus />
            </div>
            <div class="column is-one-quarter">
                <MinIOStatus />
            </div>
            <div class="column is-one-quarter">
                <FhirStatus />
            </div>
        </div>
        <div class="columns pt-4">
            <div class="column is-one-quarter">
                <HarborStatus />
            </div>
        </div>
    </div>
</template>

<script>
import FhirStatus from '@/components/station/FhirStatus';
import AirflowStatus from '@/components/station/AirflowStatus';
import HarborStatus from '@/components/station/HarborStatus';
import MinIOStatus from '@/components/station/MinIOStatus';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Station',
    components: {
        AirflowStatus, HarborStatus, MinIOStatus, FhirStatus,
    },

};
</script>

<style scoped>

</style>
