import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {Button, Icon, Link} from "@mui/material";
import {useDeleteClientMutation, useGetClientsQuery, useResendEmailMutation} from "../../store/client/clientsApiSlice";
import {useEffect} from "react";
import {uiActions} from "../../store/ui-slice";
import {useDispatch} from "react-redux";
import {useCreateFolderMutation, useGetFilesQuery} from "../../store/file/fileActions";

const ClientItem = ({clientId}) => {
    const {client} = useGetClientsQuery('clientsList',
        {
            selectFromResult: ({data}) => ({
                client: data?.entities[clientId]
            })
        }
    )
    const dispatch = useDispatch();
    const {refetch} = useGetClientsQuery('clientsList')
    const [resendEmail, {
        isLoading: isEmailLoading,
        isSuccess: isEmailSuccess,
        isError: isEmailError,
        error: emailError
    }] = useResendEmailMutation();
    const [deleteClient, {
        isLoading: isDeleteLoading,
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        error: deleteError
    }] = useDeleteClientMutation();
    const deleteClientHandler = async () => {
        await deleteClient(clientId)
    }
    const resendEmailHandler = async () => {
        await resendEmail(clientId)
    }
    useEffect(() => {
        if (isEmailSuccess) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Email resend successfully to the client'
            }))

        }
        if (isEmailError) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: emailError.data.message
            }))
        }
    }, [isEmailError, isEmailSuccess, emailError])
    useEffect(() => {
        if (isDeleteSuccess) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Client deleted successfully'
            }))
        }
        refetch();
        if (isDeleteError) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: deleteError.data.message
            }))
        }
    }, [isDeleteError, isDeleteSuccess, deleteError])
    return (
        <TableRow
            // key={row.name}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {/*<TableCell component="th" scope="row">{client.id}</TableCell>*/}
            <TableCell>
                <Link component={RouterLink}
                      to={`/clients/${clientId}`}>
                    {client.lastName} {client.middleName} {client.firstName}
                </Link>
                {/*<Link className={'underline text-primary'}*/}
                {/*      to={`/clients/${clientId}`}>*/}
                {/*    {client.lastName} {client.middleName} {client.firstName}*/}
                {/*</Link>*/}
            </TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phoneNumber}</TableCell>
            <TableCell>
                <div className={'flex align-items-center gap-6'}>
                    <Icon
                        color={"error"}
                        onClick={deleteClientHandler}
                        baseClassName="fal cursor-pointer"
                        className={"fa-trash"}/>
                    <Icon
                        onClick={resendEmailHandler}
                        baseClassName="fal cursor-pointer"
                        className={"fa-paper-plane"}/>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default ClientItem;