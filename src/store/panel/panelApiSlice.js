import {apiSlice} from "../api/apiSlice";
import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_BACKEND_URL

const panelsAdapter = createEntityAdapter({})
const initialState = panelsAdapter.getInitialState()

export const panelsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBusinessPanel: builder.query({
            query: (data) => ({
                url: `/users/${data.userId}/panels/business/${data.panelId}`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                // console.log(responseData);
                const loadedPanel = responseData.data.data.map(panel => {
                    return panel;
                })
                return loadedPanel;
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'BusinessPanel', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'BusinessPanel', id}))
                    ]
                } else return [{type: 'BusinessPanel', id: 'LIST'}]
            }
        }),
        getIndividualPanel: builder.query({
            query: (data) => ({
                url: `/users/${data.userId}/panels/individual/${data.panelId}`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                // console.log(responseData);
                const loadedPanel = responseData.data.data.map(panel => {
                    return panel;
                })
                return loadedPanel;
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'IndividualPanel', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'IndividualPanel', id}))
                    ]
                } else return [{type: 'IndividualPanel', id: 'LIST'}]
            }
        }),
        getBusinessPanels: builder.query({
            query: (data) => ({
                url: `/users/${data.userId}/panels/business/${data.panelId}`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                // console.log(responseData);
                const loadedPanels = responseData.data.data.map(panel => {
                    return panel;
                })
                return panelsAdapter.setAll(initialState, loadedPanels);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'BusinessPanels', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'BusinessPanels', id}))
                    ]
                } else return [{type: 'BusinessPanels', id: 'LIST'}]
            }
        }),
        getIndividualPanels: builder.query({
            query: (data) => ({
                url: `/users/${data.userId}/panels/individual/${data.panelId}`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                // console.log(responseData);
                const loadedPanels = responseData.data.data.map(panel => {
                    return panel;
                })
                return panelsAdapter.setAll(initialState, loadedPanels);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'IndividualPanels', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'IndividualPanels', id}))
                    ]
                } else return [{type: 'IndividualPanels', id: 'LIST'}]
            }
        }),
        createBusinessPanel: builder.mutation({
            query: body => {
                // console.log(body);
                return {
                    url: `/users/${body.userId}/panels/business/`,
                    method: 'POST',
                    // credentials: 'include',
                    body,
                    // formData: true
                }
            },
        }),
        createIndividualPanel: builder.mutation({
            query: body => {
                console.log(body);
                return {
                    url: `/users/${body.userId}/panels/individual/`,
                    method: 'POST',
                    // credentials: 'include',
                    body: {
                        ...body
                    },
                    // formData: true
                }
            }
        }),
        updateBusinessPanel: builder.mutation({
            query: data => ({
                url: `/users/${data.userId}/panels/business/${data.panelId}`,
                method: 'PATCH',
                body: {
                    ...data,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'BusinessPanel', id: arg.id}
            ]
        }),
        updateIndividualPanel: builder.mutation({
            query: data => ({
                url: `/users/${data.userId}/panels/individual/${data.panelId}`,
                method: 'PATCH',
                body: {
                    ...data,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'IndividualPanel', id: arg.id}
            ]
        }),
        deleteBusinessPanel: builder.mutation({
            query: (body) => {
                return {
                    url: `/users/${body.userId}/panels/business/${body.panelId}`,
                    method: 'DELETE',
                    // credentials: 'include',
                    body,
                    // formData: true
                }
            }
        }),
        deleteIndividualPanel: builder.mutation({
            query: (body) => {
                return {
                    url: `/users/${body.userId}/panels/individual/${body.panelId}`,
                    method: 'DELETE',
                    // credentials: 'include',
                    body,
                    // formData: true
                }
            }
        }),
    })
})

export const {
    useGetBusinessPanelsQuery,
    useGetIndividualPanelsQuery,
    useGetBusinessPanelQuery,
    useGetIndividualPanelQuery,
    useCreateIndividualPanelMutation,
    useCreateBusinessPanelMutation,
    useUpdateIndividualPanelMutation,
    useUpdateBusinessPanelMutation,
    useDeleteBusinessPanelMutation,
    useDeleteIndividualPanelMutation
} = panelsApiSlice

export const selectBusinessPanelResult = panelsApiSlice.endpoints.getBusinessPanels.select();
export const selectIndividualPanelResult = panelsApiSlice.endpoints.getIndividualPanels.select();

const selectBusinessPanelData = createSelector(selectBusinessPanelResult, panelResult => panelResult.data)
const selectIndividualPanelData = createSelector(selectIndividualPanelResult, panelResult => panelResult.data)

export const {
    selectAll: selectAllBusinessPanels,
    selectById: selectBusinessPanelById,
    selectIds: selectBusinessPanelsIds,
} = panelsAdapter.getSelectors(state => selectBusinessPanelData(state) ?? initialState)

export const {
    selectAll: selectAllIndividualPanels,
    selectById: selectIndividualPanelById,
    selectIds: selectIndividualPanelsIds,
} = panelsAdapter.getSelectors(state => selectIndividualPanelData(state) ?? initialState)