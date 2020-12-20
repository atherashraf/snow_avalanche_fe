import {createMuiTheme} from "@material-ui/core/styles";
export const topBarHeight= "65px";
export const bottomBarHeight="25px";
export const remainingHeight = `calc(100vh - ${topBarHeight} - ${bottomBarHeight})`;

const AppBarBgColorPrimary1 = "#547c60";
const AppBarBgColorPrimary2 =  "#245d40";
const AppBarBgColorPrimary3 = "#245d40";
const AppBarBgColorSecondary = "#7c9884";

// export const AppBgColorPrimary = "#7c9884";
// export const AppColorPrimary = "white"; //#EADD5D;
//
// export const AppBgColor = "#b8c5bc";
export const LinearGradient = `linear-gradient(to right, ${AppBarBgColorPrimary1} 40%, ${AppBarBgColorPrimary2} 80%, ${AppBarBgColorPrimary3})`;
export const theme = createMuiTheme({
    palette: {
        primary: {
            main: AppBarBgColorPrimary3,
            contrastText: "#fff"
        },
        secondary: {
            main: AppBarBgColorSecondary,
            contrastText: "#79aec8"  //#c4dce8
        },
        action: {active: "#f5dd5d"},

        contrastThreshold: 3,
        tonalOffset: 0.2
    }
});
