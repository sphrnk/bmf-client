import {uiActions} from "../ui-slice";
import {portalActions} from "./portal-slice";
import useHttp from "../../hooks/use-http";
import {getFiles} from "../../lib/api/files";
import {useEffect} from "react";
import axios from "axios";
import FileDownload from "js-file-download";
import {read, utils} from 'xlsx';
import {fetchClientsData} from "../client/client-actions";

const DOMAIN = process.env.REACT_APP_BACKEND_URL;


export const fetchFilesData = (requestData) => {
    return async (dispatch) => {
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/files?path=${requestData.path}`, {
                method: "GET",
                headers: {
                    "Authorization": 'Bearer ' + requestData.token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Could not get Files.");
            }
            return await response.json();
        }
        try {
            let data = await fetchRequest()
            data.data.files.map((file, i) => file.id = i)
            dispatch(portalActions.replaceFiles({
                files: data.data.files,
            }))
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to load files'
            }))
        }
    }
}

export const fetchImgFileData = (requestData) => {
    return async (dispatch) => {
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/files/view?path=${requestData.path}`, {
                method: "GET",
                headers: {
                    "Authorization": 'Bearer ' + requestData.token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Could not get Img File.");
            }
            return await response.blob();
        }
        try {
            let data = await fetchRequest()
            const imgUrl = URL.createObjectURL(data);
            dispatch(portalActions.setImgUrl(imgUrl))
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to load image'
            }))
        }
    }
}
export const fetchFileData = (requestData) => {
    return async (dispatch) => {
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/files/view?path=${requestData.path}`, {
                method: "GET",
                headers: {
                    "Authorization": 'Bearer ' + requestData.token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Could not get the File.");
            }
            return await response.blob();
        }
        try {
            let data = await fetchRequest()
            const imgUrl = URL.createObjectURL(data);
            dispatch(portalActions.setFile(imgUrl))
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to load the file'
            }))
        }
    }
}
export const fetchPDFFileData = (requestData) => {
    return async (dispatch) => {
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/files/view?path=${requestData.path}`, {
                method: "GET",
                headers: {
                    "Authorization": 'Bearer ' + requestData.token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Could not get PDF File.");
            }
            return await response.blob();
        }
        try {
            let data = await fetchRequest()
            const pdfUrl = URL.createObjectURL(data);
            dispatch(portalActions.setPDFFile(pdfUrl))
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to load PDF'
            }))
        }
    }
}
export const fetchTxtFileData = (requestData) => {
    return async (dispatch) => {
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/files/view?path=${requestData.path}`, {
                method: "GET",
                headers: {
                    "Authorization": 'Bearer ' + requestData.token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Could not get Text File.");
            }
            return await response.blob();
        }
        try {
            let data = await fetchRequest()
            dispatch(portalActions.setTxtFile(data))
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to load text file'
            }))
        }
    }
}
export const fetchExcelFileData = (requestData) => {
    return async (dispatch) => {
        dispatch(uiActions.showSpinnerLoading())
        // if (requestData.img)
        const f = await (await fetch(`${DOMAIN}/files/view?path=${requestData.path}`, {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + requestData.token,
                "Content-Type": "application/json",
            },
        })).arrayBuffer()
        const wb = read(f);
        const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        // console.log(data);


    }
}
export const createFolder = (requestData) => {
    return async (dispatch) => {
        const {userId, token, folderName, pathObj} = requestData
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/files/folders`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    path: pathObj[pathObj.length - 1].path,
                    folderName: folderName
                }),
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Could not create Folder.");
            }
            return await response.json()
        }
        try {
            const data = await fetchRequest()
            dispatch(fetchFilesData({token, userId, path: pathObj[pathObj.length - 1].path}));
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Folder Created Successfully!'
            }))
            dispatch(portalActions.hideCreateFolderModal())
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to create folder'
            }))
        }
    }
}
export const moveFile = (requestData) => {
    return async (dispatch) => {
        const {userId, token, folderName, pathObj} = requestData
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/files/move`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    path: pathObj[pathObj.length - 1].path,
                    folderName: folderName
                }),
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Could not create Folder.");
            }
            return await response.json()
        }
        try {
            const data = await fetchRequest()
            dispatch(fetchFilesData({token, userId, path: pathObj[pathObj.length - 1].path}));
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Folder Created Successfully!'
            }))
            dispatch(portalActions.hideCreateFolderModal())
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to create folder'
            }))
        }
    }
}

export const downloadFile = (requestData) => {
    return async (dispatch) => {
        axios({
            url: `${DOMAIN}/files/download/?path=${requestData.path}`,
            method: 'GET',
            responseType: 'blob',
            headers: {
                "Authorization": 'Bearer ' + requestData.token,
            }
        }).then((res) => {
            FileDownload(res.data, requestData.fileName)
        })
    }
}

export const uploadFile = (requestData) => {
    return async (dispatch) => {
        const {userId, token, files, pathObj} = requestData
        const lastPath = pathObj[pathObj.length - 1].path
        dispatch(portalActions.setIsUploading(true))

        const fetchRequest = async () => {
            const formData = new FormData();
            // fileList.forEach((file, i) => {
            formData.append('userId', requestData.userId);
            formData.append('path', lastPath);
            for (let i = 0; i < requestData.files.length; i++) {
                // console.log(file);
                formData.append(`files`, requestData.files[i]);
            }
            const options = {
                headers: {
                    'userId': requestData.userId,
                    'panelType': requestData.panelType,
                    'panelId': requestData.selectedPanel,
                    'Content-Type': 'multipart/form-data',
                    "Authorization": 'Bearer ' + requestData.token,
                },
                onUploadProgress: function (data) {
                    const {loaded, total} = data;
                    let percent = Math.floor(loaded * 100 / total);
                    // console.log(data.loaded, data.total)
                    dispatch(portalActions.setUploadFilePercentage(percent))
                }
            }
            const {data} = await axios.post(`${DOMAIN}/users/${requestData.userId}/files/upload`, formData, options)
            // headers: {
            //     'userId': requestData.userId,
            //     'panelType': requestData.panelType,
            //     'panelId': requestData.selectedPanel,
            //     'Content-Type': 'multipart/form-data',
            //     "Authorization": 'Bearer ' + requestData.token,
            // },
            //     }
            // )
            return data;
        }
        try {
            const data = await fetchRequest()
            console.log(data);
            dispatch(portalActions.setIsUploading(false))
            dispatch(fetchFilesData({token, userId, path: pathObj[pathObj.length - 1].path}));
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'file uploaded Successfully!'
            }))
            dispatch(portalActions.hideCreateFolderModal())
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to upload files'
            }))
        }
    }
}
export const deleteFile = (requestData) => {
    return async (dispatch) => {
        const {userId, token, path, pathObj} = requestData
        console.log(path)
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/files?path=${requestData.path}`, {
                method: "DELETE",
                headers: {
                    "Authorization": 'Bearer ' + requestData.token,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 204) {
                return {};
            }
            if (!response.ok) {
                throw new Error("Could not delete File.");
            }
        }
        try {
            let data = await fetchRequest()
            console.log(data);
            dispatch(fetchFilesData({path: pathObj[pathObj.length - 1].path, userId, token}));
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'File Removed Successfully!'
            }))
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to delete File'
            }))
        }
    }
}
