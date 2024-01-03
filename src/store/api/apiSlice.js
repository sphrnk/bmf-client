import {createApi} from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import {setCredentials, logout} from '../auth/authSlice';

// Custom base query using Axios
const axiosBaseQuery = ({baseUrl} = {baseUrl: ''}) => async (args, api, extraOptions) => {
    if (baseUrl === '') {
        baseUrl = process.env.REACT_APP_BACKEND_URL;
    }
    try {
        // Get the token from the state
        const token = api.getState().auth.userToken;

        // Set up headers
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Prepare Axios request configuration
        const config = {
            url: baseUrl + args.url,
            method: args.method,
            withCredentials: true,
            data: args.body,
            headers: headers,
            onUploadProgress: (progressEvent) => {
                // Handle the progress event here
                // For example, you can calculate and log the percentage of the uploaded file
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload Progress: ${percentCompleted}%`);
            }
        };
        console.log(config);
        // Make the Axios request
        const result = await axios(config);

        return {data: result.data};
    } catch (axiosError) {
        let err = axiosError;
        return {error: {status: err.response?.status, data: err.response?.data}};
    }
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await axiosBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL})(args, api, extraOptions);

    if (result.error?.status === 403) {
        console.log('sending refresh token');
        const refreshTokenResult = await axiosBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL})('/users/refresh', api, extraOptions);

        if (refreshTokenResult.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({...refreshTokenResult.data, user}));

            result = await axiosBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL})(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users'],
    endpoints: builder => ({})
});