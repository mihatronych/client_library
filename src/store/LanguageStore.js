import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._languages = [

        ]
        this._dialects = [
        ]
        makeAutoObservable(this)
    }

    setDialects(dialects){
        this._dialects = dialects
    }

    setLanguages(languages){
        this._languages = languages
    }

    get dialects(){
        return this._dialects
    }

    get languages(){
        return this._languages
    }
}