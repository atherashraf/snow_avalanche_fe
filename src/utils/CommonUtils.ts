import jss from "jss";
import preset from "jss-preset-default";
import clsx from "clsx";
import {AlertType, snackbarActions} from "../modules/base/store/SnackbarSlice";
import store from "../provider/store";
import {setAuthenticationRequired, setTransparency, setLeftDrawerVisibility, setNextURL} from "../modules/base/store/BaseSlice";

class CommonUtils {
    // static getNextUrl (searchString: string) {
    //     const obj = qs.parse(searchString, {
    //         ignoreQueryPrefix: true
    //     });
    //     for (let key in obj)
    //         // @ts-ignore
    //         if (key.indexOf("next" !== -1))
    //             return obj[key];
    //     const next = CommonUtils.getStoredNextURL();
    //     return "/";
    // }

    static showSnackbar (msg: string, alertType: any = AlertType.info) {
        store.dispatch(snackbarActions.showSnackbar({msg: msg, alertType: alertType}));
    }

    static isAuthenticationRequired (required: boolean) {
        store.dispatch(setAuthenticationRequired(required));
    }

    static isBaseTemplateTransparent (transparency: boolean, visible: boolean = true) {
        store.dispatch(setTransparency(transparency));
        this.isLeftDrawerVisible(visible);
        // if(transparency === true)
        //     CommonUtils.setNextURL(window.location.pathname);

    }

    static isLeftDrawerVisible (visibility: boolean) {
        store.dispatch(setLeftDrawerVisibility(visibility));
    }

    static setNextURL (next: any) {
        // console.log("next", next);
        // if(["/","/logout"].indexOf(next) === -1)
        store.dispatch(setNextURL(next));
        // else
        //     store.dispatch(setNextURL("/"));
    }

    static getNextURL () {
        // alert("getting:"+store.getState().base.nextURL);
        return store.getState().base.nextURL;
    }

    static convertStyle2Classes (styles: {}) {
        jss.setup(preset());
        const {classes} = jss.createStyleSheet(styles).attach();
        return classes;
    }

    static getContentClasses (theme: any, maxDrawerWidth: number = 240, isLeftDrawerOpen: boolean = false) {
        const styles = {
            content: {
                padding: theme.spacing(10) + 1,
                [theme.breakpoints.down("sm")]: {
                    paddingLeft: theme.spacing(3),
                    paddingRight: theme.spacing(3)
                }
            },
            contentShift: {
                [theme.breakpoints.up("sm")]: {
                    marginLeft: maxDrawerWidth + 5,
                    width: `calc(100% - ${maxDrawerWidth}px)`,
                    transition: theme.transitions.create(["width", "margin"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen
                    })
                }

            }
        };
        const classes = CommonUtils.convertStyle2Classes(styles);
        // @ts-ignore
        return clsx(classes.content, {[classes.contentShift]: isLeftDrawerOpen});
    }

    static getBackToMainPage () {
        if (window.location.pathname !== "/")
            window.location.href = "/";
    }

    // static getUserInfo (): any {
    //     console.log("user info", store.getState().user.userInfo);
    //     return store.getState().user.userInfo;
    // }
}

export default CommonUtils;
