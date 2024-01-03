import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    files: [],
    uploadFilePercentage: 0,
    pathObj: [{id: 1, name: 'Clients', path: '/'}],
    isUploading: false,
    notification: null,
    selectedRows: [],
    createFolderModal: false,
    showUploadFileModal: false,
    showMoveFile: false,
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
        selectPath(state, action) {
            const newPath = state.pathObj.filter((path) => path.id <= action.payload.id)
            state.pathObj = newPath;
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
        showMoveFileAction(state) {
            state.showMoveFile = true
        },
        hideMoveFileAction(state) {
            state.showMoveFile= false
        },

        setSelectedRows(state, action) {
            state.selectedRows = action.payload;
        }
    },
    // middleware: (getDefaultMiddleware)=> getDefaultMiddleware()
})

export const portalActions = portalSlice.actions;

export default portalSlice.reducer;