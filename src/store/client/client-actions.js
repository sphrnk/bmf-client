import {uiActions} from "../ui-slice";
import {clientActions} from "./client-slice";
import useHttp from "../../hooks/use-http";
import {getFiles} from "../../lib/api/files";
import {useEffect} from "react";


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