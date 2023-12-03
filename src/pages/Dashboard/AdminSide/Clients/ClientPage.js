import Layout from "../../../../Layout/Dashboard/Layout";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../../store/auth-context";
import useHttp from "../../../../hooks/use-http";
import {getUser} from "../../../../lib/api/users";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import {useParams} from "react-router-dom";
import User from "../../../../components/Clients/ClientInformation";
import UsersPanels from "../../../../components/Clients/UsersPanels";
import UserInformation from "../../../../components/Clients/ClientInformation";
import {useGetClientQuery} from "../../../../store/client/clientsApiSlice";


const ClientPage = () => {
    const {clientId} = useParams();
    const {data: client, isLoading, isSuccess, isError, error} = useGetClientQuery(clientId, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })


    let userContent;
    let panelsContent;

    console.log(client);
    if (isSuccess && client) {

        userContent = <UserInformation user={client}/>
        panelsContent = <UsersPanels indiviualPortal={client.individualPortal}
                                     businessPortal={client.businessPortal}
                                     individualPanels={client.individualPortals}
                                     businessPanels={client.businessPortals}/>
    }
    // if (userStatus === "completed" && !userData.data.user && userError) {
    //     userContent = <p>There is not any user with this id</p>
    // }
    return (
        <div className={'flex flex-col gap-8'}>
            <div className="flex flex-col gap-4">
                <h1 className={"text-3xl font-bold mb-4"}>User Profile:</h1>
                {userContent}
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Portals Information:</h1>
                {panelsContent}
            </div>
        </div>
    )
}
export default ClientPage;