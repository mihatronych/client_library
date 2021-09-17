import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Card, Container, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {
    fetchAuthor,
    fetchOnePublication,
    fetchPublication,
    fetchRegion,
    fetchType,
    updatePublication
} from "../http/library_api";
import {fetchDialect} from "../http/lang_api";
import {fetchTheme} from "../http/theme_topic_api";
import {observer} from "mobx-react-lite";
import {PUBLICATION_ROUTE} from "../utils/consts";
import {useHistory, useParams} from "react-router-dom";


const UpdatePublication = observer(() => {
    const {publication, publictn} = useContext(Context)
    const [publicn, setPublicn] = useState({info: []})
    const {id} = useParams()
    const history = useHistory()
    useEffect(() => {
        fetchOnePublication(id).then(data => setPublicn(data))
        fetchAuthor().then(data => publication.setAuthors(data))
        fetchPublication().then(data => publication.setPublications(data))
        fetchType().then(data => publication.setTypes(data))
        fetchRegion().then(data => publication.setRegions(data))
        fetchDialect().then(data => publication.setDialects(data))
        fetchTheme().then(data => publication.setThemes(data))
        fetchOnePublication(id).then(data => setTitle(data.title))
        fetchOnePublication(id).then(data => setShort_review(data.short_review))
        fetchOnePublication(id).then(data => setPages(data.pages))

        fetchOnePublication(id).then(data => setAuthorId(data.authorId))
        fetchOnePublication(id).then(data => setThemeId(data.themeId))
        fetchOnePublication(id).then(data => setDialectId(data.dialectId))
        fetchOnePublication(id).then(data => setRegionId(data.regionId))
        fetchOnePublication(id).then(data => setPublicatorId(data.publicatorId))
        fetchOnePublication(id).then(data => setTypeId(data.typeId))
    }, [publication, id])
    const [title, setTitle] = useState(publicn.title)
    const [short_review, setShort_review] = useState(publicn.short_review)
    const [pages, setPages] = useState(publicn.pages)
    const [author_id, setAuthorId] = useState(publicn.authorId) //Здесь название другое
    const [themeId, setThemeId] = useState(publicn.themeId)
    const [dialectId, setDialectId] = useState(publicn.dialectId)
    const [regionId, setRegionId] = useState(publicn.regionId)
    const [publicatorId, setPublicatorId] = useState(publicn.publicatorId)
    const [typeId, setTypeId] = useState(publicn.typeId)
    const [date_publ] = useState(publicn.date_publ)
    const [date_create] = useState(publicn.date_create)
    const [file] = useState('')
    const Update = () => {
        try {
            updatePublication({id: publicn.id,title: title, short_review: short_review, pages: pages,
                authorId: author_id, themeId: themeId, typeId: typeId, regionId:regionId, date_publ: date_publ,
                date_create:date_create, dialectId:dialectId, publicatorId: publicatorId, file: file
            }).then()
            fetchPublication().then(data => publication.setPublications(data))
            fetchOnePublication(id).then(data => publictn.setPublication(data))
            alert("Данные обновлены");
            history.push(PUBLICATION_ROUTE)
        } catch (e) {
            return alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-4"
            style={{height:window.innerHeight - window.innerHeight*0.2}}
        >
            <Card style={{width: 600, backgroundColor:'#C06C84', color:'white'}} className="p-5 mt-4">
                <h2 className="m-auto">Изменить публикацию {publicn.title}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите название книги..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Row>
                        <Form.Group className="ml-3 mr-2">
                            <Form.Label>Выберите автора</Form.Label>
                            <Form.Control as="select"
                                          value={author_id}
                                          onChange={e => setAuthorId(e.target.value)}
                            >
                                {publication.authors.map(author =>
                                {if (author.id === publicn.authorId) return <option defaultChecked value={author.id}>{author.name}</option>
                                return null}
                                )}
                                {publication.authors.map(author =>
                                    {if (author.id !== publicn.authorId) return <option value={author.id}>{author.name}</option>
                                        return null}
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="ml-2 mr-2">
                            <Form.Label>Выберите тему</Form.Label>
                            <Form.Control as="select"
                                          value={themeId}
                                          onChange={e => setThemeId(e.target.value)}>
                                {publication.themes.map(theme =>
                                    {if (theme.id === publicn.themeId) return <option defaultChecked value={theme.id}>{theme.name}</option>
                                        return null}
                                )}
                                {publication.themes.map(theme =>
                                    {if (theme.id !== publicn.themeId) return <option value={theme.id}>{theme.name}</option>
                                        return null}
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="ml-2">
                            <Form.Label>Выберите тип</Form.Label>
                            <Form.Control as="select"
                                          value={typeId}
                                          onChange={e => setTypeId(e.target.value)}>
                                {publication.types.map(typez =>
                                    {if (typez.id === publicn.typeId) return <option defaultChecked value={typez.id}>{typez.name}</option>
                                        return null}
                                )}
                                {publication.types.map(typez =>
                                    {if (typez.id !== publicn.typeId) return <option value={typez.id}>{typez.name}</option>
                                        return null}
                                )}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Form.Group>
                        <Form.Label>Введите краткое описание</Form.Label>
                        <Form.Control as="textarea"
                                      value={short_review}
                                      onChange={e => setShort_review(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите длину публикации</Form.Label>
                        <input type="number" className="form-control" min='1'
                               value={pages}
                               onChange={e => setPages(e.target.value)}/>
                    </Form.Group>
                    <Row>
                        <Form.Group className="ml-3 mr-2">
                            <Form.Label>Выберите издательство</Form.Label>
                            <Form.Control as="select"
                                          value={publicatorId}
                                          onChange={e => setPublicatorId(e.target.value)}>
                                {publication.publicators.map(publ =>
                                    {if (publ.id === publicn.publicatorId) return <option defaultChecked value={publ.id}>{publ.name}</option>
                                        return null}
                                )}
                                {publication.publicators.map(publ =>
                                    {if (publ.id !== publicn.publicatorId) return <option value={publ.id}>{publ.name}</option>
                                        return null}
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="ml-2 mr-2">
                            <Form.Label>Выберите язык</Form.Label>
                            <Form.Control as="select"
                                          value={dialectId}
                                          onChange={e => setDialectId(e.target.value)}>
                                {publication.dialects.map(dialect =>
                                    {if (dialect.id === publicn.dialectId) return <option defaultChecked value={dialect.id}>{dialect.name}</option>
                                        return null}
                                )}
                                {publication.dialects.map(dialect =>
                                    {if (dialect.id !== publicn.dialectId) return <option value={dialect.id}>{dialect.name}</option>
                                        return null}
                                )}

                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="ml-2">
                            <Form.Label>Выберите регион</Form.Label>
                            <Form.Control as="select"
                                          value={regionId}
                                          onChange={e => setRegionId(e.target.value)}>
                                {publication.regions.map(region =>
                                    {if (region.id === publicn.regionId) return <option defaultChecked value={region.id}>{region.name}</option>
                                        return null}
                                )}
                                {publication.regions.map(region =>
                                    {if (region.id !== publicn.regionId) return <option value={region.id}>{region.name}</option>
                                        return null}
                                )}
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    <Button
                        className="d-flex mt-3 justify-content-center"
                        variant={"dark"}
                        style={{backgroundColor:"#6C5B7B"}}
                        onClick={Update}
                    >
                        Изменить
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default UpdatePublication;