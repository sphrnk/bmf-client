import {useContext, useEffect, useState, useRef} from "react";
import AuthContext from "../../store/auth-context.js";
import ClientInformation from "../../components/Clients/ClientInformation";
import ClientPanelsInformarion from "../../components/Clients/ClientPanelsInformation";
import {useDispatch, useSelector} from "react-redux";
import {fetchClientData} from "../../store/client/client-actions";
import {useGetClientQuery} from "../../store/client/clientsApiSlice";
import {selectCurrentUser} from "../../store/auth/authSlice";
import {Box, Button, Typography} from "@mui/material";
import Address from "../../components/Panels/Address";


const ProfilePage = () => {
    const user = useSelector(selectCurrentUser);
    const panelsContent = <ClientPanelsInformarion individualPortal={user.individualPortal}
                                                   businessPortal={user.businessPortal}
                                                   individualPortals={user.individualPortals}
                                                   businessPortals={user.businessPortals}/>
    console.log(user);

    return (
        <div className={'flex flex-col'}>
            <div className="flex flex-col gap-4 mb-8">
                <Typography color={'primary'} variant={'h3'} component={'h3'} fontWeight={'bold'}>Your
                    Information:</Typography>
                <ClientInformation user={user}/>
            </div>
            <div className="flex flex-col">
                <Typography color={'primary'} variant={'h3'} component={'h3'} fontWeight={'bold'}>Portals
                    Information:</Typography>
                {panelsContent}
            </div>
        </div>
    )
}
export default ProfilePage;