import React, {Component, createRef} from "react"
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {ZoomToExtent, MousePosition} from 'ol/control'
import XYZ from 'ol/source/XYZ';
import TileGrid from 'ol/tilegrid/TileGrid';
import {get as getProjection} from 'ol/proj';
import {register} from 'ol/proj/proj4'
import {createStringXY} from 'ol/coordinate'
import proj4 from 'proj4';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as menuActions from "../../store/modules/menu";
import axios from 'axios'
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource, TileWMS} from 'ol/source';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';



class MainMap extends Component<any, any>{

    private map : React.RefObject<HTMLDivElement>;



    constructor(props? : any) {
        super(props);
        this.map = React.createRef()
        if(this.props.isOpen) this.props.menuActions.handleMenuClick()
    }
    componentDidMount() {
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

        proj4.defs("EPSG:5181","+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
        proj4.defs("EPSG:5174","+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43");
        register(proj4)
        const proj5181 = getProjection('EPSG:5181')
        const proj5174 = getProjection('EPSG:5174')
        console.log(proj5181)
        // const extent      = [-50000, -100000, 494288, 988576];
        const extent      = [-30000, -60000, 494288, 988576];

        // @ts-ignore
        proj5181.setExtent(extent)
        const resolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
        console.log(this.map)
        const map1 =new Map({
            layers: [
                new TileLayer({
                    // title : "Daum Street Map",
                    visible: true,
                    // type : 'base',
                    source: new XYZ({
                        // projection: proj5181,
                        projection: proj5174,
                        tileSize: 256,
                        // minZoom: 0,
                        //maxZoom: resolutions.length - 1,
                        tileUrlFunction: (tileCoord, pixelRatio, projection) => {
                            if (tileCoord == null) return '';
                            let s: Number = Math.floor(Math.random() * 4);  // 0 ~ 3
                            let z: Number = resolutions.length - tileCoord[0];
                            let x: Number = tileCoord[1];
                            let y: Number = tileCoord[2] * -1;
                            return `http://map${s}.daumcdn.net/map_2d/1810uis/L${z}/${y}/${x}.png`;
                        },
                        tileGrid: new TileGrid({
                            origin: [-30000, -60000],
                            resolutions: resolutions,
                            //tileSize: [256]
                        }),
                    })
                }),
                new TileLayer({
                    source: new TileWMS({
                        url: 'http://192.168.0.105:8080/geoserver/seoul/wms',
                        params: {
                            'FORMAT': 'image/png',
                            'VERSION': '1.1.1',
                            tiled: true,
                            "LAYERS": 'seoul:admin_sid',
                            "exceptions": 'application/vnd.ogc.se_inimage',
                            tilesOrigin: 179101.84250000026 + "," + 436263.77749999985
                        }
                    })
                }),
            ],
            target: 'map',
            view: new View({
                projection: proj5174,
                extent: [-30000, -60000, 494288, 988576],
                resolutions: resolutions,
                maxResolution: resolutions[0],
                zoomFactor: 1,
                center: [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2],
                zoom: 0
            })
        });
        // axios.get('http://192.168.0.105:8080/geoserver/seoul/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=seoul%3Aadmin_sgg&maxFeatures=50&outputFormat=application%2Fjson')
        axios.get('http://192.168.0.105:8080/geoserver/seoul/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=seoul%3Aadmin_sid&maxFeatures=50&outputFormat=application%2Fjson')
            .then((response) => {
                console.log(response)
                let vectorSource : any= new VectorSource({
                    features: (new GeoJSON()).readFeatures(response.data)
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

            })

    }

    render() {
        console.log(this)
        return(
                <div style={{width:`100%`,}}>
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
    isOpen : menu.isMenuOpen
}), dispatch => ({
    menuActions : bindActionCreators(menuActions, dispatch)
}))(MainMap)
