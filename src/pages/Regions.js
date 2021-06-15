import React, {useContext, useEffect} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {Context} from "../index";
import {fetchPublication, fetchRegion} from "../http/library_api";
import {PUBLICATION_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const Regions = observer(() => {
    const {publication, superFilter} = useContext(Context)
    const history = useHistory()
    useEffect(() => {
        fetchRegion().then(data => publication.setRegions(data))
        fetchPublication().then(data => publication.setPublications(data))
    }, [publication])

    const countBooksOfRegion = (regionId) => {
        return publication.publications.filter((data) => {if (data.regionId === parseInt(regionId)) return data}).length
    }

    const getFilteredBooks = async(regionId) => {
        superFilter.setFilter(publication.regions.find(a => a.id === regionId))
        superFilter.setFiltered(publication.publications.filter((data) => {if (data.authorId === parseInt(regionId)) return data}))
        return history.push(PUBLICATION_ROUTE)
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - 54}}
        >
            <Card style={{width: window.innerWidth - 100, backgroundColor:'#C06C84', color:'white'}} className="p-5">
                <h2 className="align-self-center"> Регионы</h2>
                <div>
                    {publication.regions.map(region =>
                            <div className="d-flex justify-content-between container mt-3" style={
                                { backgroundColor:'#3366CC', color:"white"}
                            }>
                                <p className="m-auto">{region.name}</p>
                                <p className="m-auto">Публикаций: {countBooksOfRegion(region.id)}</p>
                                <Button onClick={() => getFilteredBooks(region.id)} variant={"outline-light"}>К публикациям</Button>
                            </div>
                    )}
                </div>

            </Card>
        </Container>
    );
});

export default Regions;