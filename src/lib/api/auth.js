const DOMAIN = process.env.REACT_APP_BACKEND_URL;

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
    const response = await fetch(`${DOMAIN}/users/updateMyPassword`, {
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

export async function forgotPassword(requestData) {
    const response = await fetch(`${DOMAIN}/users/forgotPassword`, {
        method: "POST",
        body: JSON.stringify({
            email: requestData.email,
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
        throw new Error(data.message || "Something went wrong. Try again later");
    }

    return data;
}

export async function resetPassword(requestData) {
    const response = await fetch(`${DOMAIN}/users/resetPassword/${requestData.params}`, {
        method: "PATCH",
        body: JSON.stringify({
            password: requestData.password,
            token: requestData.params,
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
        throw new Error(data.message || "Could not update the password.");
    }

    return data;
}