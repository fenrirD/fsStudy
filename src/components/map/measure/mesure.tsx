import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {unByKey} from 'ol/Observable';
import Overlay from 'ol/Overlay';
import {getArea, getLength} from 'ol/sphere';
import {LineString, Polygon} from 'ol/geom';
import GeometryType from 'ol/geom/GeometryType';
import Draw from 'ol/interaction/Draw';
import {Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Vector as VectorLayer} from 'ol/layer';
import OverlayPositioning from "ol/OverlayPositioning";

const Measure = ({map}:any) => {






    /**
     * Currently drawn feature.
     * @type {module:ol/Feature~Feature}
     */
    let sketch :any;


    /**
     * The help tooltip element.
     * @type {Element}
     */
    let helpTooltipElement : any;


    /**
     * Overlay to show the help messages.
     * @type {module:ol/Overlay}
     */
    let helpTooltip : any;


    /**
     * The measure tooltip element.
     * @type {Element}
     */
    let measureTooltipElement : any;


    /**
     * Overlay to show the measurement.
     * @type {module:ol/Overlay}
     */
    let measureTooltip : any;


    /**
     * Message to show when the user is drawing a polygon.
     * @type {string}
     */
    const continuePolygonMsg = 'Click to continue drawing the polygon';


    /**
     * Message to show when the user is drawing a line.
     * @type {string}
     */
    const continueLineMsg = 'Click to continue drawing the line';


    /**
     * Handle pointer move.
     * @param {module:ol/MapBrowserEvent~MapBrowserEvent} evt The event.
     */
    const pointerMoveHandler = function(evt : any) {
        if (evt.dragging) {
            return;
        }
        /** @type {string} */
        let helpMsg = 'Click to start drawing';

        if (sketch) {
            const geom = (sketch.getGeometry());
            if (geom instanceof Polygon) {
                helpMsg = continuePolygonMsg;
            } else if (geom instanceof LineString) {
                helpMsg = continueLineMsg;
            }
        }

        // helpTooltipElement.innerHTML = helpMsg;
        // helpTooltip.setPosition(evt.coordinate);
        //
        // helpTooltipElement.classList.remove('hidden');
    };





    let draw : any; // global so we can remove it later
    const source = new VectorSource();
    const handleBtnClick = (geom :any) => {


        const vector = new VectorLayer({
            source: source,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        map.addLayer(vector)
        map.on('pointermove', pointerMoveHandler);

        // map.getViewport().addEventListener('mouseout', function() {
        //     helpTooltipElement.classList.add('hidden');
        // });
        addInteraction(geom)
    }
    /**
     * Format length output.
     * @param {module:ol/geom/LineString~LineString} line The line.
     * @return {string} The formatted length.
     */
    const formatLength = function(line : any) {
        console.log('line', line)
        const length = getLength(line);
        let output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'm';
        }
        return output;
    };


    /**
     * Format area output.
     * @param {module:ol/geom/Polygon~Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    const formatArea = function(polygon : any) {
        const area = getArea(polygon);
        let output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    };
    //TODO LINE DRAW 문제 해결
    function addInteraction(geom :any) {
        draw = new Draw({
            source: source,
            type: geom,
            // type: GeometryType.POLYGON,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });
        map.addInteraction(draw);

        createMeasureTooltip();
        // createHelpTooltip();
        draw.on('drawabort', function () {
            console.log('drawabort')
        })
        let listener : any;
        draw.on('drawstart',
            function(evt : any) {
                // set sketch
                sketch = evt.feature;

                /** @type {module:ol/coordinate~Coordinate|undefined} */
                let tooltipCoord = evt.coordinate;
                sketch.getGeometry().on('click',function () {
                    console.log('click')
                })
                listener = sketch.getGeometry().on('change', function(evt: any) {
                    const geom = evt.target;
                    let output;
                    if (geom instanceof Polygon) {
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate()
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            });

        draw.on('drawend',
            function() {
                measureTooltipElement.className = 'tooltip tooltip-static';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                unByKey(listener);
            });
    }


    /**
     * Creates a new help tooltip
     */
    function createHelpTooltip() {
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'tooltip hidden';
        helpTooltip = new Overlay({
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: OverlayPositioning.CENTER_LEFT
        });
        map.addOverlay(helpTooltip);
    }


    /**
     * Creates a new measure tooltip
     */
    function createMeasureTooltip() {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'tooltip tooltip-measure';
        measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: OverlayPositioning.BOTTOM_CENTER

        });
        map.addOverlay(measureTooltip);
    }

    const handleClickCamera = () => {
        // @ts-ignore
        window.webViewBridge.send('handleOnClickCamera', window.counter, (res)=> alert(res), (error)=> alert(error))

    }




    console.log(map)
    return (
    <div>
        <Fab color="primary" aria-label="add" style={{
            position : 'absolute',
            zIndex: 999,
            right: '15px',
            marginTop : '8px'
        }}
             onClick={ ()=> handleBtnClick(GeometryType.LINE_STRING)}
        >
            <AddIcon />
        </Fab>
        <Fab color="primary" aria-label="add" style={{
        position : 'absolute',
        zIndex: 999,
        right: '15px',
        marginTop : '70px'
        }}
         onClick={ ()=> handleBtnClick(GeometryType.POLYGON)}
        >
        <AddIcon />
        </Fab>
        <Fab color="primary" aria-label="add" style={{
            position : 'absolute',
            zIndex: 999,
            right: '15px',
            marginTop : '160px'
        }}
             onClick={ ()=> handleClickCamera()}
        >
            <AddIcon />
        </Fab>
    </div>
    )

}

export default Measure

