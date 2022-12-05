const DOMAIN = process.env.REACT_APP_BACKEND_URL;

export async function createPanel(requestData) {
    console.log(requestData);
    let requestBodyData;
    if (requestData.panelType === "individual") {
        requestBodyData = {
            userId: requestData.panelData.userId,
            firstName: requestData.panelData.firstName,
            middleName: requestData.panelData.middleName,
            lastName: requestData.panelData.lastName,
            email: requestData.panelData.email,
            phoneNumber: requestData.panelData.phoneNumber,
            address: requestData.panelData.address,
        }
    }
    console.log(requestBodyData)
    if (requestData.panelType === "business") {
        requestBodyData = {
            userId: requestData.panelData.userId,
            companyEmail: requestData.panelData.companyEmail,
            companyPhoneNumber: requestData.panelData.companyPhoneNumber,
            companyName: requestData.panelData.companyName,
            companyType: requestData.panelData.companyType,
            UBINumber: requestData.panelData.UBINumber,
            EINNumber: requestData.panelData.EINNumber,
            partnersInformation: requestData.panelData.partnersInformation,
            address: requestData.panelData.address,
        }
    }
    const response = await fetch(`${DOMAIN}/panels/${requestData.panelType}`, {
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