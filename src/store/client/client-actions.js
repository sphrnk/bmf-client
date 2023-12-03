import {uiActions} from "../ui-slice";
import {clientActions} from "./client-slice";
// import {authActions} from "../auth-slice";
import useHttp from "../../hooks/use-http";
import {getFiles} from "../../lib/api/files";
import {useEffect} from "react";
import {fetchFilesData} from "../file/portal-actions";

import AuthContext from "../auth-context";


const DOMAIN = process.env.REACT_APP_BACKEND_URL;

export const fetchClientsData = (requestData) => {
    return async (dispatch) => {
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
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
            return await data;
        }
        try {
            let data = await fetchRequest()
            console.log(data);
            dispatch(clientActions.replaceClients({
                clients: data.data.users,
            }))
        } catch (e) {
            console.log(e);
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to load clients'
            }))
        }
    }
}
export const fetchClientData = (requestData) => {
    return async (dispatch) => {
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/users/${requestData.userId}`, {
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
            data.data.users.map(({id, ...rest}) => rest);
            return await data;
        }
        try {
            let data = await fetchRequest()
            console.log(data);
            // dispatch(clientActions.setClient({
            //     client: data.data.users,
            // }))
        } catch (e) {
            console.log(e);
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to load client'
            }))
        }
    }
}
export const deleteClient = (requestData) => {
    const {userId, token} = requestData;
    console.log(requestData)
    return async (dispatch) => {
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Content-Type": "application/json",
                },
            });
            console.log("hi")
            if (response.status === 204) {
                return {};
            }
            if (!response.ok) {
                throw new Error("Could not Delete Users.");
            }
        }
        try {
            let data = await fetchRequest()
            console.log(data);
            dispatch(fetchClientsData({token}));
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Client Removed Successfully!'
            }))
        } catch (e) {
            console.log(e);
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to delete client'
            }))
        }
    }
}
export const resendEmail = (requestData) => {
    const {userId, token} = requestData;
    console.log(requestData)
    return async (dispatch) => {
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/users/${userId}/resendEmail`, {
                method: "GET",
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Could not Send Email to client.");
            }
            return await data;
        }
        try {
            let data = await fetchRequest()
            console.log(data);
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Email Resend Successfully!'
            }))
        } catch (e) {
            console.log(e);
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to Send Email to client'
            }))
        }
    }
}
export const updatePassword = (requestData) => {
    const {userId, token, password} = requestData;

    return async (dispatch) => {
        console.log(token, password);
        dispatch(uiActions.showSpinnerLoading())
        const fetchRequest = async () => {
            const response = await fetch(`${DOMAIN}/users/updateTempPassword`, {
                method: "PATCH",
                body: JSON.stringify({
                    password: password,
                    passwordConfirm: password,
                }),
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                // const error = await response.json();
                console.log(response);
                throw new Error(data.message || "Could not update the password.");
            }
            return data;
        }
        try {
            console.log("hi12")
            const data = await fetchRequest();
            console.log(data)
            const {user, token} = data.data;
            // dispatch(authActions.setCredentials({
            //     user, token
            // }))
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Password changed Successfully!'
            }))
        } catch (e) {
            console.log(e);
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Failed to change password. Try again later'
            }))
        }
    }
}