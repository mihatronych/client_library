import {$authHost, $host} from "./index";

export const fetchTheme = async () => {
    const {data} = await $host.get('api/Theme/')
    return data
}

export const fetchTopic = async () => {
    const {data} = await $host.get('api/Topic/')
    return data
}