import {Button, Link, Typography} from "@mui/material";
import ClientsList from "../../../components/Clients/ClientsList";
import {Link as RouterLink} from 'react-router-dom'
import {useGetClientsQuery} from "../../../store/client/clientsApiSlice";
import {useEffect} from "react";
import {uiActions} from "../../../store/ui-slice";
import {useDispatch} from "react-redux";


const ClientsPage = () => {
    const {data: clients, isLoading, isSuccess, isError, error} = useGetClientsQuery('clientsList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const dispatch = useDispatch();
    useEffect(() => {
        if (isError) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: error.data.message
            }))
        }
    }, [isError, error])
    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                <Typography color={'primary'} variant={'h3'} fontWeight={"bold"}>Clients</Typography>
                <Link component={RouterLink} to={'/clients/add'} underline={"none"}>
                    <Button className={'w-auto'} variant="contained">Add
                        Client
                    </Button>
                </Link>
            </div>
            {isSuccess && <ClientsList isLoading={isLoading} list={clients}/>}
            {clients?.length === 0 && <p>Nothing To Show</p>}
        </>
    );
}
export default ClientsPage;