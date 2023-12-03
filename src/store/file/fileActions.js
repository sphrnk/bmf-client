import {apiSlice} from "../api/apiSlice";
import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_BACKEND_URL

const filesAdapter = createEntityAdapter({})
const initialState = filesAdapter.getInitialState()

export const filesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFile: builder.query({
            query: (id) => ({
                url: `/files/${id}`,
                // keepUnusedDataFor: 5,
                validateStatus: (response, result) => {
                    return (response.status === 200 || 304) && !result.error
                },
            }),
            transformResponse: responseData => {
                // console.log(responseData);
                const loadedFile = responseData.data.data.map(file => {
                    return file;
                })
                console.log(loadedFile);

                return loadedFile;
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'File', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'File', id}))
                    ]
                } else return [{type: 'File', id: 'LIST'}]
            }
        }),
        getFiles: builder.query({
            query: (body) => {
                console.log(body);
                return {
                    url: `/files/?path=${body.path}`,
                    // keepUnusedDataFor: 5,
                    validateStatus: (response, result) => {
                        return (response.status === 200 || 304) && !result.error
                    },
                }
            },
            transformResponse: responseData => {
                console.log(responseData);
                const loadedFiles = responseData.data.files.map((file, id) => {
                    file.id = id;
                    return file;
                })
                console.log(loadedFiles);
                return filesAdapter.setAll(initialState, loadedFiles);
            },
            providesTags: (result, error, arg) => {
                console.log(result);
                if (result?.ids) {
                    return [
                        {type: 'File', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'File', id}))
                    ]
                } else return [{type: 'File', id: 'LIST'}]
            }
        }),
        createFile: builder.mutation({
            query: body => {
                // console.log(body);
                return {
                    url: '/files/',
                    method: 'POST',
                    // credentials: 'include',
                    body,
                    formData: true
                }
            }
        }),
        updateFile: builder.mutation({
            query: data => ({
                url: `/files/${data.id}`,
                method: 'PATCH',
                body: {
                    ...data,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'File', id: arg.id}
            ]
        }),
        deleteFile: builder.mutation({
            query: (id) => {
                console.log(id);
                return {
                    url: `/files/${id}`,
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
                console.log(id);
                return {
                    url: `/files/updateTempPassword`,
                    method: 'PATCH',
                    // credentials: 'include',
                    body: {
                        id
                    },
                    // formData: true
                }
            }
        }),
        resendEmail: builder.query({
            query: (id) => {
                console.log(id);
                return {
                    url: `/files/${id}/resendEmail`,
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
    useGetFilesQuery,
    useGetFileQuery,
    useResendEmailMutation,
    useUpdateTempPasswordMutation,
    useCreateFileMutation,
    useUpdateFileMutation,
    useDeleteFileMutation
} = filesApiSlice

export const selectFileResult = filesApiSlice.endpoints.getFiles.select();

const selectFileData = createSelector(selectFileResult, fileResult => fileResult.data)

export const {
    selectAll: selectAllFiles,
    selectById: selectFileById,
    selectIds: selectFilesIds,
} = filesAdapter.getSelectors(state => selectFileData(state) ?? initialState)