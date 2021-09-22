import axios from "axios";

export async function getDockerTrainConfigs() {
    console.log("Accessing configs");
    let url = `${process.env.VUE_APP_STATION_API}/trains/docker/configs/`;

    return axios.get(url).then(response => {
            console.log("configs:", response);
            return response.data;
        }
    )

}
