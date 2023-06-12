import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    files: [],
    uploadFilePercentage: 0,
    pathObj: [{id: 1, name: 'Clients', path: '/'}],
    isUploading: false,
    notification: null,
    createFolderModal: false,
    showUploadFileModal: false,
    isFileViewerOpen: false,
    file: null,
    excelFile: null,
}

const portalSlice = createSlice({
    name: 'portal',
    initialState,
    reducers: {
        changePath(state, action) {
            const newPath = {
                id: state.pathObj[state.pathObj.length - 1].id + 1,
                name: action.payload.path,
                path: state.pathObj[state.pathObj.length - 1].path + action.payload.path + '/'
            }
            state.pathObj = [...state.pathObj, newPath]
        },
        replaceFiles(state, action) {
            state.files = action.payload.files
        },
        setIsUploading(state, action) {
            state.isUploading = action.payload;
        },
        setUploadFilePercentage(state, action) {
            state.uploadFilePercentage = action.payload
        },
        setFile(state, action) {
            state.file = action.payload
        },
        setExcelFile(state, action) {
            state.excelFile = action.payload
        },
        removeAllFiles(state) {
            state.file = null;
            state.excelFile = null;
        },
        showFileViewer(state) {
            state.isFileViewerOpen = true
        },
        hideFileViewer(state) {
            state.isFileViewerOpen = false
        },
        showCreateFolderModal(state) {
            state.createFolderModal = true
        },
        hideCreateFolderModal(state) {
            state.createFolderModal = false
        },
        showUploadFileModal(state) {
            state.uploadFileModal = true
        },
        hideUploadFileModal(state) {
            state.uploadFileModal = false
        },
        upOneLevel(state, action) {
            state.pathObj.pop();
        },
        homePage(state) {
            const firstPath = state.pathObj[0];
            state.pathObj = [firstPath]
        }
    },
    // middleware: (getDefaultMiddleware)=> getDefaultMiddleware()
})

export const portalActions = portalSlice.actions;

export default portalSlice.reducer;