import {createSlice} from '@reduxjs/toolkit'
import {userLogin} from "./authActions";

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null
const userInfo = localStorage.getItem('userInfo')
    ? localStorage.getItem('userInfo')
    : null

const initialState = {
    loading: false,
    userInfo, // for user object
    userToken, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            // localStorage.removeItem('userToken') // deletes token from storage
            // localStorage.removeItem('userInfo') // deletes token from storage
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        },
        setCredentials: (state, {payload}) => {
            const {token: userToken, user} = payload.data;
            console.log(user);
            console.log(userToken);
            state.userInfo = user;
            state.userToken = userToken;
        },
    },
})

export const {logout, setCredentials} = authSlice.actions
export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectCurrentToken = (state) => state.auth.userToken;
export default authSlice.reducer;
