import React, {useContext, useEffect} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import {Context} from "../index";
import {fetchPublication} from "../http/library_api";
import {fetchTheme, fetchTopic} from "../http/theme_topic_api";
import {observer} from "mobx-react-lite";
import {PUBLICATION_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";

const Themes = observer(() => {
    const {theme, superFilter} = useContext(Context)
    const history = useHistory()
    useEffect(() => {
        fetchPublication().then(data => theme.setPublications(data))
        fetchTheme().then(data => theme.setThemes(data))
        fetchTopic().then(data => theme.setTopics(data))
    }, [theme])

    const countBooksOfTheme = (themeId) => {
        return theme.publications.filter((data) => {if (data.themeId === parseInt(themeId)) return data}).length
    }

    const getFilteredBooks = async(themeId) => {
        superFilter.setFilter(theme.themes.find(a => a.id === themeId))
        superFilter.setFiltered(theme.publications.filter((data) => {if (data.themeId === parseInt(themeId)) return data}))
        return history.push(PUBLICATION_ROUTE)
    }

    const displayTable = theme.themes.map(themez => {
        return <div className="d-flex justify-content-between container mt-3" style={
            { backgroundColor:'#3366CC', color:"white"}
        }>
            <p className="m-auto">{themez.name}</p>
            <p className="m-auto">подтемы:
                {theme.topics.filter((data) => {if (data.themeId === themez.id) return  data})
                    .map(topic =>
                        <i className="m-1">{topic.subject}</i>
                    )}
            </p>
            <p className="m-auto">Публикаций: {countBooksOfTheme(themez.id)}</p>
            <Button onClick={() => getFilteredBooks(themez.id)} variant={"outline-light"}>К публикациям</Button>
        </div>
    })

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - 54}}
        >
            <Card style={{width: window.innerWidth - 100, backgroundColor:'#C06C84', color:'white'}} className="p-5">
                <h2 className="align-self-center"> Темы</h2>
                <div>
                    {displayTable}
                </div>

            </Card>
        </Container>
    );
});

export default Themes;