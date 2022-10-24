import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sidebarIsVisible: false,
    logoutIsVisible: false,
    notification: null,
};
const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggle(state) {
            state.sidebarIsVisible = !state.sidebarIsVisible;
        },
        toggleLogout(state) {
            state.logoutIsVisible = !state.logoutIsVisible;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
