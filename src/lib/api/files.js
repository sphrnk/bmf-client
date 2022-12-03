const DOMAIN = process.env.REACT_APP_BACKEND_URL;

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
export async function downloadFile(requestData) {
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