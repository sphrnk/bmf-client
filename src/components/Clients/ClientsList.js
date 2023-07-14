import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {Icon, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {useMemo, useContext, useState} from "react";
import {deleteClient, resendEmail} from "../../store/client/client-actions";
import {useDispatch} from "react-redux";
import AuthContext from "../../store/auth-context";


const ClientsList = (props) => {
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
    // const resendEmail = ;
    const columns = useMemo(() => [
        {
            field: 'id',
            headerName: 'ID',
            hide: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
            editable: true,
            renderCell: (params) => (
                <Link className={'underline text-primary'}
                      to={`/clients/${params.row._id}`}>{params.value}</Link>
            )
        },
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 200,
            editable: true,

        },
        {
            field: 'middleName',
            headerName: 'Middle Name',
            width: 200,
            editable: true,
            valueGetter: (params) =>
                params.value === "" ? "-" : params.row.middleName,
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 200,
            editable: true,
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
                    <>
                        <Icon onClick={handleClick}
                              color={"primary"}
                              baseClassName="cursor-pointer far"
                              className={"fa-ellipsis-vertical"}/>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <MenuItem sx={{color: 'red'}} onClick={onClick.bind(this, 'delete')}>
                                <ListItemIcon>
                                    <Icon
                                        color={"error"}
                                        baseClassName="fal"
                                        className={"fa-trash"}/>
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                            </MenuItem>
                            {/*<MenuItem sx={{color: 'primary'}} onClick={handleClose}>*/}
                            {/*    <ListItemIcon>*/}
                            {/*        <Icon*/}
                            {/*            color={"primary"}*/}
                            {/*            baseClassName="fal"*/}
                            {/*            className={"fa-pen-to-square"}/>*/}
                            {/*    </ListItemIcon>*/}
                            {/*    <ListItemText>Update</ListItemText>*/}
                            {/*</MenuItem>*/}
                            <MenuItem sx={{color: 'primary'}} onClick={onClick.bind(this, 'resend-email')}>
                                <ListItemIcon>
                                    <Icon
                                        color={"primary"}
                                        baseClassName="fal"
                                        className={"fa-paper-plane-top"}/>
                                </ListItemIcon>
                                <ListItemText>Resend Email</ListItemText>
                            </MenuItem>
                        </Menu>
                    </>
                )
            }
        },
    ]);
    return (
        <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                rows={props.clients}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                // checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
        </Box>
    )
}
export default ClientsList;