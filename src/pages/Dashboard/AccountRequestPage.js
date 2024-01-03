import Layout from "../../Layout/Dashboard/Layout";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import {deleteAccountRequest, getAccountRequest} from "../../lib/api/accountRequests";
import {createUser} from "../../lib/api/users";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {useNavigate, useParams} from "react-router-dom";
import RequestInformation from "../../components/RequestInformation";
import React from "react";

const ClientPage = () => {

    let createAccountContent;

    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const {requestId} = useParams();
    const navigate = useNavigate();

    const {
        sendRequest: getAccountRequestRequest,
        status: getAccountRequestStatus,
        data: getAccountRequestData,
        error: getAccountRequestError
    } = useHttp(getAccountRequest, true);
    const accountRequest = getAccountRequestData ? getAccountRequestData.data.accountRequest : {};
    let accountRequestContent;
    useEffect(() => {
        getAccountRequestRequest({token, requestId})
    }, [getAccountRequestRequest]);


    if (getAccountRequestStatus === "pending") {
        accountRequestContent = <LoadingSpinner/>
    }
    if (getAccountRequestStatus === "completed" && getAccountRequestData && !getAccountRequestError) {
        accountRequestContent = <RequestInformation request={getAccountRequestData.data.accountRequest}/>
    }
    if (getAccountRequestStatus === "completed" && !getAccountRequestData && getAccountRequestError) {
        return (<p>There is not any Request with this id</p>)
    }

    return (
        <>

            <div className="flex flex-col gap-4">
                <h1 className={"text-3xl font-bold mb-4"}>Request Info:</h1>
                {accountRequestContent}
                {/*{requestActionsContent}*/}

                {/*{accountRequestData != null ? ...accountRequestData.data.accountRequest : null}*/}
            </div>

        </>
    )
}
export default ClientPage;