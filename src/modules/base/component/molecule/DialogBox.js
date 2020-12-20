import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {bindActionCreators} from "redux";
import {dialogBoxActions} from "../../../store/DialogBoxSlice";
import {connect} from "react-redux";
import CommonUtils from "../../../utils/CommonUtils";
import {withTheme} from "@material-ui/core";


class DialogBox extends React.Component{
    constructor (props) {
        super(props);
        this.descriptionElementRef = React.createRef();
    }

    componentDidMount () {
        if (this.props.open) {
            const {current: descriptionElement} = this.descriptionElementRef;
            if (descriptionElement !== null)
                descriptionElement.focus();

        }
    }
    getClasses (){
        const {theme} = this.props;
        const styles ={
            paper: {
                background: theme.palette.primary.dark,
                color: theme.palette.primary.contrastText,
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
            }
        };
        return  CommonUtils.convertStyle2Classes(styles);
    }

    render () {
        const classes = this.getClasses();
        return (
            <Dialog disableEnforceFocus
                open={this.props.open}
                onClose={this.props.hideDialogBox}
                scroll={this.props.scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                classes={{paper: classes.paper}}
            >
                <DialogTitle id="scroll-dialog-title" >{this.props.title}</DialogTitle>
                <DialogContent dividers={this.props.scroll === "paper"}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={this.descriptionElementRef}
                        tabIndex={-1}
                    >
                        {this.props.bodyContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/*{this.props.actions}*/}
                </DialogActions>
            </Dialog>

        );
    }
}

const mapStateToPropsFn = (state) =>{
    return state.dialogBox;
};

const mapDispatchToPropsFn = (dispatch)=>{
    return {...bindActionCreators(dialogBoxActions, dispatch)};
};

export default connect(mapStateToPropsFn,mapDispatchToPropsFn)(withTheme(DialogBox));
