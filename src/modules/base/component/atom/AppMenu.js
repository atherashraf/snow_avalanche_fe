import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {useHistory} from "react-router";


const AppMenu=(props, ref)=>{
    const appMenuEl = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    useImperativeHandle(ref, () => ({
        handleMenu: (event) => {
            setAnchorEl(event.currentTarget);
        }
    }));
    const handleClose=()=>{
        setAnchorEl(null);
    };
    const handleHome = () => {
        handleClose();
        history.push("/");
    };
    const handleSnowAvalanche=()=>{
        handleClose();
        history.push("/map");
    };
    return(
        <div ref={appMenuEl}>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={open}
                onClose={handleHome}
            >
                <MenuItem onClick={handleHome}>Home</MenuItem>
                <MenuItem onClick={handleSnowAvalanche}>Snow Avalanche</MenuItem>
            </Menu>
        </div>
    );
};

export default forwardRef(AppMenu);
