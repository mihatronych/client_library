import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import '../styles.css';
import {Context} from "../index";
import SortablePublications from "../components/SortablePublications";
import {observer} from "mobx-react-lite";
import {fetchAuthor, fetchPublication, fetchRegion, fetchType} from "../http/library_api";
import {fetchMark} from "../http/mark_api";
import {fetchTheme} from "../http/theme_topic_api";
import {fetchDialect} from "../http/lang_api";


const Publications = observer(() => {
    const {publication, mark, superFilter} = useContext(Context)
    useEffect(() => {
        fetchAuthor().then(data => publication.setAuthors(data))
        fetchPublication().then(data => publication.setPublications(data))
        fetchMark().then(data => mark.setMarks(data))
        fetchType().then(data => publication.setTypes(data))
        fetchRegion().then(data => publication.setRegions(data))
        fetchDialect().then(data => publication.setDialects(data))
        fetchTheme().then(data => publication.setThemes(data))
    }, [publication, mark])

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - window.innerHeight*0.2}}
        >
            {useEffect(() => {fetchPublication().then(data => publication.setPublications(data))})}
            {superFilter.filtered === undefined ?
            <SortablePublications publications={publication.publications} id="publications_default" authors={publication.authors} types={publication.types} marks = {mark}/>
                : <SortablePublications publications={superFilter.filtered} id="publications_filtered" authors={publication.authors} types={publication.types} marks = {mark}/>}
        </Container>
    );
});

export default Publications;