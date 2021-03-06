import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Card, Container, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {createPublication, fetchAuthor, fetchPublication, fetchRegion, fetchType} from "../http/library_api";
import {fetchDialect} from "../http/lang_api";
import {fetchTheme} from "../http/theme_topic_api";
import {observer} from "mobx-react-lite";
import {MAIN_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";


const AddPublication = observer(() => {
    const {publication} = useContext(Context)
    const history = useHistory()
    useEffect(() => {
        fetchAuthor().then(data => publication.setAuthors(data))
        fetchPublication().then(data => publication.setPublications(data))
        fetchType().then(data => publication.setTypes(data))
        fetchRegion().then(data => publication.setRegions(data))
        fetchDialect().then(data => publication.setDialects(data))
        fetchTheme().then(data => publication.setThemes(data))
    }, [publication])

    const [title, setTitle] = useState('')
    const [short_review, setShort_review] = useState('')
    const [pages, setPages] = useState('')
    const [author_id, setAuthorId] = useState('') //Здесь название другое
    const [themeId, setThemeId] = useState('')
    const [dialectId, setDialectId] = useState('')
    const [regionId, setRegionId] = useState('')
    const [publicatorId, setPublicatorId] = useState('')
    const [typeId, setTypeId] = useState('')
    const [date_publ] = useState(new Date().toISOString())
    const [date_create] = useState(new Date().toISOString())
    const [file, setFile] = useState('')

    const Create = () => {
        if(title === undefined || title === "")
            return alert("Не введено название")
        if(short_review === undefined || short_review ==="")
            return alert("Не введено краткое описание")
        if(pages === undefined || pages === "" || pages < 1)
            return alert("Не выбрано количество страниц, или страницы ввдены некорректно")
        if(author_id === undefined ||author_id === "")
            return alert("Не выбран автор")
        if(themeId === undefined ||themeId ===  "")
            return alert("Не выбрана тема")
        if(typeId === undefined || typeId === "")
            return alert("Не выбран тип ")
        if(regionId === undefined ||regionId === "")
            return alert("Не выбран регион")
        if(date_publ === undefined || date_publ === "")
            return alert("Неправильно введена дата публикации")
        if(date_create === undefined || date_create ==="")
            return alert("Неправильно введена дата создания")
        if(dialectId === undefined ||dialectId === "")
            return alert("Не выбран язык публикации")
        if(publicatorId === undefined || publicatorId === "")
            return alert("Не выбран издатель")
        if(document.getElementById('ze_best_file').files.length === 0)
            return alert("Не выбран файл")
        try {

            const fl = document.getElementById('ze_best_file').files[0]
        createPublication({title: title, short_review: short_review, pages: pages,
        authorId: author_id, themeId: themeId, typeId: typeId, regionId:regionId, date_publ: date_publ,
            date_create:date_create, dialectId:dialectId, publicatorId: publicatorId, file: fl
        }).then()
            fetchPublication(data => publication.setPublications(data)).then()
            alert("Данные добавлены");
            history.push(MAIN_ROUTE)
        } catch (e) {
            return alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-4"
            style={{}}
        >
            <Card style={{width: 600}} className="p-5 mt-4 card">
                <h2 className="m-auto">Новая публикация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        id='book_name_place'
                        placeholder="Введите название книги..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Row>
                    <Form.Group className="ml-3 mr-4">
                        <Form.Label>Выберите автора</Form.Label>
                        <Form.Control as="select"
                                      id='book_author_name_place'
                                      value={author_id}
                                      onChange={e => setAuthorId(e.target.value)}
                        >
                            <option defaultChecked id="book_author_default">----</option>
                            {publication.authors.map(author =>
                                <option id={"book_author_"+author.id} value={author.id}>{author.name}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="ml-3 mr-4">
                        <Form.Label>Выберите тему</Form.Label>
                        <Form.Control as="select"
                                      value={themeId}
                                      id='book_theme_name_place'
                                      onChange={e => setThemeId(e.target.value)}>
                            <option defaultChecked id="book_theme_default">----</option>
                            {publication.themes.map(theme =>
                                <option id={"book_theme_"+theme.id} value={theme.id}>{theme.name}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="ml-3">
                        <Form.Label>Выберите тип</Form.Label>
                        <Form.Control as="select"
                                      id='book_type_name_place'
                                      value={typeId}
                                      onChange={e => setTypeId(e.target.value)}>
                            <option defaultChecked id="book_type_default">----</option>
                            {publication.types.map(type =>
                                <option id={"book_type_"+type.id} value={type.id}>{type.name}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    </Row>
                    <Form.Group>
                        <Form.Label>Введите краткое описание</Form.Label>
                        <Form.Control as="textarea"
                                      id='book_short_review_place'
                                      value={short_review}
                                      onChange={e => setShort_review(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите длину публикации</Form.Label>
                        <input type="number" className="form-control" min='1'
                               id='book_publication_length_place'
                               value={pages}
                               onChange={e => setPages(e.target.value)}/>
                    </Form.Group>
                    <Row>
                    <Form.Group className="ml-3 mr-4">
                        <Form.Label>Выберите издательство</Form.Label>
                        <Form.Control as="select"
                                      id='book_publicator_place'
                                      value={publicatorId}
                                      onChange={e => setPublicatorId(e.target.value)}>
                            <option defaultChecked id="book_type_default">----</option>
                            {publication.publicators.map(publ =>
                                <option id={"book_publicator_"+publ.id} value={publ.id}>{publ.name}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="ml-3 mr-4">
                        <Form.Label>Выберите язык</Form.Label>
                        <Form.Control as="select"
                                      id='book_language_place'
                                      value={dialectId}
                                      onChange={e => setDialectId(e.target.value)}>
                            <option defaultChecked id="book_language_default">----</option>
                            {publication.dialects.map(dialect =>
                                <option id={"book_language_"+dialect.id} value={dialect.id}>{dialect.name}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="ml-3">
                        <Form.Label>Выберите регион</Form.Label>
                        <Form.Control as="select"
                                      id='book_region_place'
                            value={regionId}
                                      onChange={e => setRegionId(e.target.value)}>
                            <option defaultChecked id="book_region_default">----</option>
                            {publication.regions.map(region =>
                                <option id={"book_region_"+region.id} value={region.id}>{region.name}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    </Row>
                    <Form.File
                        className="mt-3"
                        value={file}
                        id="ze_best_file"
                        onChange={e => setFile(e.target.value)}
                        accept=".txt"
                    />

                    <Button
                        className="d-flex mt-3 justify-content-center"
                        id='book_create_button'
                        onClick={Create}
                    >
                        Опубликовать
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default AddPublication;
