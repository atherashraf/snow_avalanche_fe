import "../styles/ol-map-vm.css";
import * as React from "react";
import BaseTemplate from "../../base/component/template/BaseTemplate";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {remainingHeight} from "../../../provider/theme";
import OLMapVM from "../view_model/MapViewModel";
import {useEffect} from "react";
const useStyles = makeStyles(theme => ({
    root: {
        height: "100px"
        // height: `calc(100vh - ${topBarHeight} - ${bottomBarHeight})`
    }
}));

const initExtent = [7926730.2424, 4097644.4256, 8648557.8475, 4441147.611];
const mapZoomLevel = 6;
export const olMapVM = new OLMapVM(initExtent, mapZoomLevel);

const MapContainer =()=> {
    const classes = useStyles;
    useEffect(()=>{
        olMapVM.initMapPanel("div-map-cmp");
    }, []);
    return(
        <React.Fragment>
            <BaseTemplate />
            <CssBaseline />

            <div id={"div-map-cmp"} style={{height: remainingHeight}}>
                {/*<h1>Welcome to map</h1>*/}
                {/*<MapOutputRSide ref={this.drawerOutputRSideRef}/>*/}
                {/*<div id="popup" className="ol-popup">*/}
                {/*    <a href="#" id="popup-closer" className="ol-popup-closer"></a>*/}
                {/*    <div id="popup-content"></div>*/}
                {/*</div>*/}
                {/*<MapSidePanel/>*/}
                {/*<DaDialogBox ref={this.mapDialogBoxRef}/>*/}
            </div>

        </React.Fragment>
    );
};

export default MapContainer;
