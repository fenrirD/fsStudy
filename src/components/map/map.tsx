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

export default class MainMap extends Component<any, any>{

    private map : React.RefObject<HTMLDivElement>;

    constructor(props? : any) {
        super(props);
        this.map = React.createRef()


    }
    componentDidMount() {

        proj4.defs("EPSG:5181","+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
        register(proj4)
        const proj5181 = getProjection('EPSG:5181')
        console.log(proj5181)
        const extent      = [-50000, -100000, 494288, 988576];

        // @ts-ignore
        proj5181.setExtent(extent)
        const resolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
        console.log(this.map)
        new Map({
            layers: [
                new TileLayer({
                    // title : "Daum Street Map",
                    visible: true,
                    // type : 'base',
                    source: new XYZ({
                        projection: proj5181,
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
                })
            ],
            target: 'map',
            view: new View({
                projection: proj5181,
                extent: [-50000, -100000, 494288, 988576],
                resolutions: resolutions,
                //maxResolution: resolutions[0],
                zoomFactor: 1,
                center: [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2],
                zoom: 0
            })
        });

        //this.map.getLayers().forEach((idx)=> console.log(idx))
        // navigator.geolocation.getCurrentPosition(position => {
        //   const {latitude,longitude} = position.coords
        //   // console.log(position)
        //   alert(latitude)
        //   alert(longitude)
        // })


    }

    render() {
        console.log(this.props.widthSt)
        return(

            <div style={{width: '100%',}}>
                <div id='map' ref={this.map} style={{
                    width: '100%',
                    height: window.innerHeight-64,
                }}>
                </div>
            </div>
        )
    }

}

