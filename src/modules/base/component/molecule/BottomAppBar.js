import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {bottomBarHeight, LinearGradient} from "../../../../provider/theme";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    appBar: {
        top: "auto",
        bottom: 0,
        background: LinearGradient,
        height:bottomBarHeight
    },
    title: {
        textAlign: "center",
        margin: theme.spacing(1),
        fontSize: "11px"
    }
}));

const BottomAppBar = () => {
    const classes = useStyles();
    return(
        <React.Fragment>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                {/*<Toolbar>/!* content *!/</Toolbar>*/}
                <Typography variant="h6" className={classes.title}>
                    Powered by: Dr. Ather Ashraf
                </Typography>
            </AppBar>
        </React.Fragment>
    );
};

export default BottomAppBar;
