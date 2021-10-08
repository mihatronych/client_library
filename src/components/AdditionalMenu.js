import React, {useContext, useEffect} from 'react';
import {DropdownButton, Nav} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import {useHistory} from "react-router-dom";
import {EXCEL_TABLE, GRAPHS_ROUTE} from "../utils/consts";
import { CSVLink} from "react-csv";
import {Context} from "../index";
import {fetchAuthor, fetchPublication, fetchPublicator, fetchRegion, fetchType} from "../http/library_api";
import {fetchMark} from "../http/mark_api";
import {fetchDialect} from "../http/lang_api";
import {fetchTheme} from "../http/theme_topic_api";


const AdditionalMenu = () => {
    const history = useHistory()
    const toGraphs = async() => {
        return history.push(GRAPHS_ROUTE)
    }

    const toExcel = async() => {
        return history.push(EXCEL_TABLE)
    }

    const {publication, mark,} = useContext(Context)

    useEffect(() => {
        fetchAuthor().then(data => publication.setAuthors(data))
        fetchPublication().then(data => publication.setPublications(data))
        fetchMark().then(data => mark.setMarks(data))
        fetchType().then(data => publication.setTypes(data))
        fetchRegion().then(data => publication.setRegions(data))
        fetchDialect().then(data => publication.setDialects(data))
        fetchTheme().then(data => publication.setThemes(data))
        fetchPublicator().then(data => publication.setPublicators(data))
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
        return sum})

        if (count === 0){
            count = 1
        }
        return sum/(count)
    }

    const createCsvTable = (csvData) => {
        csvData.push(['title', 'short_review', 'pages',
            'date_publ', 'date_create', 'author', 'theme',
            'dialect', 'region', 'publicator', 'type', 'mean_mark'])
        let rowAr = [];
        publication.publications.map(publ =>{
            rowAr = []
            rowAr.push("'"+publ.title.toString()+"'")
            rowAr.push("'"+publ.short_review.toString()+"'")
            rowAr.push("'"+publ.pages.toString()+"'")
            rowAr.push("'"+publ.date_publ.toString()+"'")
            rowAr.push("'"+publ.date_create.toString()+"'")
            try {
                rowAr.push("'" + publication.authors.find((a) => a.id === publ.authorId).name.toString() + "'")
            }
            catch {}
            try {
            rowAr.push("'"+publication.themes.find((a) => a.id === publ.themeId).name.toString()+"'")
            }
            catch {}
            try {
                rowAr.push("'" + publication.dialects.find((a) => a.id === publ.dialectId).name.toString() + "'")
            }catch {}
            try {
            rowAr.push("'"+publication.regions.find((a) => a.id === publ.regionId).name.toString()+"'")
            }catch {}
            try {
            rowAr.push("'"+publication.publicators.find((a) => a.id === publ.publicatorId).name.toString()+"'")
            }catch {}
            try {
            rowAr.push("'"+publication.types.find((a) => a.id === publ.typeId).name.toString()+"'")
            }catch {}
            try {
            rowAr.push("'"+meanMark(publ.id).toString()+"'")
            }catch {}

            csvData.push(rowAr)
            return csvData}
        )

        return csvData
    }

    const csvData = [
    ];

    return (
        <Nav className="ml-auto">
            <DropdownButton title="Дополнительно" style={{zIndex:100}}>
                <DropdownItem onClick={() => toGraphs()} style={{minWidth:"250px"}}>
                    Статистика
                </DropdownItem>
                <DropdownItem onClick={() => toExcel()}>
                    Эксель таблица
                </DropdownItem>
            </DropdownButton>
        </Nav>
    );
};

export default AdditionalMenu;
