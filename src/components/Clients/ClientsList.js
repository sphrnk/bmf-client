import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {
    Button,
    Icon,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem, Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow
} from "@mui/material";
import {useMemo, useContext, useState} from "react";
import {deleteClient, resendEmail} from "../../store/client/client-actions";
import {useDispatch} from "react-redux";
import AuthContext from "../../store/auth-context";
import ClientItem from "./ClientItem";
import TableLoader from "../UI/TableLoader";


const ClientsList = (props) => {
    const {ids, isLoading} = props.list;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(props.clients)
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            hide: true,
        },
        {
            field: 'name',
            headerName: 'Full Name',
            width: 500,
            editable: false,
            renderCell: (params) => (
                <Link className={'underline text-primary'}
                      to={`/clients/${params.row._id}`}>{params.row.lastName} {params.row.middleName} {params.row.firstName}</Link>
            )
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
            editable: false,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            sortable: false,
            width: 300,
        },
        {
            field: 'action',
            align: 'center',
            headerName: 'Action',
            sortable: false,
            renderCell: (params) => {
                const onClick = (action, e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api = params.api;
                    const thisRow = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );
                    if (action === "delete") {
                        console.log('client:', thisRow)
                        dispatch(deleteClient({
                            userId: thisRow.id,
                            token
                        }))
                        handleClose();
                    }
                    if (action === "resend-email") {
                        console.log('client:', thisRow)
                        dispatch(resendEmail({
                            userId: thisRow.id,
                            token
                        }))
                        handleClose();
                    }
                };
                return (
                    <div className={'flex align-items-center gap-6'}>
                        <Icon
                            color={"error"}
                            onClick={onClick.bind(this, 'delete')}
                            baseClassName="fal cursor-pointer"
                            className={"fa-trash"}/>
                        <Icon
                            onClick={onClick.bind(this, 'resend-email')}
                            baseClassName="fal cursor-pointer"
                            className={"fa-paper-plane"}/>
                    </div>
                )
            }
        },
    ];
    const tableContent = ids?.length && ids.map(clientId => <ClientItem key={clientId} clientId={clientId}/>)
    return (
        // <Box sx={{height: 400, width: '100%'}}>
        //     <DataGrid
        //         rows={props.clients}
        //         columns={columns}
        //         pageSize={10}
        //         rowsPerPageOptions={[10]}
        //     />
        // </Box>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? <TableLoader rowsNum={20} cellsNum={5}/> : tableContent}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default ClientsList;