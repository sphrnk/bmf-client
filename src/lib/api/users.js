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
    console.log(data);
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
    console.log(data)
    const {id, ...rest} = data.data.user;
    data.data.user = rest;
    return data;
}

export async function createUser(requestData) {
    console.log(requestData);
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
    console.log(data);
    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Could not create Account.");
    }
    return data;
}

export async function updateUser(requestData) {
    console.log(requestData);
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
    console.log(data);
    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Could not create Account.");
    }
    return data;
}

export async function deleteUser(requestData) {
    console.log(requestData);
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
    console.log(data);
    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Could not create Account.");
    }
    return data;
}