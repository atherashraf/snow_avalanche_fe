
import {createSlice} from "@reduxjs/toolkit";



export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: true,
        accessToken:null,
        refreshToken:null
    },
    reducers: {
        setToken (state, action) {
            state.isAuthenticated = true;
            // console.log("auth action", action);
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
        },
        logout (state) {
            state.isAuthenticated = false;
            state.accessToken=null;
            state.refreshToken=null;
        }
    }
});

export const authActions =  authSlice.actions;
export const authReducer =  authSlice.reducer;
// export default authReducer;
