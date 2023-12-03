import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {useGetClientsQuery} from "../../store/client/clientsApiSlice";

const ClientItem = ({clientId}) => {
    const {client} = useGetClientsQuery('clientsList',
        {
            selectFromResult: ({data}) => ({
                client: data?.entities[clientId]
            })
        }
    )
    const navigate = useNavigate();
    const handleEdit = () => navigate(`/clients/${clientId}/update`)
    return (
        <TableRow
            // key={row.name}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell component="th" scope="row">{client.id}</TableCell>
            <TableCell>
                <Link className={'underline text-primary'}
                      to={`/clients/${clientId}`}>
                    {client.lastName} {client.middleName} {client.firstName}
                </Link>
            </TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phoneNumber}</TableCell>
            <TableCell><Button onClick={handleEdit} type={'button'}>Edit</Button></TableCell>
        </TableRow>
    );
}

export default ClientItem;