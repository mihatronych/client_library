import {makeAutoObservable} from "mobx";

export default class PublicationStore {
    constructor() {
        this._types = [
        ]
        this._themes = [
        ]
        this._regions = [
        ]
        this._publicators = [
        ]
        this._dialects = [
        ]
        this._authors = [
        ]
        this._publications = [
        ]
        makeAutoObservable(this)
    }

    setTypes(types){
        this._types = types
    }
    setThemes(themes){
        this._themes = themes
    }
    setRegions(regions){
        this._regions = regions
    }
    setPublicators(publicators){
        this._publicators = publicators
    }
    setDialects(dialects){
        this._dialects = dialects
    }
    setAuthors(authors){
        this._authors = authors
    }
    setPublications(publications){
        this._publications = publications
    }

    get types(){
        return this._types
    }
    get themes(){
        return this._themes
    }
    get regions(){
        return this._regions
    }
    get publicators(){
        return this._publicators
    }
    get dialects(){
        return this._dialects
    }
    get authors(){
        return this._authors
    }
    get publications(){
        return this._publications
    }
}