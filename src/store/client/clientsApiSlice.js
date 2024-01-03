import {apiSlice} from "../api/apiSlice";
import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_BACKEND_URL

const clientsAdapter = createEntityAdapter({})
const initialState = clientsAdapter.getInitialState()

export const clientsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getClient: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                console.log(responseData);
                return responseData.data.user;
            },
            providesTags: (result, error, arg) => {
                return [{type: 'Client', arg}]
            }

        }),
        getClients: builder.query({
            query: () => ({
                url: '/users/',
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                console.log(responseData.data);
                const loadedClients = responseData.data.users.map(client => {
                    return client;
                })
                return clientsAdapter.setAll(initialState, loadedClients);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Client', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Client', id}))
                    ]
                } else return [{type: 'Client', id: 'LIST'}]
            }
        }),
        createClient: builder.mutation({
            query: body => {
                // console.log(body);
                return {
                    url: '/users/',
                    method: 'POST',
                    // credentials: 'include',
                    body,
                    // formData: true
                }
            }
        }),
        updateClient: builder.mutation({
            query: data => ({
                url: `/users/${data.id}`,
                method: 'PATCH',
                body: {
                    ...data,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Client', id: arg.id}
            ]
        }),
        deleteClient: builder.mutation({
            query: (id) => {
                return {
                    url: `/users/${id}`,
                    method: 'DELETE',
                    // credentials: 'include',
                    body: {
                        id
                    },
                    // formData: true
                }
            }
        }),
        updateTempPassword: builder.mutation({
            query: (id) => {
                return {
                    url: `/users/updateTempPassword`,
                    method: 'PATCH',
                    // credentials: 'include',
                    body: {
                        id
                    },
                    // formData: true
                }
            }
        }),
        resendEmail: builder.mutation({
            query: (id) => {
                console.log(id);
                return {
                    url: `/users/${id}/resendEmail`,
                    method: 'POST',
                    // credentials: 'include',
                    // formData: true
                }
            }
        }),
    })
})

export const {
    useGetClientsQuery,
    useGetClientQuery,
    useResendEmailMutation,
    useUpdateTempPasswordMutation,
    useCreateClientMutation,
    useUpdateClientMutation,
    useDeleteClientMutation
} = clientsApiSlice

export const selectClientResult = clientsApiSlice.endpoints.getClients.select();

const selectClientData = createSelector(selectClientResult, clientResult => clientResult.data)

export const {
    selectAll: selectAllClients,
    selectById: selectClientById,
    selectIds: selectClientsIds,
} = clientsAdapter.getSelectors(state => selectClientData(state) ?? initialState)