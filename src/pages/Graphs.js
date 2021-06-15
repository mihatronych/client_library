import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchAuthor, fetchPublication, fetchRegion, fetchType} from "../http/library_api";
import {fetchMark} from "../http/mark_api";
import {fetchDialect} from "../http/lang_api";
import {fetchTheme} from "../http/theme_topic_api";
import {Card, Col, Container} from "react-bootstrap";
import {Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import Tooltip from "@material-ui/core/Tooltip";

const Graphs = observer(() => {
    const {publication, mark} = useContext(Context)
    useEffect(() => {
        fetchAuthor().then(data => publication.setAuthors(data))
        fetchPublication().then(data => publication.setPublications(data))
        fetchMark().then(data => mark.setMarks(data))
        fetchType().then(data => publication.setTypes(data))
        fetchRegion().then(data => publication.setRegions(data))
        fetchDialect().then(data => publication.setDialects(data))
        fetchTheme().then(data => publication.setThemes(data))
    }, [publication, mark])

    let ar1 = []

    const r_color = () => {
        let r = Math.floor(Math.random() * (256)),
            g = Math.floor(Math.random() * (256)),
            b = Math.floor(Math.random() * (256)),
            color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
        return color
    }

    const graphDataRegions= () =>{
        publication.regions.map(region => {

            let count = 0
            let absCount = 0
            publication.publications.map(item => {
                if(item.regionId === region.id){
                    count += 1
                }
            })

            ar1.push({
                name: region.name,
                value: count,
                fill: r_color()
            })
        })
    }

    let ar2 = []

    const graphDataLanguages= () =>{
        publication.dialects.map(dialect => {

            let count = 0
            let absCount = 0
            publication.publications.map(item => {
                if(item.dialectId === dialect.id){
                    count += 1
                }
            })

            ar2.push({
                name: dialect.name,
                value: count,
                fill: r_color()
            })
        })
    }

    const svgToPng = (svg, width, height) => {

        return new Promise((resolve, reject) => {

            let canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext('2d');

            // Set background to white
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);

            let xml = new XMLSerializer().serializeToString(svg);
            let dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(xml);
            let img = new Image(width, height);

            img.onload = () => {
                ctx.drawImage(img, 0, 0);
                let imageData = canvas.toDataURL('image/png', 1.0);
                resolve(imageData)
            }

            img.onerror = () => reject();

            img.src = dataUrl;
        });
    };

    const WIDTH = 900;
    const HEIGHT = 250;

    let pngs = []

    const convertChart = async (ref) => {

        if (ref && ref.container) {
            let svg = ref.container.children[0];
            let pngData = await svgToPng(svg, WIDTH, HEIGHT);
            pngs.push(pngData)
            console.log('Do what you need with PNG', pngData);
        }
    };


    const style = {
        top: '50%',
        left: '80%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };

    return (
        <Container
            className="d-flex align-items-center"
            style={{height:window.innerHeight - 54}}
        >
            <Card style={{width: window.innerWidth - 100, backgroundColor:'#C06C84', color:'white'}} className="p-5">
                <h2 className="align-self-center"> Статистика по публикациям</h2>
                <div className="mt-3 p-2 align-self-center"  style={
                    { backgroundColor:'#3366CC', color:"white", borderRadius: '10px'}
                }>
                    <h3 className="align-self-center"> Круговая диаграмма по языкам</h3>
                    {graphDataLanguages()}
                    <PieChart width={500} height={200} ref={ref => convertChart(ref)} >
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={ar2}
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip/>
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                    </PieChart>
                </div>

                <div className="mt-2 p-2 align-self-center"  style={
                    { backgroundColor:'#3366CC', color:"white", borderRadius: '10px'}
                }>
                    <h3 className="align-self-center"> Круговая диаграмма по регионам</h3>
                    {graphDataRegions()}
                    <PieChart width={500} height={200} ref={ref => convertChart(ref)} >
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={ar1}
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip/>
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                    </PieChart>
                </div>

            </Card>
        </Container>
    );

});

export default Graphs;