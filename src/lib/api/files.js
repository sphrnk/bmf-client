import axios from 'axios';
import FileDownload from 'js-file-download'

const DOMAIN = process.env.REACT_APP_BACKEND_URL;

export async function createFolder(requestData) {
    console.log(requestData);
    const response = await fetch(`${DOMAIN}/files/folders`, {
        method: "POST",
        body: JSON.stringify({
            userId: requestData.userId,
            path: requestData.path,
            folderName: requestData.folderName
        }),
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Could not create Folder.");
    }
    return data;
}

export async function getFiles(requestData) {
    console.log(requestData);
    const response = await fetch(`${DOMAIN}/files?path=${requestData.path}&userId=${requestData.userId}`, {
        method: "GET",
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Could not get Files.");
    }
    return data;
}

export async function getFile(requestData) {
    console.log(requestData);
    const response = await fetch(`${DOMAIN}/${requestData.userId}/files/${requestData.fileId}`, {
        method: "GET",
        body: {
            requestingFrom: requestData.requestingFrom,
            path: requestData.path,
        },
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Could not get File.");
    }
    return data;
}

export async function deleteFile(requestData) {
    console.log(requestData);
    const response = await fetch(`${DOMAIN}/${requestData.userId}/files/${requestData.fileId}`, {
        method: "GET",
        body: {
            requestingFrom: requestData.requestingFrom,
            path: requestData.path,
        },
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Could not get File.");
    }
    return data;
}

export async function uploadFile(requestData) {
    console.log(requestData);
    const formData = new FormData();
    // fileList.forEach((file, i) => {
    formData.append('userId', requestData.userId);
    formData.append('path', requestData.path);
    for (let i = 0; i < requestData.fileList.length; i++) {
        // console.log(file);
        formData.append(`files`, requestData.fileList[i]);
    }
    const {data} = await axios({
        method: 'post',
        url: `${DOMAIN}/users/${requestData.userId}/files`,
        data: formData,
        headers: {
            'userId': requestData.userId,
            'panelType': requestData.panelType,
            'panelId': requestData.selectedPanel,
            'Content-Type': 'multipart/form-data',
            "Authorization": 'Bearer ' + requestData.token,
        }
    })
    // const response = await fetch(`${DOMAIN}/users/${requestData.userId}/files/`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //         panelId: requestData.selectedPanel,
    //         panelType: requestData.panelType,
    //         files: formData
    //     }),
    //     headers: {
    //         "Authorization": 'Bearer ' + requestData.token,
    //         "Content-Type": "application/json",
    //     },
    // });
    // const data = await response.json();
    // console.log(data);
    // if (!response.ok) {
    //     console.log(data);
    //     throw new Error(data.message || "Could not get File.");
    // }
    // console.log(data);
    return data;
}

export async function downloadFile(requestData) {
    console.log(requestData);
    axios({
        url: `${DOMAIN}/files/download/?path=${requestData.path}`,
        method: 'GET',
        responseType: 'blob',
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
        }
    }).then((res) => {
        console.log(res);
        FileDownload(res.data, requestData.fileName)
    })
    // const response = await fetch(`${DOMAIN}/${requestData.userId}/files/${requestData.fileId}`, {
    //     method: "GET",
    //     body: {
    //         requestingFrom: requestData.requestingFrom,
    //         path: requestData.path,
    //     },
    //     headers: {
    //         "Authorization": 'Bearer ' + requestData.token,
    //         "Content-Type": "application/json",
    //     },
    // });
    // const data = await response.json();
    // console.log(data);
    // if (!response.ok) {
    //     console.log(data);
    //     throw new Error(data.message || "Could not get File.");
    // }
    // return data;
}