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


const ClientPage = () => {
    const [panelType, setPanelType] = useState('individual');
    // const [shownTab, setShownTab] = useState(`tab-${tabs[0].id}`);
    const [shownTab, setShownTab] = useState(0);
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const {clientId} = useParams();
    const {sendRequest: getUserRequest, status: userStatus, data: userData, error: userError} = useHttp(getUser);
    let userContent;
    let panelsContent;
    console.log(userData);
    useEffect(() => {
        getUserRequest({token, clientId})
    }, [getUserRequest]);
    if (userStatus === "pending") {
        userContent = <LoadingSpinner/>
        panelsContent = <LoadingSpinner/>
    }
    if (userStatus === "completed" && userData && !userError) {
        userContent = <UserInformation token={token} user={userData.data.user}/>
        panelsContent = <UsersPanels indiviualPortal={userData.data.user.individualPortal}
                                     businessPortal={userData.data.user.businessPortal}
                                     individualPanels={userData.data.user.individualPortals}
                                     businessPanels={userData.data.user.businessPortals}/>
    }
    if (userStatus === "completed" && !userData.data.user && userError) {
        userContent = <p>There is not any user with this id</p>
    }
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