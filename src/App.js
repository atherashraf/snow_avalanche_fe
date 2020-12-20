import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainPage from "./modules/base/container/MainPage";
import {ThemeProvider} from "@material-ui/core/styles";
import {theme} from "./provider/theme";
import store from "./provider/store";
import {Provider} from "react-redux";
import MapContainer from "./modules/map/container/MapContainer";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <CssBaseline/>
                <Router>
                    <Switch>
                        <ProtectedRoute path={"/map"} component={MapContainer} />
                        <Route path={"/"} component={MainPage} />
                    </Switch>
                </Router>
            </Provider>
        </ThemeProvider>
    );
};


export default App;
