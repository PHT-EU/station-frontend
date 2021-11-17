import axios from "axios";

export async function getDockerTrainConfigs() {
    let url = `${process.env.VUE_APP_STATION_API}/trains/docker/configs/all`;

    return axios.get(url).then(response => {
            return response.data;
        }
    )

}

export async function updateDockerTrainConfig(config) {
    console.log(config)
    let url = `${process.env.VUE_APP_STATION_API}/trains/docker/config/${config.id}`;

    return axios.put(url, config).then(response => {
            return response.data;
        }
    )
}

export async function createDockerTrainConfig(config) {
    console.log(config);
    console.log(JSON.stringify(config));
    let url = `${process.env.VUE_APP_STATION_API}/trains/docker/config`;

    return axios.post(url, config).then(response => {
            return response.data;
        }
    ).catch(reason => console.log(reason));
}
