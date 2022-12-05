const DOMAIN = process.env.REACT_APP_BACKEND_URL;

export async function validateZipCode(requestData) {
    console.log(requestData)
    const response = await fetch(`${DOMAIN}/utils/zipCode`, {
        method: "POST",
        body: JSON.stringify({
            zipCode: requestData.enteredZipCode,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        throw new Error(data.message || "Could not validate zip code, try later.");
    }
    return data;
}