const DOMAIN = "http://127.0.0.1:8443/api";

export async function getUsers() {
    const response = await fetch(`${DOMAIN}/users/`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch quotes.");
    }

    const transformedUsers = [];
    for (const key in data) {
        const quoteObj = {
            id: key,
            ...data[key],
        };
        transformedUsers.push(quoteObj);
    }

    return transformedUsers;
}

export async function getUser(userId) {
    const response = await fetch(`${DOMAIN}/quotes/${userId}.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch quote.");
    }

    const loadedQuote = {
        id: userId,
        ...data,
    };

    return loadedQuote;
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

export async function login(requestData) {
    const response = await fetch(`${DOMAIN}/users/login`, {
        method: "POST",
        body: JSON.stringify({
            email: requestData.enteredEmail,
            password: requestData.enteredPassword,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        // const error = await response.json();
        console.log(response);
        throw new Error(data.message || "Could not login.");
    }

    return data;
}

export async function updatePassword(requestData) {
    const response = await fetch(`${DOMAIN}/users/updatePassword`, {
        method: "PATCH",
        body: JSON.stringify({
            password: requestData.password,
            passwordConfirm: requestData.password,
        }),
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
            "Content-Type": "application/json",
        },


    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        // const error = await response.json();
        console.log(response);
        throw new Error(data.message || "Could not update the password.");
    }

    return data;
}