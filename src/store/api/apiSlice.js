import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {setCredentials, logout} from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    // credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.userToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token');
        const refreshTokenResult = await baseQuery('/users/refresh', api, extraOptions);
        if (refreshTokenResult?.data) {
            const user = api.getState().auth.user
            api.dispatch(setCredentials({...refreshTokenResult.data, user}))

            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout());
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users'],
    endpoints: builder => ({})
})