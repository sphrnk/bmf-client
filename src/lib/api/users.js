const DOMAIN = process.env.REACT_APP_BACKEND_URL;

function filterKeys(object, keys) {
    Object.keys(object).forEach(function (key) {
        if (keys.indexOf(key) === -1) {
            delete object[key];
        }
    });
}

export async function getUsers(requestData) {
    const response = await fetch(`${DOMAIN}/users/`, {
        method: "GET",
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Could not fetch Users.");
    }
    data.data.users.map(({id, ...rest}) => rest);
    return data;
}

export async function getUser(requestData) {
    const response = await fetch(`${DOMAIN}/users/${requestData.clientId}`, {
        method: "GET",
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Could not fetch User.");
    }
    const {id, ...rest} = data.data.user;
    data.data.user = rest;
    return data;
}

export async function createUser(requestData) {
    const response = await fetch(`${DOMAIN}/users/`, {
        method: "POST",
        body: JSON.stringify({
            firstName: requestData.firstName,
            middleName: requestData.middleName,
            lastName: requestData.lastName,
            email: requestData.email,
            phoneNumber: requestData.phoneNumber,
            individualPortal: requestData.individualPortal,
            businessPortal: requestData.businessPortal
        }),
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Could not create Account.");
    }
    return data;
}

export async function updateUser(requestData) {
    const response = await fetch(`${DOMAIN}/users/${requestData.clientId}`, {
        method: "PATCH",
        body: JSON.stringify({
            firstName: requestData.firstName,
            middleName: requestData.middleName,
            lastName: requestData.lastName,
            email: requestData.email,
            phoneNumber: requestData.phoneNumber,
            individualPortal: requestData.individualPortal,
            businessPortal: requestData.businessPortal,
            individualPortalCount: requestData.individualPortalCount,
            businessPortalCount: requestData.businessPortalCount,
        }),
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Could not create Account.");
    }
    return data;
}

export async function deleteUser(requestData) {
    const response = await fetch(`${DOMAIN}/users/createAccount`, {
        method: "POST",
        body: JSON.stringify({
            firstName: requestData.firstName,
            middleName: requestData.middleName,
            lastName: requestData.lastName,
            email: requestData.email,
            phoneNumber: requestData.phoneNumber,
        }),
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Could not create Account.");
    }
    return data;
}