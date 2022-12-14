import {configureStore} from "@reduxjs/toolkit";
// import uiReducer from './-slice';
import uiReducer from './ui-slice';

const store = configureStore({
    reducer: {
        ui: uiReducer,
    },
});
export default store;