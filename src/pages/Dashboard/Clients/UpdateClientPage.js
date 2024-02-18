import {useParams} from "react-router-dom";
import ClientPanelsInformarion from "../../../components/Clients/ClientPanelsInformation";
import UpdateClientInformationForm from "../../../components/Clients/UpdateClinetInformationForm";
import {useGetClientQuery} from "../../../store/client/clientsApiSlice";
import {Typography} from "@mui/material";
import UpdateClientPanelsInformation from "../../../components/Clients/UpdateClientPanelsInformation";


const UpdateClientPage = () => {
    const {clientId} = useParams();
    const {data: client, isLoading, isSuccess, isError, error} = useGetClientQuery(clientId, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let userContent;
    let panelsContent;

    if (isSuccess && client) {
        userContent = <UpdateClientInformationForm user={client}/>
        panelsContent = <UpdateClientPanelsInformation individualPortal={client.individualPortal}
                                                       businessPortal={client.businessPortal}
                                                       individualPortals={client.individualPortals}
                                                       businessPortals={client.businessPortals}/>
    }
    // if (userStatus === "completed" && !userData.data.user && userError) {
    //     userContent = <p>There is not any user with this id</p>
    // }
    return (
        <div className={'flex flex-col gap-8'}>
            <div className="flex flex-col gap-4">
                <Typography color={'primary'} variant={'h3'} component={'h3'}>Client Profile:</Typography>
                {userContent}
            </div>
            <div className="flex flex-col gap-4">
                <Typography color={'primary'} variant={'h3'} component={'h3'}>Portals Information:</Typography>
                {panelsContent}
            </div>
        </div>
    )
}
export default UpdateClientPage;