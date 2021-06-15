import {$authHost, $host} from "./index";

export const fetchLanguage = async () => {
    const {data} = await $host.get('api/language/')
    return data
}

export const fetchDialect = async () => {
    const {data} = await $host.get('api/dialect/')
    return data
}