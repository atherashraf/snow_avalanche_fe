import {configureStore} from "@reduxjs/toolkit";
import baseReducer from "../modules/base/store/BaseSlice";
import {snackbarReducer} from "../modules/base/store/SnackbarSlice";
import {authReducer} from "../modules/base/store/AuthSlice";

const store =  configureStore({
    reducer: {
        base: baseReducer,
        snackbar:snackbarReducer,
        auth: authReducer
    }
});

export default store;
