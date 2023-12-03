import {apiSlice} from "../api/apiSlice";

const backendURL = process.env.REACT_APP_BACKEND_URL

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/users/login',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
})

export const {useLoginMutation} = authApiSlice