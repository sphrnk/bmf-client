import {createSlice} from "@reduxjs/toolkit";
import {updatePassword} from './auth-actions'

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : ""


const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            state.userToken = action.payload.token
            state.userInfo = action.payload.user
        }
    },
    extraReducers: {
        // login user
        [updatePassword.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [updatePassword.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.userToken
        },
        [updatePassword.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },
        // register user reducer...
    },
})

export const authActions = authSlice.actions;

export default authSlice.reducer