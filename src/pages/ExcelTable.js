import React, {PureComponent, useContext, useEffect} from 'react';
import ReactDataSheet from "react-datasheet";
import {useHistory} from "react-router-dom";
import { CSVLink} from "react-csv";
import {Context} from "../index";
import {fetchAuthor, fetchPublication, fetchPublicator, fetchRegion, fetchType} from "../http/library_api";
import {fetchMark} from "../http/mark_api";
import {fetchDialect} from "../http/lang_api";
import {fetchTheme} from "../http/theme_topic_api";
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";

import '../override-everything.css'
import {Card} from "@material-ui/core";

const SheetRenderer = props => {
    const {as: Tag, headerAs: Header, bodyAs: Body, rowAs: Row, cellAs: Cell,
        className, columns, selections, onSelectAllChanged} = props
    return (
        <Tag className={className}>
            <Header className='data-header'>
                <Row>
                    <Cell className='action-cell cell'>

                    </Cell>
                    {columns.map(column => <Cell className='cell' style={{ width: column.width }} key={column.label}>{column.label}</Cell>)}
                </Row>
            </Header>
            <Body className='data-body'>
                {props.children}
            </Body>
        </Tag>
    )
}

const RowRenderer = props => {
    const {as: Tag, cellAs: Cell, className, row, selected, onSelectChanged} = props
    return (
        <Tag className={className}>
            <Cell className='action-cell cell'>
            </Cell>
            {props.children}
        </Tag>
    )
}

const CellRenderer = props => {
    const {
        as: Tag, cell, row, col, columns, attributesRenderer,
        selected, editing, updated, style,
        ...rest
    } = props

    // hey, how about some custom attributes on our cell?
    const attributes = cell.attributes || {}
    // ignore default style handed to us by the component and roll our own
    attributes.style = { width: columns[col].width }
    if (col === 0) {
        attributes.title = cell.label
    }

    return (
        <Tag {...rest} {...attributes}>
            {props.children}
        </Tag>
    )
}

class BasicSheet extends React.Component {
    constructor(props) {
        super(props);
        this.sheetRenderer = this.sheetRenderer.bind(this)
        this.rowRenderer = this.rowRenderer.bind(this)
        this.cellRenderer = this.cellRenderer.bind(this)
        this.state = {
            as: 'table',
            columns: [
                { label: '', width: '5%' },
                { label: 'Название', width: '5%' },
                { label: 'Короткое описание', width: '5%' },
                { label: 'Страницы', width: '5%' },
                { label: 'Дата издания', width: '5%' },
                { label: 'Дата создания', width: '5%' },
                { label: 'Автор', width: '5%' },
                { label: 'Тема', width: '5%' },
                { label: 'Язык', width: '5%' },
                { label: 'Регион', width: '5%' },
                { label: 'Издатель', width: '5%' },
                { label: 'Тип', width: '5%' },
                { label: 'Издатель', width: '5%' }
            ],
            grid: props.table,
        };
    }

    sheetRenderer (props) {
        const {columns, selections} = this.state
        return <SheetRenderer columns={columns}  as='table' headerAs='thead' bodyAs='tbody' rowAs='tr' cellAs='th' {...props} overflow='clip'/>

    }

    rowRenderer (props) {
        const {selections} = this.state
        return <RowRenderer as='tr' cellAs='td'  className='data-row' {...props} overflow='clip'/>

    }
    cellRenderer (props) {
        return <CellRenderer as='td' columns={this.state.columns} {...props} overflow='clip' />
    }

    valueRenderer = cell => cell.value;
    onCellsChanged = changes => {
        const grid = this.state.grid;
        changes.forEach(({ cell, row, col, value }) => {
            grid[row][col] = { ...grid[row][col], value };
        });
        this.setState({ grid });
    };
    onContextMenu = (e, cell, i, j) =>
        cell.readOnly ? e.preventDefault() : null;

    render() {
        return (
            <ReactDataSheet
                data={this.state.grid}
                className='custom-sheet'
                headerRenderer={this.headerRenderer}
                bodyRenderer={this.bodyRenderer}
                sheetRenderer={this.sheetRenderer}
                rowRenderer={this.rowRenderer}
                cellRenderer={this.cellRenderer}
                valueRenderer={this.valueRenderer}
                onContextMenu={this.onContextMenu}
                onCellsChanged={this.onCellsChanged}
            />
        );
    }
}

const ExcelTable = observer(() => {
    const history = useHistory()

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
        return Math.round(sum/(count)*100)/100
    }

    const excelData = [
    ];

    const  createExcelTable =(excelData) => {
        let rowAr = []
        excelData.push(rowAr)
        let count = 0
        publication.publications.map(publ =>{
            count+=1
            rowAr = []
            rowAr.push(
                { readOnly: true, value: count },
                { readOnly: true,value: publ.title.toString() },
                { readOnly: true,value: publ.short_review.toString()},
                { readOnly: true,value: publ.pages.toString()},
                { readOnly: true,value: new Date(publ.date_publ).toDateString()},
                { readOnly: true,value: new Date(publ.date_create).toDateString()},
            );
            try {
                rowAr.push({readOnly: true,value: publication.authors.find((a) => a.id === publ.authorId).name.toString()})
            }
            catch {}
            try {
                rowAr.push({readOnly: true,value:publication.themes.find((a) => a.id === publ.themeId).name.toString()})
            }
            catch {}
            try {
                rowAr.push({readOnly: true,value:publication.dialects.find((a) => a.id === publ.dialectId).name.toString()})
            }catch {}
            try {
                rowAr.push({readOnly: true,value:publication.regions.find((a) => a.id === publ.regionId).name.toString()})
            }catch {}
            try {
                rowAr.push({readOnly: true,value:publication.publicators.find((a) => a.id === publ.publicatorId).name.toString()})
            }catch {}
            try {
                rowAr.push({readOnly: true,value:publication.types.find((a) => a.id === publ.typeId).name.toString()})
            }catch {}
            try {
                rowAr.push({readOnly: true,value:meanMark(publ.id).toString()})
            }catch {}

            excelData.push(rowAr)
            return excelData}
        )

        return excelData
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
        <Container
            className="d-flex justify-content-center align-items-center"
        >
            <Card style={{width: window.innerWidth - 100}} className="p-5 card">
                <CSVLink class="dropdown-item" data={createCsvTable(csvData)}>Экспорт таблицы EXCEL</CSVLink>
        <BasicSheet table={createExcelTable(excelData)} style={{fontSize: 12}}/>
                </Card>
        </Container>
    );

});
export default ExcelTable;