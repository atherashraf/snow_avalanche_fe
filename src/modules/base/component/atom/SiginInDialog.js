import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Api from "../../../../utils/Api";
import CommonUtils from "../../../../utils/CommonUtils";
import {AlertType} from "../../store/SnackbarSlice";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/AuthSlice";


const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    },
    dialogTitle: {
        color: "red"
    }
}));

const SignInDialog = (props, ref) => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("snow_avalanche");
    const [pwd, setPwd] = useState("snow_ath_avalanche_1@3");
    const dispatch = useDispatch();
    const classes = useStyles();

    const signInDialogRef = useRef();
    useImperativeHandle(ref, () => ({
        handleOpen: (event) => {
            setOpen(true);
        }
    }));
    const handleClose = () =>{
        setOpen(false);
    };
    const handleSubmit = () => {
        const data = {
            username: username,
            password: pwd
        };
        Api.authenticationServices(data)
            .then((payload)=>{
                if(payload){
                    dispatch(authActions.setToken(payload));
                    CommonUtils.showSnackbar("Welcome to Snow avalanche app...", AlertType.success);
                }
                handleClose();
            });
    };
    return(
        <div ref={signInDialogRef}>
            <Dialog open={open} onClose={handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" >
                    <span > Sign In </span>
                </DialogTitle>

                <DialogContent>
                    <TextField  // autoFocus // type="email"
                        margin="dense" id="id_username" value={username}
                        name="username" label="User Name" fullWidth
                        onChange={(event)=> setUsername(event.target.value)}
                    />
                    <TextField
                        margin="dense" id="id_password" label="Password"
                        name="password" type="password" fullWidth value={pwd}
                        onChange={(event)=> setPwd(event.target.value)}
                    />
                    {/*<input type="hidden" name="csrfmiddlewaretoken" value={csrf_token}/>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                            Close
                    </Button>
                    <Button onClick={handleSubmit} value={"Submit"}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default  forwardRef(SignInDialog);
