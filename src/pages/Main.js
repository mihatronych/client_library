import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {Context} from "../index";
import {Link} from "react-router-dom";
import {fetchAuthor, fetchPublication, fetchRegion, fetchType} from "../http/library_api";
import {observer} from "mobx-react-lite";
import {fetchMark} from "../http/mark_api";
import ReactPaginate from "react-paginate";
import '../styles.css';
import {fetchDialect} from "../http/lang_api";
import {fetchTheme} from "../http/theme_topic_api";


const Main = observer(() => {
    const {publication, mark} = useContext(Context)
    /// ОЦЕНКУ ДОДЕЛАТЬ ТАМ ДОЛЖНА БЫТЬ СРЕДНЯЯ, А НЕ ПЕРВАЯ
    useEffect(() => {
        fetchAuthor().then(data => publication.setAuthors(data)).then(data => mark.setAuthors(data))
        fetchPublication().then(data => publication.setPublications(data)).then(data => mark.setPublications(data))
        fetchMark().then(data => mark.setMarks(data))
        fetchType().then(data => publication.setTypes(data))
        fetchRegion().then(data => publication.setRegions(data))
        fetchDialect().then(data => publication.setDialects(data))
        fetchTheme().then(data => publication.setThemes(data))
    }, [publication, mark])

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
        return <div>рейтинг: {sum/(count)}</div>
    }

    const [pageNumber, setPageNumber] = useState(0)

    const publicationsPerPage = 2
    const pagesVisited = pageNumber * publicationsPerPage
    const sortedPublictions = publication.publications.slice()
        .sort((a, b) => Date.parse(a.date_publ) - Date.parse(b.date_publ)).reverse()
    const displayPublications = sortedPublictions
        .slice(pagesVisited, pagesVisited + publicationsPerPage)
        .map(publicat =>
             <Link to={"/publication/"+publicat.id} style={{ textDecoration: 'none' }}>
                <div className="d-flex justify-content-between container mt-3" style={
                    { backgroundColor:'#3366CC', color:"white"}
                }>
                    <Row>
                        <Col>
                        {publication.types.map(items => {
                            if (items.id === parseInt(publicat.typeId))
                                return <p className="m-auto ml-1">{items.name} </p>
                        })
                        }
                        <Col className="m-auto"> <b> {publicat.title}</b>
                            {publication.authors.map(items => {
                                if (items.id === parseInt(publicat.authorId))
                                    return <i className="m-auto"> - {items.name}</i>
                            })}
                        </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="m-auto">Дата издания: {new Date(publicat.date_publ.toString()).toLocaleDateString()} </Col>
                        <Col className="m-auto" >{publicat.pages} стр.</Col>
                        <Col className="m-auto">
                        <Row>{meanMark(publicat.id)}/10</Row>
                        </Col>
                    </Row>
                </div>
            </Link>
        )


    const pageCount = Math.ceil( publication.publications.length / publicationsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - 54}}
        >
            <Card style={{width: window.innerWidth - 100, backgroundColor:'#C06C84', color:'white'}} className="p-5">
                <h2 className="align-self-center"> Новейшие публикации</h2>
                <div >
                    {displayPublications}
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
                </div>
            </Card>
        </Container>
    );
});

export default Main;