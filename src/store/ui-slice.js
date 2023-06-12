import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sidebarIsVisible: false,
    logoutIsVisible: false,
    notification: {
        open: false,
        status: 'success',
        message: '',
        vertical: 'bottom',
        horizontal: 'right',
    },
    spinnerLoading: false,
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
                open: true,
                status: action.payload.status,
                message: action.payload.message,
                vertical: 'bottom',
                horizontal: 'right',
            };
        },
        showSpinnerLoading(state) {
            state.spinnerLoading = true;
        },
        hideNotification(state) {
            state.notification = {
                open: false,
                status: 'success',
                message: '',
                vertical: 'bottom',
                horizontal: 'right',
            };
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
