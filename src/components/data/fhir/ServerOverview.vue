<script>
import {
    addFHIRServer, deleteFHIRServer, getFHIRServerSummary, getFHIRServers,
} from '@/api/fhir';

export default {
    name: 'ServerOverview',
    setup(props) {
        console.log(props);
        const servers = getFHIRServers();
        return {
            servers,
            addFHIRServer,
            deleteFHIRServer,
            getFHIRServerSummary,
            getFHIRServers,
        };
    },
};
</script>

<template>
    <table class="table is-fullwidth is-hoverable ">
        <thead>
            <tr>
                <th>Name</th>
                <th>Created</th>
                <th>Proposal</th>
                <th>API Url</th>
                <th>Type</th>
                <th>user</th>
                <th>password</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="server in servers"
                :key="server.id"
            >
                <td>{{ server.name }}</td>
                <td>{{ server.created_at }}</td>
                <td>{{ server.api_url }}</td>
                <td>{{ server.proposal_id }}</td>
                <td>{{ server.type }}</td>
                <td>{{ server.username }}</td>
                <td class="hidetext">
                    {{ server.password }}
                </td>
                <td>
                    <button
                        class="button is-danger is-outlined "
                        @click="deleteFHIRServer(server.id)"
                    >
                        <i class="far fa-trash-alt" />
                    </button>
                    <button
                        class="button is-primary is-outlined "
                        @click="getFHIRServerSummary(server.id)"
                    >
                        <i class="fas fa-eye" />
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>
