import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";


const UserMenu=(props, ref)=>{
    const userMenuEl = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    useImperativeHandle(ref, () => ({
        handleMenu: (event) => {
            setAnchorEl(event.currentTarget);
        }
    }));

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout=()=>{
        props.handleSignOut();
        handleClose();
    };
    return(
        <div ref={userMenuEl}>
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
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
        </div>
    );
};

export default forwardRef(UserMenu);
