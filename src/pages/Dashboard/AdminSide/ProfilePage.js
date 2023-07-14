import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../store/auth-context.js";
import UserInformation from "../../../components/Clients/ClientInformation";
import UsersPanels from "../../../components/Clients/UsersPanels";


const ProfilePage = () => {
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const userContent = <UserInformation token={token} user={user}/>
    const panelsContent = <UsersPanels indiviualPortal={user.individualPortal}
                                       businessPortal={user.businessPortal}
                                       individualPanels={user.individualPortals}
                                       businessPanels={user.businessPortals}/>
    return (
        <div className={'flex flex-col gap-8'}>
            <div className="flex flex-col gap-4">
                {/*<h1 className={"text-3xl font-bold mb-4"}>User Profile:</h1>*/}
                {userContent}
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Portals Information:</h1>
                {panelsContent}
            </div>
        </div>
    )
}
export default ProfilePage;