const DOMAIN = process.env.REACT_APP_BACKEND_URL;

export async function createPanel(requestData) {
    console.log(requestData);
    let requestBodyData;
    if (requestData.panelType === "individual") {
        requestBodyData = {
            userId: requestData.userId,
            firstName: requestData.firstName,
            middleName: requestData.middleName,
            lastName: requestData.lastName,
            email: requestData.email,
            phoneNumber: requestData.phoneNumber,
            panelType: 'individual'
        }
    }
    if (requestData.panelType === "business") {
        requestBodyData = {
            userId: requestData.userId,
            companyEmail: requestData.companyEmail,
            companyPhoneNumber: requestData.companyPhoneNumber,
            companyName: requestData.companyName,
            companyType: requestData.companyType,
            UBINumber: requestData.UBINumber,
            EINNumber: requestData.EINNumber,
            partnersInformation: requestData.partnersInformation,
            address: requestData.address,
            panelType: 'business',
        }
    }
    const response = await fetch(`${DOMAIN}/panels`, {
        method: "POST",
        body: JSON.stringify(requestBodyData),
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

export async function getPanels(requestData) {
    console.log(requestData)
    const response = await fetch(`${DOMAIN}/panels/${requestData.panelType}`, {
        method: "GET",
        headers: {
            "Authorization": 'Bearer ' + requestData.token,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Could not get Panels.");
    }
    return data;
}

export async function getPanel(requestData) {
    console.log(requestData);
    const response = await fetch(`${DOMAIN}/panels/${requestData.panelId}?panelType=${requestData.panelType}`, {
        method: "GET",
        body: {
            userId: requestData.userId,
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
        throw new Error(data.message || "Could not get Panel.");
    }
    return data;
}

export async function updatePanel(requestData) {
    console.log(requestData);
    const response = await fetch(`${DOMAIN}/panels/${requestData.panelId}`, {
        method: "GET",
        body: {
            userId: requestData.userId,
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
        throw new Error(data.message || "Could not get Panel.");
    }
    return data;
}

export async function deletePanel(requestData) {
    console.log(requestData);
    const response = await fetch(`${DOMAIN}/panels/${requestData.panelId}`, {
        method: "GET",
        body: {
            userId: requestData.userId,
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
        throw new Error(data.message || "Could not get Panel.");
    }
    return data;
}