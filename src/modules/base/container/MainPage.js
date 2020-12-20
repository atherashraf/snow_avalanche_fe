import * as React from "react";
import BaseTemplate from "../component/template/BaseTemplate";
import makeStyles from "@material-ui/core/styles/makeStyles";
import "../../../static/css/MainPage.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import {remainingHeight} from "../../../provider/theme";
const useStyles = makeStyles(theme => ({
    root: {
        height: "100px"
        // height: `calc(100vh - ${topBarHeight} - ${bottomBarHeight})`
    }
}));
const MainPage =()=> {
    const classes = useStyles;
    return(
        <React.Fragment>
            <CssBaseline />
            <BaseTemplate />
            <div id={"div-main-contents"} style={{height: remainingHeight}}>
                <div id="mask">
                    <div id="content">
                        <h1>AKAH <br/><span>Snow Avalanche</span> <br/> Repository</h1>
                        <p/>
                        <h3>Comming Soon</h3>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MainPage;
