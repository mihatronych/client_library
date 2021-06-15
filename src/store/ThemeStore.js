import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._themes = [
        ]
        this._topics = [
        ]
        this._publications = []
        makeAutoObservable(this)
    }

    setThemes(themes){
        this._themes = themes
    }

    setTopics(topics){
        this._topics = topics
    }
    setPublications(publications){
        this._publications = publications
    }

    get themes(){
        return this._themes
    }

    get topics(){
        return this._topics
    }
    get publications(){
        return this._publications
    }
}