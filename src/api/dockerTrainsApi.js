import axios from 'axios';
import { env } from '@/env';

export async function getDockerTrainConfigs() {
    const url = `${env.API_ADDRESS}/trains/docker/configs/all`;

    return axios.get(url).then((response) => response.data);
}

export async function updateDockerTrainConfig(config) {
    console.log(config);
    const url = `${env.API_ADDRESS}/trains/docker/config/${config.id}`;

    return axios.put(url, config).then((response) => response.data);
}

export async function createDockerTrainConfig(config) {
    console.log(JSON.stringify(config));
    const url = `${env.API_ADDRESS}/trains/docker/config`;

    return axios.post(url, config).then((response) => response.data).catch((reason) => console.log(reason));
}
