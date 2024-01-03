import {apiSlice} from "../api/apiSlice";
import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_BACKEND_URL

const businessPartnersAdapter = createEntityAdapter({})
const initialState = businessPartnersAdapter.getInitialState()

export const businessPartnersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBusinessPartner: builder.query({
            query: (data) => ({
                url: `/users/${data.userId}/panels/business/${data.panelId}/partners`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                // console.log(responseData);
                const loadedPartner = responseData.data.data.map(partner => {
                    return partner;
                })
                return loadedPartner;
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'BusinessPartner', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'BusinessPartner', id}))
                    ]
                } else return [{type: 'BusinessPartner', id: 'LIST'}]
            }
        }),
        getBusinessPartners: builder.query({
            query: (data) => ({
                url: `/users/${data.userId}/panels/business/${data.panelId}/partners`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                console.log(responseData);
                const loadedPartners = responseData.data.partners.map(partner => {
                    return partner;
                })
                return businessPartnersAdapter.setAll(initialState, loadedPartners);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'BusinessPartners', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'BusinessPartners', id}))
                    ]
                } else return [{type: 'BusinessPartners', id: 'LIST'}]
            }
        }),
        createBusinessPartner: builder.mutation({
            query: body => {
                console.log(body);
                return {
                    url: `/users/${body.userId}/panels/business/${body.panelId}/partners`,
                    method: 'POST',
                    // credentials: 'include',
                    body,
                    // formData: true
                }
            },
        }),
        updateBusinessPartner: builder.mutation({
            query: data => ({
                url: `/users/${data.userId}/panels/business/${data.panelId}/partners/${data.partnerId}`,
                method: 'PATCH',
                body: {
                    ...data,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'BusinessPartner', id: arg.id}
            ]
        }),
        deleteBusinessPartner: builder.mutation({
            query: (body) => {
                console.log(body);
                return {
                    url: `/users/${body.userId}/panels/business/${body.panelId}/partners/${body.partnerId}`,
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
    useGetBusinessPartnersQuery,
    useGetBusinessPartnerQuery,
    useCreateBusinessPartnerMutation,
    useUpdateBusinessPartnerMutation,
    useDeleteBusinessPartnerMutation
} = businessPartnersApiSlice

export const selectBusinessPartnerResult = businessPartnersApiSlice.endpoints.getBusinessPartners.select();

const selectBusinessPartnerData = createSelector(selectBusinessPartnerResult, businessPartnerResult => businessPartnerResult.data)

export const {
    selectAll: selectAllBusinessPartners,
    selectById: selectBusinessPartnerById,
    selectIds: selectBusinessPartnersIds,
} = businessPartnersAdapter.getSelectors(state => selectBusinessPartnerData(state) ?? initialState);