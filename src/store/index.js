import {configureStore} from "@reduxjs/toolkit";
// import uiReducer from './-slice';
import uiReducer from './ui-slice';
import portalReducer from './portal/portal-slice'
import clientReducer from './client/client-slice'

const store = configureStore({
    reducer: {
        ui: uiReducer,
        portal: portalReducer,
        clients: clientReducer,
        // uploadFiles: uiReducer,
    },
});
export default store;