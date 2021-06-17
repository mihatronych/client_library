import React, {useContext, useEffect} from 'react';
import '../styles.css';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchAuthor, fetchPublication, fetchRegion, fetchType} from "../http/library_api";
import {useHistory} from "react-router-dom";


const Search = observer(({ searchQuery, setSearchQuery }) => {
    const history = useHistory();
    const onSubmit = e => {
        history.push(`?s=${searchQuery}`)
        e.preventDefault()
    };

    return <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
            <input
                value={searchQuery}
                onInput={e => setSearchQuery(e.target.value)}
                onChange={e => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Поиск публикаций &#128269;"
                name="s"
            />
        </form>
});

export default Search;