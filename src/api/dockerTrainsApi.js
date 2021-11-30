import axios from 'axios';

export async function getDockerTrainConfigs() {
    const url = `${process.env.VUE_APP_STATION_API}/trains/docker/configs/all`;

    return axios.get(url).then((response) => response.data);
}

export async function updateDockerTrainConfig(config) {
    console.log(config);
    const url = `${process.env.VUE_APP_STATION_API}/trains/docker/config/${config.id}`;

    return axios.put(url, config).then((response) => response.data);
}

export async function createDockerTrainConfig(config) {
    console.log(JSON.stringify(config));
    const url = `${process.env.VUE_APP_STATION_API}/trains/docker/config`;

    return axios.post(url, config).then((response) => response.data).catch((reason) => console.log(reason));
}
