import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {set} from "mobx";


export const registration = async (email, name, password) => {
    const {data} = await $host.post('api/author/registration', {email,  name, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/author/login', {email, password})
    localStorage.setItem('token', data.token)
    console.log(localStorage.getItem('token'))
    return jwt_decode(data.token)
}

export const update = async (data_up) =>{
    console.log(data_up)
    const token = localStorage.getItem('token')
    console.log(token)
    const {data} = await $host.put('api/author/', data_up, {headers: {
            'Authorization': `Bearer ${token}`
        }}) //$authHost
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/author/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
