import React, {useContext, useEffect, useState} from 'react';
import  {Row,Button, Card, Col, Container} from "react-bootstrap";
import {Link, useParams, useHistory} from "react-router-dom";
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
import DropdownItem from "react-bootstrap/DropdownItem";
import {observer} from "mobx-react-lite";
import {LOGIN_ROUTE, MAIN_ROUTE, MARKS_ROUTE, PUBLICATION_ROUTE} from "../utils/consts";

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
        }, [])
    console.log(publicn)
    ////////// Сетить штуки через setState!!!!!!!!!
    const meanMark = (publicationId) =>{
        let count = 0
        let sum = 0
        mark.marks.map(items => {
            if (items.publicationId === parseInt(publicationId))
            {
                count += 1
                sum += parseInt(items.rate)
            }
        })
        if (count === 0){
            count = 1
        }
        return <i>{sum/(count)}</i>
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
                    })}</p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Рейтинг {meanMark(publictn.publication.id)}</p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Тип {publication.types.map(items => {
                        if (items.id === parseInt(publictn.publication.typeId))
                            return <i>{items.name} </i>
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
                    })}</p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Язык публикации - {language.dialects.map(dialect => {
                            if (dialect.id === parseInt(publictn.publication.dialectId))
                                return <i>
                                    {dialect.name} : {language.languages.map(language => {
                                        if (language.id === dialect.languageId) return <i>{language.name}</i>
                                    }
                                )}
                                </i>
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
                                    }
                                )}
                                </i>
                        }
                    )}
                    </p>
                </div>
                <div className="d-flex justify-content-between container">
                    <p className="small-text"> Регион {publication.regions.map(items => {
                        if (items.id === parseInt(publictn.publication.regionId))
                            return <i>{items.name} </i>
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
                        && data.id !== publictn.publication.id) return data}).map(data =>
                        <p><a href={PUBLICATION_ROUTE+"/"+data.id} target="_blank" style={{color:"white"}}>{data.title}</a></p>
                    )}
                </div>
            </Col>
        </Row>
        <a href={process.env.REACT_APP_API_URL + publictn.publication.file} target="_blank"
           className="d-flex justify-content-center" style={{color:"white"}} download>Открыть для чтения</a>
        <a href={MARKS_ROUTE + '/'+ publictn.publication.id} style={{color:"white"}} className="d-flex justify-content-center">Отзывы</a>
            </div>
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - 54, zIndex:"-1"}}
        >
            {useEffect(() => {
                fetchPublication().then(data => publication.setPublications(data))
                fetchOnePublication(id).then(data => publictn.setPublication(data))
                fetchOnePublication(id).then(data => setPublicn(data))}, [])}
            <Card style={{width: window.innerWidth - 100, backgroundColor:'#C06C84', color:'white'}} className="p-5">
                {DisplayData()}
                <div className="d-inline-flex justify-content-center  mt-3 ">
                <Button
                variant={"dark"}
                style={{backgroundColor:"#6C5B7B", textAlign:"center"}}
                href={"/update_publication/"+id}
            >
                Редактировать публикацию
            </Button>
                </div>
                <div className="d-inline-flex justify-content-center  mt-3 ">
                    <Button
                    variant={"dark"}
                    style={{backgroundColor:"#6C5B7B", textAlign:"center"}}
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