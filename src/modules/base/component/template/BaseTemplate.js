import React from "react";
import TopAppBar from "../molecule/TopAppBar";
import BottomAppBar from "../molecule/BottomAppBar";
import Snackbar from "../molecule/Snackbar";

const BaseTemplate = (props) => {
    return (
        <React.Fragment>
            <TopAppBar/>
            <BottomAppBar/>
            <Snackbar id={"alert-box"}/>
        </React.Fragment>
    );
};

export default BaseTemplate;
