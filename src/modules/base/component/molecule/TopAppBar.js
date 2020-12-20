import React, {useRef, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {AccountCircle, ExitToApp} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {LinearGradient, topBarHeight} from "../../../../provider/theme";
import logo from "../../../../static/img/AKDN-logo.png";
import UserMenu from "../atom/UserMenu";
import SignInDialog from "../atom/SiginInDialog";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/AuthSlice";
import CommonUtils from "../../../../utils/CommonUtils";
import {AlertType} from "../../store/SnackbarSlice";
import AppMenu from "../atom/AppMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    logo: {
        height: "50px",
        paddingRight: theme.spacing(3)
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        height: topBarHeight,
        background: LinearGradient
    }
}));

const TopAppBar = () => {
    const classes = useStyles();
    // const [login, setLogin] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const userMenuEl = useRef();
    const appMenuEl = useRef();
    const signInDialogRef = useRef();
    const handleSigIn = (event) => {
        // console.log(login);
        if (isAuthenticated)
            userMenuEl.current.handleMenu(event);
        else
            signInDialogRef.current.handleOpen(event);
        // setLogin(true);
    };
    const handleSignOut = () => {
        // setLogin(false);
        dispatch(authActions.logout(false));
        CommonUtils.showSnackbar("Thanks for using this app...", AlertType.success);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={(event)=>
                            isAuthenticated ? appMenuEl.current.handleMenu(event):
                                CommonUtils.showSnackbar("Please sign in to see menu list... ")}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img src={logo} className={classes.logo}/>
                    <Typography variant="h6" className={classes.title}>
                        Aga Khan Agency for Habitat
                    </Typography>
                    <IconButton onClick={handleSigIn} color="inherit">
                        {isAuthenticated ? <AccountCircle/> : <ExitToApp/>}
                    </IconButton>
                    <UserMenu ref={userMenuEl} handleSignOut={handleSignOut}/>
                    <AppMenu ref={appMenuEl}/>
                    <SignInDialog ref={signInDialogRef}/>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default TopAppBar;
