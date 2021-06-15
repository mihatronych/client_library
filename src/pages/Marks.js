import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Link, useHistory, useParams} from "react-router-dom";
import {fetchAuthor, fetchOnePublication, fetchPublication} from "../http/library_api";
import {Context} from "../index";
import {fetchMark} from "../http/mark_api";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis} from "recharts";
import Tooltip from "@material-ui/core/Tooltip";

const Marks = observer(() => {
    const {mark, user} = useContext(Context)
    const [publicn, setPublicn] = useState({info: []})
    const {id} = useParams()
    const history = useHistory()
    useEffect(() => {
        fetchOnePublication(id).then(data => setPublicn(data))
        fetchPublication().then(data => mark.setPublications(data))
        fetchAuthor().then(data => mark.setAuthors(data))
        fetchMark().then(data => mark.setMarks(data))
    }, [mark, id])

    const [pageNumber, setPageNumber] = useState(0)

    const marksPerPage = 2
    const pagesVisited = pageNumber * marksPerPage
    const sortedMarks = mark.marks.slice()
        .filter((a)=> a.publicationId === publicn.id)
        //.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)).reverse()

    const displayMarks = sortedMarks
        .slice(pagesVisited, pagesVisited + marksPerPage)
        .map(mak =>
                <div className="mt-3 p-2" style={
                    { backgroundColor:'#3366CC', color:"white"}
                }>
                    <Row className="justify-content-between">
                        <div className="m-4">
                        {mark.authors.map(author => {
                            if(author.id === mak.authorId) return <div>Автор отзыва: {author.name}</div>
                        })}
                        </div>

                        <div className="m-4">Рейтинг {mak.rate} / 10</div>

                    </Row>
                    <div className="ml-2 mr-2" style={{width:'80%'}}>
                    <Form.Control as="textarea"
                                  value={mak.content}
                                  readOnly
                    >
                    </Form.Control>
                    </div>
                </div>
        )

    const pageCount = Math.ceil( sortedMarks.length / marksPerPage);

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
        return <div>Ср. рейтинг: {sum/(count)}/10</div>
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    let ar = []

    const graphData= () =>{
        let i = 1;
        while (i < 11) {

            let count = 0
            let absCount = 0
            mark.marks.map(items => {
                if (items.publicationId === parseInt(id) && parseInt(items.rate)===parseInt(i))
                {
                    count += 1
                }
                if (items.publicationId === parseInt(id) )
                {
                    absCount += 1
                }
            })

            ar.push({
                name: i.toString(),
                count: count/absCount*100,
            })
            i++;
        }
    }

    return (
        <Container
            className="d-flex align-items-center"
            style={{height:window.innerHeight - 54}}
        >
            <Card style={{width: window.innerWidth - 100, backgroundColor:'#C06C84', color:'white'}} className="p-5">
                <h2 className="align-self-center"> Отзывы о книге {publicn.title}</h2>

                <Row>
                    <Col>
                    <Row>
                    {displayMarks}
                        </Row>
                    <Row>
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    </Row>

                    <Col/>
                    <Col>{user.isAuth ? <Col>
                            <Button href={"/add_mark/"+publicn.id} variant={"outline-light"}>Добавить отзыв</Button>
                        </Col>
                        :
                        <Col>
                        </Col>
                    }</Col>
                    </Col>
                    <Col>
                    <div className="mt-3 p-2"  style={
                        { backgroundColor:'#3366CC', color:"white"}
                    }>
                        <div>{meanMark(id)}</div>
                        {graphData()}
                            <BarChart
                                width={500}
                                height={300}
                                data={ar}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="white" />
                                <YAxis stroke="white"/>
                                <Tooltip/>
                                <Legend />
                                <Bar dataKey="count" fill="#C06C84" />
                            </BarChart>
                    </div>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
});

export default Marks;