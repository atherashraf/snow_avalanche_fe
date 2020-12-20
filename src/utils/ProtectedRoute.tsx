import React from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import CommonUtils from "../utils/CommonUtils";


let ProtectedRoute: (props: any) => any;
ProtectedRoute = (props: any) => {
    const Component: any = props.component;
    const {params} = props.computedMatch;
    const isAuthenticated: boolean = useSelector((state: any) => state.auth.isAuthenticated);
    // CommonUtils.setNextURL(window.location.pathname);
    // @ts-ignore
    return (isAuthenticated ? <Component params={params}/> : <Redirect to={{pathname: "/"}}/>);
};
export default ProtectedRoute;
