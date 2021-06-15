import {$authHost, $host} from "./index";

export const fetchAuthor = async () => {
    const {data} = await $host.get('api/author/')
    console.log(data)
    return data
}
export const createPublication = async (publication) => {
    let publ = new FormData()
    publ.append("title", publication.title)
    publ.append("short_review", publication.short_review)
    publ.append('pages', publication.pages)
    publ.append('authorId', publication.authorId)
    publ.append('themeId', publication.themeId)
    publ.append('typeId', publication.typeId)
    publ.append('regionId', publication.regionId)
    publ.append('date_publ', publication.date_publ)
    publ.append('date_create',publication.date_create)
    publ.append('dialectId', publication.dialectId)
    publ.append('publicatorId', publication.publicatorId)
    publ.append('file', publication.file)
    const {data} = await $authHost.post('api/publication/', publ,
        {headers:{'Content-Type':"multipart/form-data"}})
    console.log(data)
    return data
}

export const updatePublication = async (publication) => {
    const {data} = await $authHost.put('api/publication/'+publication.id, publication)
    console.log(data)
    return data
}

export const deletePublication = async (id) => {
    const {data} = await $authHost.delete('api/publication/' + id)
    console.log(data)
    return data
}

export const fetchPublication = async () => {
    const {data} = await $host.get('api/publication/')
    return data
}

export const fetchPublicator = async () => {
    const {data} = await $host.get('api/Publicator/')
    return data
}

export const fetchOnePublication = async (id) => {
    const {data} = await $host.get('api/publication/' + id)
    return data
}

export  const fetchRegion = async () => {
    const {data} = await $host.get('api/Region/')
    return data
}

export const fetchType = async () => {
    const {data} = await $host.get('api/type/')
    console.log(data)
    return data
}