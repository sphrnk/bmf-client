import Layout from "../../../../Layout/Dashboard/Layout";
import useHttp from "../../../../hooks/use-http";
import {createUser, getUsers} from "../../../../lib/api/users";
import {getFiles} from "../../../../lib/api/files";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../../store/auth-context";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import {Button, Typography} from "@mui/material";
import Modal from "../../../../components/UI/Modal";
import CreatePanelForm from "../../../../components/Forms/CreatePanelForm";
import CreateAccountForm from "../../../../components/Forms/CreateAccountForm";
import ClientsList from "../../../../components/Clients/ClientsList";
import Notif from "../../../../components/UI/Notif";
import {useDispatch} from "react-redux";
import {uiActions} from "../../../../store/ui-slice";
import {useNavigate} from "react-router-dom";


const CreateClientPage = () => {

    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {sendRequest, status, data, error} = useHttp(createUser);
    const createAccount = async (data) => {
        console.log('12312313',data)
        await sendRequest({...data, token});
    }
    if (data) {
        // console.log(data);
        dispatch(uiActions.showNotification({
            status: 'success',
            message: 'Account Created Successfully, if the email is correct user will get his information!'
        }))
    }
    if (status === "completed" && error) {
        dispatch(uiActions.showNotification({
            status: 'error',
            message: error
        }))
    }
    useEffect(() => {
        if (status === 'completed' && !error) {
            navigate('/clients')
        }
    })

    return (
        <>
            <Typography component={"h4"} variant={"h4"} mb={2} fontWeight={"bold"}>Create Client</Typography>
            <CreateAccountForm isPending={status === 'pending'} onSubmit={createAccount}/>
        </>);
}
export default CreateClientPage;