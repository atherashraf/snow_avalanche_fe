import "ol/ol.css";
import Map from "ol/Map.js";
import View from "ol/View.js";
import {getCenter} from "ol/extent";
import {Group} from "ol/layer";
import TileLayer from "ol/layer/Tile";
import Stamen from "ol/source/Stamen";
import OSM from "ol/source/OSM";
import Bing from "ol/source/BingMaps";


class OLMapVM {
    //<editor-fold desc="Initialization Section">

    //<editor-fold desc="Declaration Section"
    /**
     * @type OLCesium
     */
    _ol3d= null;
    /**
     * Enable or Disable state of 3D Globe
     * @type {boolean}
     */
    enable3D = false;
    /**
     *
     * @type {redux store}
     */
    reduxStore = null;
    /**
     * layerStyles json. can be accessed by LayerName
     * @type {Object}
     */
    layerStyles = {};
    /**
     *
     * @type {VectorLayer}
     */
    layer4SelectedFeature = null;
    /***
     *
     * @type {Object}
     * @private
     */
    _popupOverlay = null
    /**
     *
     * @type {number}
     */
    reactKey = 0;
    /**
     * DADialogBox
     */
    dialogBox;
    //</editor-fold>

    constructor (extent, zoomLevel, mapProj = "EPSG:3857") {
        // autoBind(this);
        this._initExtent = extent;
        this._mapProjection = mapProj;
        this._zoomLevel = zoomLevel;
        this._map = null;
        this._view = null;
        // this._baseLayers = {};
        // this._overlayLayers = {};
        // this._mapExtent =  [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892]
        // this._customInteractions["MeasureTool"] = new MeasureTool(this);

        // this._measureTool = new MeasureTool(this); this.activityIdentifier = this.activityIdentifier.bind(this);
    }
    initMapPanel (targetId) {
        this.setMap(targetId);
        this.addBaseLayers();
    }

    setMap (targetId) {
        let me = this;
        this.setView();
        this._map = new Map({
            target: targetId,
            view: this._view
            // controls: defaultControls().extend([
            //     new ToolbarControl({olMapVM: me}),
            //     // new GeocoderControl({olMapVM: me}),
            //     // new RotateNorthControl({olMapVM: me}),
            //     new ZoomRectangleControl({olMapVM: me}),
            //     new InitialExtentControl({olMapVM: me}),
            //     new LayerOfInterestControl({olMapVM: me})
            //
            // ]),
        });
        this._view.fit(this._initExtent, this._map.getSize());

    }
    setView () {
        // let center1 = fromLonLat([0, 0]);
        let center = getCenter(this._initExtent);

        this._view = new View({
            projection: this.getMapProjection(),
            center: center,
            zoom: this._zoomLevel
            // extent: this._initExtent,
            // rotation: 1
        });

    }

    getMapProjection () {
        return this._mapProjection;
    }
    //</editor-fold>

    //<editor-fold desc="Layer Section">

    //<editor-fold desc="Base Layer Section">
    getStamenLayer (visible = false) {
        let stamenLayer = new TileLayer({
            title: "Toner",
            baseLayer: true,
            visible: visible,
            source: new Stamen({layer: "toner"})
        });
        return stamenLayer;
    }

    getOSMLayer (visible = false) {
        let osm = new TileLayer({
            title: "OSM",
            preload: 4,
            baseLayer: true,
            visible: visible,
            source: new OSM()
        });
        return osm;
    }

    getBingLayer (imagerySetKey = "AL", visible = false) {

        let imagerySet = {
            "RD": {name: "Bing-Road", type: "RoadOnDemand"},
            "A": {name: "Bing-Aerial", type: "Aerial"},
            "AL": {name: "Bing-Aerial with labels", type: "AerialWithLabelsOnDemand"},
            "CD": {name: "Bing-Dark Canavs", type: "CanvasDark"},
            "OS": {name: "Bing-Ordnance Survey", type: "OrdnanceSurvey"}
        };
        let bingLayer = new TileLayer({
            // preload: Infinity,
            title: imagerySet[imagerySetKey].name,
            baseLayer: true,
            visible: visible,
            source: new Bing({
                key: "AlLccSQ-txfa4gfzC0XxrNaFanQ_jpD0toWcG-VnLEEwF5M3_mCmg_TVrPADz_pe",
                imagerySet: imagerySet[imagerySetKey].type
            })
        });
        return bingLayer;
    }


    addBaseLayers () {
        let bingImgSet = ["AL", "RD", "A", "CD", "OS"];
        let baseLayers = [this.getStamenLayer(), this.getOSMLayer()];
        for (let i in bingImgSet) {
            let visible = (bingImgSet[i] == "AL" ? true : false);
            baseLayers.push(this.getBingLayer(bingImgSet[i], visible));
        }
        let olBaseLayer = new Group({
            title: "Base-Layers",
            name: "base",
            openInLayerSwitcher: false,
            layers: baseLayers
        });
        // this.getMap().addLayer(olBaseLayer, "base", true);
        this._map.addLayer(olBaseLayer);
    }
    //</editor-fold>

    //</editor-fold>
}

export default OLMapVM;
