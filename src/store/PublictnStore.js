import {makeAutoObservable} from "mobx";

export default class PublicatnStore {
    constructor() {
        this._publication = [
        ]
        makeAutoObservable(this)
    }

    setPublication(publication){
        this._publication = publication
    }

    get publication(){
        return this._publication
    }
}