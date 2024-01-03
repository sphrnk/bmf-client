import {apiSlice} from "../api/apiSlice";
import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import FileDownload from "js-file-download";

const backendURL = process.env.REACT_APP_BACKEND_URL

const filesAdapter = createEntityAdapter({})
const initialState = filesAdapter.getInitialState()

export const filesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadFile: builder.mutation({
            query: body => {
                return {
                    url: '/files/upload',
                    method: 'POST',
                    // credentials: 'include',
                    body,
                    formData: true
                }
            },
        }),
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
                return {
                    url: `/files/?path=${body.path}`,
                    // keepUnusedDataFor: 5,
                    validateStatus: (response, result) => {
                        return (response.status === 200 || 304) && !result.error
                    },
                }
            },
            transformResponse: responseData => {
                const loadedFiles = responseData.data.files.map((file) => {
                    return file;
                })
                return filesAdapter.setAll(initialState, loadedFiles);
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
        downloadFile: builder.query({
            query: (path) => {
                return {
                    url: `/files/download/?path=${path}`,
                    method: 'GET',
                    // responseHandler: async (response) => await response,
                    validateStatus: (response, result) => {
                        return (response.status === 200 || 304) && !result.error
                    },
                    responseType: 'blob',
                }
            },
            // transformResponse: (responseData, meta, arg) => {
            //     console.log(responseData);
            //     return responseData;
            //     // FileDownload(responseData.data, requestData.fileName)
            // },
        }),
        deleteFile: builder.mutation({
            query: (path) => {
                return {
                    url: `/files/?path=${path}`,
                    method: 'DELETE',
                    // credentials: 'include',
                    // formData: true
                }
            }
        }),
        createFolder: builder.mutation({
            query: (body) => {
                return {
                    url: `/files/folders`,
                    method: 'POST',
                    // credentials: 'include',
                    body: {
                        folderName: body.folderName,
                        path: body.path,
                    },
                    // formData: true
                }
            }
        }),
        moveFile: builder.mutation({
            query: (body) => {
                // const {sourcePath, destinationPath} = body;
                return {
                    url: `/files/move`,
                    method: 'PATCH',
                    body: {
                        files: body,
                    },
                }
            },
            invalidatesTags: (result, error, {id}) => [{type: 'Files', id}],
        }),
    })
})

export const {
    useGetFilesQuery,
    useGetFileQuery,
    useMoveFileMutation,
    useCreateFolderMutation,
    useUploadFileMutation,
    useDownloadFileQuery,
    useDeleteFileMutation
} = filesApiSlice

export const selectFileResult = filesApiSlice.endpoints.getFiles.select();

const selectFileData = createSelector(selectFileResult, fileResult => fileResult.data)

export const {
    selectAll: selectAllFiles,
    selectById: selectFileById,
    selectIds: selectFilesIds,
} = filesAdapter.getSelectors(state => selectFileData(state) ?? initialState)