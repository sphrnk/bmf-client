const DOMAIN = process.env.REACT_APP_BACKEND_URL;

export async function getAccountRequests(requestData) {
    console.log(requestData);
    const response = await fetch(`${DOMAIN}/accountRequests`, {
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

export async function createAccountRequest(requestData) {
    console.log(requestData);
    const response = await fetch(`${DOMAIN}/accountRequests`, {
        method: "POST",
        body: JSON.stringify({
            firstName: requestData.firstName,
            middleName: requestData.middleName,
            lastName: requestData.lastName,
            email: requestData.email,
            phoneNumber: requestData.phoneNumber,
            reason: requestData.reason,
        }),
        headers: {
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
