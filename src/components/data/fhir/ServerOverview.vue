<template>
    <div>
        Hello
    </div>
</template>

<script>
import { getFHIRServers } from '@/api/fhir';

export default {
    name: 'ServerOverview',
    setup(props) {
        console.log(props);
        const servers = getFHIRServers();
        return {
            servers,
        };
    },
};
</script>

<style scoped>

</style>
