import {useParams} from "react-router-dom";
import ClientPanelsInformarion from "../../../components/Clients/ClientPanelsInformation";
import ClientInformation from "../../../components/Clients/ClientInformation";
import {useGetClientQuery} from "../../../store/client/clientsApiSlice";


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
        userContent = <ClientInformation user={client}/>
        panelsContent = <ClientPanelsInformarion indiviualPortal={client.individualPortal}
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
                <h1 className={"text-3xl font-bold mb-4"}>Client Profile:</h1>
                {userContent}
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Portals Information:</h1>
                {panelsContent}
            </div>
        </div>
    )
}
export default UpdateClientPage;