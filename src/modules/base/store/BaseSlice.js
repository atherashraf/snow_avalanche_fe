import {createSlice} from "@reduxjs/toolkit";



export const baseSlice = createSlice({
    name: "base",
    initialState: {
        isTransparent: true,
        isAuthenticationRequired: true,
        isLeftDrawerVisible: true,
        leftDrawerOpen: false,
        maxDrawerWidth: 240,
        jqxTheme: "fresh",
        drawerItemCount : 0,
        nextURL: "/"
    },
    reducers: {
        setLeftDrawerVisibility: (state,action) => {
            state.isLeftDrawerVisible = action.payload;
        },
        expandLeftDrawer: state => {
            // console.log("item count ", state.drawerItemCount);
            if(state.drawerItemCount > 0)
                state.leftDrawerOpen = true;
        },
        collapseLeftDrawer: state => {
            state.leftDrawerOpen = false;
        },
        setLeftDrawerOpenState: (state, action) => {

            if (typeof (action.payload) === "boolean")
                state.leftDrawerOpen = action.payload;
            else
                state.leftDrawerOpen = !state.leftDrawerOpen;

        },
        setDrawerItemCount: (state, action)=>{
            console.log("items", state.drawerItemsCount);
            state.drawerItemsCount = action.payload;
            console.log("items", state.drawerItemsCount);
        },
        setTransparency:(state,action) =>{
            if(typeof(action.payload) === "boolean")
                state.isTransparent = action.payload;
            else
                console.error("Can't set transparency other than boolean");
        },
        setAuthenticationRequired: (state, action) => {
            state.isAuthenticationRequired = action.payload;
        },
        setJqxTheme:(state , action)=>{
            state.jqxTheme = action.payload;
        },
        setNextURL : (state, action) =>{
            state.nextURL = action.payload;
        }
    }
});

export const {expandLeftDrawer, collapseLeftDrawer, setLeftDrawerOpenState, setLeftDrawerVisibility,
    setTransparency, setJqxTheme, setDrawerItemCount, setAuthenticationRequired, setNextURL} = baseSlice.actions;

// export const actions  = baseSlice.actions;
// export const isLeftDrawerOpen = state => state.base.leftDrawerOpen;


const baseReducer =  baseSlice.reducer;
export default baseReducer;
