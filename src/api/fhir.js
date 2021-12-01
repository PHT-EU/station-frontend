import axios from 'axios';
import { env } from '@/env';

export async function getFHIRServers() {
    const url = `${env.API_ADDRESS}/fhir/servers`;
    return axios.get(url).then((response) => response.data);
}

export async function addFHIRServer(serverData) {
    const url = `${env.API_ADDRESS}/fhir/server`;
    return axios.post(url, serverData).then((response) => response.data);
}

export async function updateFHIRServer(serverId, serverData) {
    const url = `${env.API_ADDRESS}/fhir/server/${serverId}`;
    return axios.put(url, serverData).then((response) => response.data);
}

export async function deleteFHIRServer(serverId) {
    const url = `${env.API_ADDRESS}/fhir/server/${serverId}`;
    return axios.delete(url).then((response) => response.data);
}

export async function getFHIRServerSummary(serverId) {
    const url = `${env.API_ADDRESS}/fhir/server/${serverId}/summary`;
    return axios.get(url).then((response) => response.data);
}
