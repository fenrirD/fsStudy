import React, {Component, createRef} from "react"
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {ZoomToExtent, MousePosition} from 'ol/control'
import XYZ from 'ol/source/XYZ';
import TileGrid from 'ol/tilegrid/TileGrid';
import {get as getProjection, addProjection} from 'ol/proj';
import {register} from 'ol/proj/proj4'
import {transform} from 'ol/proj'
import {createStringXY} from 'ol/coordinate'
import proj4 from 'proj4';
import {defaults} from 'ol/control';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as menuActions from "../../store/modules/menu";
import axios from 'axios'
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource, TileWMS, Cluster} from 'ol/source';
import Feature from 'ol/Feature';
import {Point} from 'ol/geom';
import Geometry from 'ol/geom/Geometry';
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style';
import Projection from "ol/proj/Projection";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Measure from "./measure/mesure";


class MainMap extends Component<any, any>{

    private map : React.RefObject<HTMLDivElement>;



    constructor(props? : any) {
        super(props);
        this.map = React.createRef()
        this.state = {
            map: null
        }

    }
    componentDidMount() {
        console.log(this)
        const {userLocation} = this.props
        const styles:any = {
            'LineString': new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 1
                })
            }),
            'MultiLineString': new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 1
                })
            }),

            'MultiPolygon': new Style({
                stroke: new Stroke({
                    color: 'yellow',
                    width: 1
                }),
                fill: new Fill({
                    color: 'rgba(255, 255, 0, 0.1)'
                })
            }),
            'Polygon': new Style({
                stroke: new Stroke({
                    color: 'blue',
                    lineDash: [4],
                    width: 3
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                })
            }),
            'GeometryCollection': new Style({
                stroke: new Stroke({
                    color: 'magenta',
                    width: 2
                }),
                fill: new Fill({
                    color: 'magenta'
                }),
            }),
            'Circle': new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: 2
                }),
                fill: new Fill({
                    color: 'rgba(255,0,0,0.2)'
                })
            })
        };

        // proj4.defs("EPSG:5181","+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
        proj4.defs("EPSG:5181",`+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs`);
        proj4.defs("EPSG:5174",`+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43`);
        register(proj4)
        // const extent      = [-30000, -60000, 494288, 988576];
        const extent: any      = [-30000, -60000, 475288, 930576]
        // const proj5181 = getProjection('EPSG:5181')
        const proj5181 = new Projection({
            code: 'EPSG:5181',
            extent: extent,

        });
        proj5181.setExtent(extent)
        const proj5174 = getProjection('EPSG:5174')
        proj5174.setExtent(extent)
        console.log(proj5181,proj5174)
        // const extent      = [-50000, -100000, 494288, 988576];


        const resolutions = [512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
        // const resolutions = [256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
        // const resolutions = [256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
        console.log(resolutions)

        console.log(userLocation)
        // if(userLocation) {
        //     alert(transform(userLocation, 'EPSG:3857', 'EPSG:5174'))
        //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        //     // this.state.map.getView().setCenter(transform(userLocation, 'EPSG:4326', 'EPSG:5181'))
        //     // this.state.map.getView().setZoom(13)
        // }

        const map1 = new Map({
            layers: [
                // new TileLayer({
                //   source: new OSM()
                // })
                new TileLayer({
                    // title : "Daum Street Map",
                    visible: true,
                    // type : 'base',
                    source: new XYZ({
                        projection: proj5181,
                        // projection: proj5174,
                        tileSize: 256,
                        // minZoom: 0,
                        // maxZoom: resolutions.length - 1,
                        tileGrid: new TileGrid({
                            origin: [extent[0],extent[1]],
                            resolutions: resolutions,
                            // tileSize: 256
                        }),
                        tileUrlFunction: function(tileCoord, pixelRatio, projection)  {
                            if (tileCoord == null) return '';
                            // console.log(projection)
                            let s: Number = Math.floor(Math.random() * 4);  // 0 ~ 3
                            let z: Number = resolutions.length - tileCoord[0];
                            let x: Number = tileCoord[1];
                            let y: Number = tileCoord[2];
                            return `http://map${s}.daumcdn.net/map_2d/1902usc/L${z}/${y}/${x}.png`;
                        },

                    })
                }),
                // new TileLayer({
                //     source: new TileWMS({
                //         url: 'http://192.168.0.105:8080/geoserver/seoul/wms',
                //         params: {
                //             'FORMAT': 'image/png',
                //             'VERSION': '1.1.1',
                //             tiled: true,
                //             "LAYERS": 'seoul:admin_sid',
                //             "exceptions": 'application/vnd.ogc.se_inimage',
                //             tilesOrigin: 179101.84250000026 + "," + 436263.77749999985
                //         },
                //         projection: 'EPSG:5181'
                //     })
                // }),
            ],
            target: 'map',
            view: new View({
                projection: proj5174,
                // projection: proj5181,
                extent: extent,
                resolutions: resolutions,
                // // maxResolution: resolutions[0],
                // zoomFactor: 1,
                center: [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2],
                // center: [127,37],
                zoom: 10,
                enableRotation: false
            }),


        });
        let styleCache:any = {}

        axios.get('http://192.168.0.105:8080/geoserver/seoul/ows?service=WFS&version=1.0.0&request=GetFeature&srsName=EPSG:5174&typeName=seoul%3Aadmin_sid&maxFeatures=50&outputFormat=application%2Fjson')
            .then((response) => {
                console.log(response)
                let vectorSource : any= new VectorSource({
                    features: (new GeoJSON()).readFeatures(response.data),
                    format: new GeoJSON()
                })
                console.log(vectorSource)
                let vectorLayer =new VectorLayer({

                    source: vectorSource,
                    style: (feature)=> {
                        console.log(1)
                        return styles[feature.getGeometry().getType()]
                    }
                });
                map1.addLayer(vectorLayer)
                console.log(map1.getLayers())

            })
        this.setState({
            map: map1
        })
        if(userLocation) {
            let userLocaionPoint = new VectorLayer({
                source: new VectorSource({
                    features: [new Feature({
                        geometry: new Point(transform(userLocation, 'EPSG:4326', 'EPSG:5181'))
                    })]
                })
            })
            map1.addLayer(userLocaionPoint)
            map1.getView().setCenter(transform(userLocation, 'EPSG:4326', 'EPSG:5174'))
        }
    }
    queryTest = () => {
        let oldT = new Date().getTime()
        axios.get('/queryTest')
            .then((response) => {
                console.log(response.data[0].geojson.value)
                let newT1 = new Date().getTime()
                let newVectorLayers = new VectorLayer({
                    source : new VectorSource({
                        features :(new GeoJSON()).readFeatures(response.data[0].geojson.value),
                        // features : response.data.reduce((acc:any, cur:any, idx:any)=>{
                        //     return [
                        //         ...acc,
                        //         new Feature(new Point([cur.x, cur.y]))
                        //     ]
                        // },[])
                    }),

                })
                this.state.map.addLayer(newVectorLayers)
                let newT = new Date().getTime()
                alert('point add -> '+(newT-oldT)/1000 +' :: request end -> ' + (newT1-oldT)/1000)
            })
    }
    zoom = () => {
        const {userLocation} = this.props
        console.log(userLocation)
        if(userLocation) {
            alert(transform(userLocation, 'EPSG:3857', 'EPSG:5174'))
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this.state.map.getView().setCenter(transform(userLocation, 'EPSG:4326', 'EPSG:5181'))
            this.state.map.getView().setZoom(13)
        }
    }
    render() {
        console.log(this)
        // this.zoom()

        return(

                <div style={{width:`100%`,}}>
                    <button onClick={()=>this.queryTest()} style={{
                        position: 'absolute',
                        left: '100px',
                        zIndex: 999
                    }}> aa</button>
                    <Measure map={this.state.map}/>
                    <div id='map' ref={this.map} style={{
                        width: '100%',
                        height: window.innerHeight-64,
                        /*height: '100%'*/
                    }}>
                    </div>
                </div>
        )
    }

}

export default connect(({menu} : any) => ({
    isOpen : menu.isMenuOpen,
    isPostOpen: menu.isPostOpen,
    userLocation: menu.userLocation

}), dispatch => ({
    menuActions : bindActionCreators(menuActions, dispatch)
}))(MainMap)
