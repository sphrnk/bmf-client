import {configureStore} from "@reduxjs/toolkit";
// import uiReducer from './-slice';
import uiReducer from './ui-slice';
import portalReducer from './file/portal-slice'
import clientReducer from './client/client-slice'
import authReducer from './auth/authSlice'
import {apiSlice} from './api/apiSlice.js'
import {setupListeners} from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        ui: uiReducer,
        portal: portalReducer,
        clients: clientReducer,
        // panel: panelReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});
export default store;

setupListeners(store.dispatch);