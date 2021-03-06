import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "../index";
import {
    deletePublication,
    fetchAuthor,
    fetchOnePublication,
    fetchPublication,
    fetchPublicator,
    fetchRegion,
    fetchType
} from "../http/library_api";
import {fetchTheme, fetchTopic} from "../http/theme_topic_api";
import {fetchMark} from "../http/mark_api";
import {fetchDialect} from "../http/lang_api";
import {observer} from "mobx-react-lite";
import {MAIN_ROUTE, MARKS_ROUTE, PUBLICATION_ROUTE} from "../utils/consts";

const Publication = observer(() => {
    const {publication, mark, theme, language, publictn} = useContext(Context)
    const [publicn, setPublicn] = useState({info: []})
    const {id} = useParams()
    const history = useHistory()
    useEffect(() => {
        fetchOnePublication(id).then(data => setPublicn(data))
        fetchOnePublication(id).then(data => publictn.setPublication(data))
        fetchPublication().then(data => theme.setPublications(data))
        fetchTheme().then(data => theme.setThemes(data))
        fetchTopic().then(data => theme.setTopics(data))
        fetchAuthor().then(data => publication.setAuthors(data))
        fetchPublication().then(data => publication.setPublications(data))
        fetchMark().then(data => mark.setMarks(data))
        fetchType().then(data => publication.setTypes(data))
        fetchRegion().then(data => publication.setRegions(data))
        fetchDialect().then(data => publication.setDialects(data))
        fetchTheme().then(data => publication.setThemes(data))
        fetchPublicator().then(data => publication.setPublicators(data))
        }, [id, mark, publictn, theme, publication])
    console.log(publicn)
    ////////// Сетить штуки через setState!!!!!!!!!

    const meanMark = (publicationId) =>{
        let sum = 0
        let count = 0
        mark.marks.map(items => {
            if (parseInt(publicationId) === items.publicationId)
            {
                count += 1
                sum += parseInt(items.rate)
            }
        return null
        })
        if (count === 0){ count = 1 }
        return <i>{(sum/(count)).toFixed(2)}</i>
    }

    const Delete = (id) => {
        deletePublication(id).then()
        alert("Запись удалена")
        fetchPublication().then(data => publication.setPublications(data))
        history.push(MAIN_ROUTE)
    }

    const DisplayData = () => {
        return <div>
        <h3 className="align-self-center"> Публикация {publictn.publication.title}</h3>
        <div className="d-flex justify-content-between container">

        </div>
        <Row>
            <Col>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Автор {publication.authors.map(items => {
                        if (items.id === parseInt(publictn.publication.authorId))
                            return <i className="m-auto"> {items.name}</i>
                        return null
                    })}</p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Рейтинг {meanMark(publictn.publication.id)}</p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Тип {publication.types.map(items => {
                        if (items.id === parseInt(publictn.publication.typeId))
                            return <i>{items.name} </i>
                        return null
                    })
                    }</p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Длина {publictn.publication.pages}</p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Издательство {publication.publicators.map(items => {
                        if (items.id === parseInt(publictn.publication.publicatorId))
                            return <i>{items.name} </i>
                        return null
                    })}</p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Язык публикации - {language.dialects.map(dialect => {
                            if (dialect.id === parseInt(publictn.publication.dialectId))
                                return <i>
                                    {dialect.name} : {language.languages.map(language => {
                                        if (language.id === dialect.languageId) return <i>{language.name}</i>
                                    return null
                                    }
                                )}
                                </i>
                        return null
                    }
                    )}
                    </p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Тема публикации - {theme.themes.map(themez => {
                            if (themez.id === parseInt(publictn.publication.themeId))
                                return <i>
                                    {themez.name} : {theme.topics.map(topic => {
                                        if (themez.id === topic.themeId) return <i>{topic.subject}; </i>
                                    return null
                                    }
                                )}
                                </i>
                        return null}
                    )}
                    </p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Регион {publication.regions.map(items => {
                        if (items.id === parseInt(publictn.publication.regionId))
                            return <i>{items.name} </i>
                    return null
                    })}</p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Аннотация {publictn.publication.short_review}</p>
                </div>
            </Col>
            <Col className="text-sm-right">
                <div className="">
                    <p className="small-text"> Другие публикации автора:</p>
                    {publication.publications.filter((data)=> {if (data.authorId === publictn.publication.authorId
                        && data.id !== publictn.publication.id) return data
                    return null}).map(data =>{
                        return <p><a href={PUBLICATION_ROUTE+"/"+data.id} target="_blank" rel="noreferrer" style={{color:"white"}}>{data.title}</a></p>}
                    )}
                </div>
            </Col>
        </Row>
        <a id={"publication_read_"+publictn.id} href={process.env.REACT_APP_API_URL + publictn.publication.file} target="_blank" rel="noreferrer"
           className="d-flex justify-content-center" style={{color:"white"}} download>Открыть для чтения</a>
        <a id={"publication_marks_"+publictn.id} href={MARKS_ROUTE + '/'+ publictn.publication.id} style={{color:"white"}} className="d-flex justify-content-center">Отзывы</a>
            </div>
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - window.innerHeight*0.2, zIndex:"-1"}}
        >
            {useEffect(() => {
                fetchPublication().then(data => publication.setPublications(data))
                fetchOnePublication(id).then(data => publictn.setPublication(data))
                fetchOnePublication(id).then(data => setPublicn(data))}, [id, publication, publictn])}
            <Card style={{width: window.innerWidth - 100}} className="p-5 card">
                {DisplayData()}
                <div className="d-inline-flex justify-content-center  mt-3 ">
                <Button
                href={"/update_publication/"+id}
            >
                Редактировать публикацию
            </Button>
                </div>
                <div className="d-inline-flex justify-content-center  mt-3 ">
                    <Button
                    onClick={()=>Delete(id)}
                >
                    Удалить публикацию
                </Button>
                    </div>
            </Card>
        </Container>
    );
});

export default Publication;
