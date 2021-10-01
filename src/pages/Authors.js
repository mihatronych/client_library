import React, {useContext, useEffect} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {Context} from "../index";
import {fetchAuthor, fetchPublication} from "../http/library_api";
import {observer} from "mobx-react-lite";
import {PUBLICATION_ROUTE} from "../utils/consts";

const Authors = observer(() => {
    const {publication, superFilter} = useContext(Context)
    const history = useHistory()
    useEffect(() => {
        fetchAuthor().then(data => publication.setAuthors(data))
        fetchPublication().then(data => publication.setPublications(data))
    }, [publication])

    const countBooksOfAuthor = (authorId) => {
        return publication.publications.filter((data) => {if (data.authorId === parseInt(authorId)) return data
        return null}).length
    }

    const getFilteredBooks = async(authorId) => {
        superFilter.setFilter(publication.authors.find(a => a.id === authorId))
        superFilter.setFiltered(publication.publications.filter((data) => {if (data.authorId === parseInt(authorId)) return data
        return null}))
        return history.push(PUBLICATION_ROUTE)
    }

    const sortedAuthors = publication.authors.slice()
        .sort((a, b) => a.name >= b.name ? 1 : -1)

    const displayTable = sortedAuthors.map(author => {
        return <div className="d-flex justify-content-between container mt-3 block_in_card">
                <p className="m-auto">{author.name} </p>
                <p className="m-auto">{author.email} </p>
                <p className="m-auto">Публикаций: {countBooksOfAuthor(author.id)}</p>
                <Button onClick={() => getFilteredBooks(author.id)} variant={"outline-light"}>К публикациям</Button>
            </div>
    })



    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - window.innerHeight*0.2, marginTop:window.innerHeight - window.innerHeight*0.9}}
        >
            <Card style={{width: window.innerWidth - window.innerWidth*0.2}} className="p-5 card">
                    <h2 className="align-self-center"> Авторы</h2>
                    <div>
                        {displayTable}
                    </div>

            </Card>
        </Container>
    );
});

export default Authors;
