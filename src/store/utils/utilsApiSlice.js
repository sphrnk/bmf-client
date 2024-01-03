import {apiSlice} from "../api/apiSlice";
import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_BACKEND_URL

const utilsAdapter = createEntityAdapter({})
const initialState = utilsAdapter.getInitialState()

export const utilsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        validateZipcode: builder.mutation({
            query: body => {
                // console.log(body);
                return {
                    url: '/utils/zipCode',
                    method: 'POST',
                    // credentials: 'include',
                    body,
                    // formData: true
                }
            }
        }),
        resendEmail: builder.query({
            query: (id) => {
                return {
                    url: `/users/${id}/resendEmail`,
                    method: 'GET',
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
    useValidateZipcodeMutation
    // useGetUtilQuery,
    // useResendEmailMutation,
    // useUpdateTempPasswordMutation,
    // useCreateUtilMutation,
    // useUpdateUtilMutation,
    // useDeleteUtilMutation
} = utilsApiSlice

// export const selectUtilResult = utilsApiSlice.endpoints.getUtils.select();

// const selectUtilData = createSelector(selectUtilResult, utilResult => utilResult.data)
//
// export const {
//     selectAll: selectAllUtils,
//     selectById: selectUtilById,
//     selectIds: selectUtilsIds,
// } = utilsAdapter.getSelectors(state => selectUtilData(state) ?? initialState)