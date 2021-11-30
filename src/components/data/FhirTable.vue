<template>
    <table class="table is-fullwidth is-hoverable ">
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>created at</th>
                <th>Server url</th>
                <th>proposal id</th>
                <th>items</th>
                <th>user</th>
                <th>password</th>
                <th>server type</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="row in tableData"
                :key="row.id"
            >
                <td>{{ row.id }}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.createdAt }}</td>
                <td>{{ row.accessPath }}</td>
                <td>{{ row.proposalId }}</td>
                <td>{{ row.nItems }}</td>
                <td>{{ row.fhirUser }}</td>
                <td class="hidetext">
                    {{ row.fhirPassword }}
                </td>
                <td>{{ row.fhirServerType }}</td>
                <td>
                    <button
                        class="button is-danger is-outlined "
                        @click="deleteDataset(row.id)"
                    >
                        <i class="far fa-trash-alt" />
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FhirTable',
    props: { tableData: Array },
    emits: ['refresh'],
    methods: {
        async deleteDataset(id) {
            const url = `${process.env.VUE_APP_STATION_API}/datasets/${id.toString()}`;
            await axios.delete(url);
            this.$emit('refresh');
        },
    },
};
</script>

<style scoped>
.hidetext { -webkit-text-security: disc; /* Default */ }
</style>
