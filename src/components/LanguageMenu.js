import React, {useContext, useEffect} from 'react';
import {DropdownButton, Nav} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import { fetchPublication} from "../http/library_api";
import {fetchDialect, fetchLanguage} from "../http/lang_api";
import {PUBLICATION_ROUTE} from "../utils/consts";

const LanguageMenu = observer(() => {
    const {publication, language, superFilter} = useContext(Context)
    const history = useHistory()
    useEffect(() => {
        fetchDialect().then(data => language.setDialects(data))
        fetchLanguage().then(data => language.setLanguages(data))
        fetchPublication().then(data => publication.setPublications(data))
    }, [language, publication])

    const getFilteredBooks = async(dialectId) => {
        superFilter.setFilter(language.dialects.find(a => a.id === dialectId))
        superFilter.setFiltered(publication.publications.filter((data) => {if (data.dialectId === parseInt(dialectId)) return data
            return null}))
        return history.push(PUBLICATION_ROUTE)
    }

    return (
        <Nav className="ml-auto" style={{color: 'white'}}>
            <DropdownButton id={"language_menu_dialect"} title="Язык" className="ml-2" variant={"outline-light"} style={{zIndex:100}}>
                {language.dialects.map(dialect =>
                    <DropdownItem id={"language_menu_dialect_"+dialect.id} onClick={() => getFilteredBooks(dialect.id)}>
                        {dialect.name} : {language.languages.map(language =>
                    {if (language.id === dialect.languageId) return <i>{language.name}</i>
                        return null}
                    )}
                    </DropdownItem>
                )}
            </DropdownButton>
        </Nav>
    );
});

export default LanguageMenu;