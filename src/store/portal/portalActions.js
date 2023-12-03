import {apiSlice} from "../api/apiSlice";
import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_BACKEND_URL

const clientsAdapter = createEntityAdapter({})
const initialState = clientsAdapter.getInitialState()

export const clientsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBusinessPortal: builder.query({
            query: (data) => ({
                url: `/users/${data.userId}/portals/business/${data.portalId}`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                // console.log(responseData);
                const loadedPortal = responseData.data.data.map(portal => {
                    return portal;
                })
                console.log(loadedPortal);
                return loadedPortal;
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'BusinessPortal', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'BusinessPortal', id}))
                    ]
                } else return [{type: 'BusinessPortal', id: 'LIST'}]
            }
        }),
        getIndividualPortal: builder.query({
            query: (data) => ({
                url: `/users/${data.userId}/portals/individual/${data.portalId}`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                // console.log(responseData);
                const loadedPortal = responseData.data.data.map(portal => {
                    return portal;
                })
                console.log(loadedPortal);
                return loadedPortal;
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'IndividualPortal', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'IndividualPortal', id}))
                    ]
                } else return [{type: 'IndividualPortal', id: 'LIST'}]
            }
        }),
        getBusinessPortals: builder.query({
            query: (data) => ({
                url: `/users/${data.userId}/portals/business/${data.portalId}`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                // console.log(responseData);
                const loadedPortals = responseData.data.data.map(portal => {
                    return portal;
                })
                console.log(loadedPortals);
                return clientsAdapter.setAll(initialState, loadedPortals);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'BusinessPortals', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'BusinessPortals', id}))
                    ]
                } else return [{type: 'BusinessPortals', id: 'LIST'}]
            }
        }),
        getIndividualPortals: builder.query({
            query: (data) => ({
                url: `/users/${data.userId}/portals/individual/${data.portalId}`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                // console.log(responseData);
                const loadedPortals = responseData.data.data.map(portal => {
                    return portal;
                })
                console.log(loadedPortals);
                return clientsAdapter.setAll(initialState, loadedPortals);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'IndividualPortals', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'IndividualPortals', id}))
                    ]
                } else return [{type: 'IndividualPortals', id: 'LIST'}]
            }
        }),
        createBusinessPortal: builder.mutation({
            query: body => {
                // console.log(body);
                return {
                    url: `/users/${data.userId}/portals/business/`,
                    method: 'POST',
                    // credentials: 'include',
                    body,
                    // formData: true
                }
            }
        }),
        createIndividualPortal: builder.mutation({
            query: body => {
                // console.log(body);
                return {
                    url: `/users/${data.userId}/portals/individual/`,
                    method: 'POST',
                    // credentials: 'include',
                    body,
                    // formData: true
                }
            }
        }),
        updateBusinessPortal: builder.mutation({
            query: data => ({
                url: `/users/${data.userId}/portals/business/${data.portalId}`,
                method: 'PATCH',
                body: {
                    ...data,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'BusinessPortal', id: arg.id}
            ]
        }),
        updateIndividualPortal: builder.mutation({
            query: data => ({
                url: `/users/${data.userId}/portals/individual/${data.portalId}`,
                method: 'PATCH',
                body: {
                    ...data,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'IndividualPortal', id: arg.id}
            ]
        }),
        deleteBusinessPortal: builder.mutation({
            query: (id) => {
                console.log(id);
                return {
                    url: `/users/${data.userId}/portals/business/${data.portalId}`,
                    method: 'DELETE',
                    // credentials: 'include',
                    body: {
                        id
                    },
                    // formData: true
                }
            }
        }),
        deleteIndividualPortal: builder.mutation({
            query: (id) => {
                console.log(id);
                return {
                    url: `/users/${data.userId}/portals/individual/${data.portalId}`,
                    method: 'DELETE',
                    // credentials: 'include',
                    body: {
                        id
                    },
                    // formData: true
                }
            }
        }),
    })
})

export const {
    useGetBusinessPortalsQuery,
    useGetIndividualPortalsQuery,
    useGetBusinessPortalQuery,
    useGetIndividualPortalQuery,
    useCreateBusinessPortalMutation,
    useUpdateIndividualPortalMutation,
    useDeleteBusinessPortalMutation,
    useDeleteIndividualPortalMutation
} = clientsApiSlice

export const selectBusinessPortalResult = clientsApiSlice.endpoints.getBusinessPortals.select();
export const selectIndividualPortalResult = clientsApiSlice.endpoints.getIndividualPortals.select();

const selectBusinessPortalData = createSelector(selectBusinessPortalResult, portalResult => portalResult.data)
const selectIndividualPortalData = createSelector(selectIndividualPortalResult, portalResult => portalResult.data)

export const {
    selectAll: selectAllBusinessPortals,
    selectById: selectBusinessPortalById,
    selectIds: selectBusinessPortalsIds,
} = clientsAdapter.getSelectors(state => selectBusinessPortalData(state) ?? initialState)

export const {
    selectAll: selectAllIndividualPortals,
    selectById: selectIndividualPortalById,
    selectIds: selectIndividualPortalsIds,
} = clientsAdapter.getSelectors(state => selectIndividualPortalData(state) ?? initialState)