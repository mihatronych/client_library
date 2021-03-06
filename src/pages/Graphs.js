import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchAuthor, fetchPublication, fetchRegion, fetchType} from "../http/library_api";
import {fetchMark} from "../http/mark_api";
import {fetchDialect} from "../http/lang_api";
import {fetchTheme} from "../http/theme_topic_api";
import {Card, Container} from "react-bootstrap";
import {Legend, Pie, PieChart} from "recharts";
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
        let r = Math.floor(Math.random() * (128) + 128),
            g = Math.floor(Math.random() * (128)+ 128),
            b = Math.floor(Math.random() * (128)+ 128),
            color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
        return color
    }

    const graphDataRegions= () =>{
        publication.regions.map(region => {

            let count = 0
            publication.publications.map(item => {
                if(item.regionId === region.id){
                    count += 1
                }
            return null
            })

            ar1.push({
                name: region.name,
                value: count,
                fill: r_color()
            })
        return null
        })
    }

    let ar2 = []

    const graphDataLanguages= () =>{
        publication.dialects.map(dialect => {
            let count = 0
            publication.publications.map(item => {
                if(item.dialectId === dialect.id){
                    count += 1
                }
                return null
            })

            ar2.push({
                name: dialect.name,
                value: count,
                fill: r_color()
            })
            return null
        })
        return null
    }

    let ar3 = []

    const graphDataThemes= () =>{
        publication.themes.map(theme => {

            let count = 0
            publication.publications.map(item => {
                if(item.themeId === theme.id){
                    count += 1
                }
                return null
            })

            ar3.push({
                name: theme.name,
                value: count,
                fill: r_color()
            })
            return null
        })
        return null
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
    graphDataLanguages()
    graphDataRegions()
    graphDataThemes()
    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-4"
        >
            <Card className="p-5 card">
                <h2 className="align-self-center"> ???????????????????? ???? ??????????????????????</h2>
                <div className="align-self-center">
                <div className="mt-3 p-2 align-self-center card_graphs" >
                    <h3 className="align-self-center mb-4"> ???????????????? ?????????????????? ???? ????????????</h3>
                    <PieChart width={550} height={200} ref={ref => convertChart(ref)} >
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
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                    </PieChart>
                </div>

                <div className="mt-2 p-2 align-self-center card_graphs" >
                    <h3 className="align-self-center mb-4"> ???????????????? ?????????????????? ???? ????????????????</h3>
                    <PieChart width={550} height={200} ref={ref => convertChart(ref)} >
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
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                    </PieChart>
                </div>

                <div className="mt-2 p-2 align-self-center card_graphs">
                    <h3 className="align-self-center mb-4"> ???????????????? ?????????????????? ???? ??????????</h3>
                    <PieChart width={550} height={200} ref={ref => convertChart(ref)} >
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={ar3}
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            fill="#8884d8"
                            label
                        />
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                    </PieChart>
                </div>
                </div>
            </Card>
        </Container>
    );

});

export default Graphs;
