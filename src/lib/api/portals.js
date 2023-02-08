const DOMAIN = process.env.REACT_APP_BACKEND_URL;

export async function createPanel(requestData) {
    console.log(requestData);
    let requestBodyData;
    if (requestData.portalType === "individual") {
        requestBodyData = {
            firstName: requestData.panelData.enteredFirstName,
            middleName: requestData.panelData.enteredMiddleName,
            lastName: requestData.panelData.enteredLastName,
            email: requestData.panelData.enteredEmail,
            phoneNumber: requestData.panelData.enteredPhoneNumber,
            address: requestData.address,
        }
    }

    if (requestData.portalType === "business") {
        requestBodyData = {
            companyEmail: requestData.panelData.enteredCompanyEmail,
            companyPhoneNumber: requestData.panelData.enteredCompanyPhoneNumber,
            companyName: requestData.panelData.enteredCompanyName,
            companyType: requestData.panelData.enteredCompanyType,
            UBINumber: requestData.panelData.enteredCompanyUBINumber,
            EINNumber: requestData.panelData.enteredCompanyEINNumber,
            // partnersInformation: requestData.panelData.enteredpartnersInformation,
            address: requestData.address,
        }
    }
    console.log(requestBodyData)
    const response = await fetch(`${DOMAIN}/portals/${requestData.portalType}`, {
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
    // if(requestData.user._)
    const response = await fetch(`${DOMAIN}/portals/${requestData.panelType}`, {
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

export async function getPanelsOfUser(requestData) {
    console.log(requestData)
    // if(requestData.user._)
    const response = await fetch(`${DOMAIN}/users/${requestData.userId}/portals/${requestData.panelType}`, {
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
    const response = await fetch(`${DOMAIN}/portals/${requestData.panelId}?panelType=${requestData.panelType}`, {
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
    const response = await fetch(`${DOMAIN}/portals/${requestData.panelId}`, {
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
    const response = await fetch(`${DOMAIN}/portals/${requestData.panelId}`, {
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