import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useHistory, useParams} from "react-router-dom";
import {Button, Card, Container, Form} from "react-bootstrap";
import {MARKS_ROUTE} from "../utils/consts";
import {createMark, fetchMark} from "../http/mark_api";
import jwt_decode from "jwt-decode";

const AddMark = observer(() => {
    const {mark} = useContext(Context)
    const {id} = useParams()
    const history = useHistory()

    const [rate, setRate] = useState(1)
    const [content, setContent] = useState("")
    const [publicationId] = useState(id)

    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const Create = () => {
        if(rate === undefined || "")
            return alert("Невведено название")
        if(content === undefined || "")
            return alert("Невведено краткое описание")
        try {
            createMark({rate:rate, content:content, authorId:decodedData.id, publicationId:publicationId}).then()
            alert("Данные добавлены");
            fetchMark(data => mark.setMarks(data)).then()
            history.push(MARKS_ROUTE + '/'+ id)
        } catch (e) {
            return alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-4"
            style={{height:window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5 mt-4 card">
                <h2 className="m-auto">Новый отзыв</h2>
                <Form className="d-flex flex-column">
                    <Form.Group>
                        <Form.Label>Впишите отзыв</Form.Label>
                        <Form.Control as="textarea"
                                      value={content}
                                      onChange={e => setContent(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Введите оценку</Form.Label>
                        <input type="number" className="form-control" min='1' max='10'
                               value={rate}
                               onChange={e => setRate(parseInt(e.target.value))}/>
                    </Form.Group>

                    <Button
                        className="d-flex mt-3 justify-content-center"
                        onClick={Create}
                    >
                        Написать отзыв
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default AddMark;
