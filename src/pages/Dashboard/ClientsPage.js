import Layout from "../../components/Layout/Dashboard/Layout";
import useHttp from "../../hooks/use-http";
import {getUsers} from "../../lib/api/users";
import {getFiles} from "../../lib/api/files";
import DataTable from "../../components/DataTable/DataTable";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import Modal from "../../components/UI/Modal";
import CreatePanelForm from "../../components/Forms/CreatePanelForm";
import CreateAccountForm from "../../components/Forms/CreateAccountForm";

const columns = [
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
];

const ClientsPage = () => {
    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const {sendRequest: getUsersRequest, status: usersStatus, data: users, error: usersError} = useHttp(getUsers);
    let usersContent;
    const toggleCreateAccountHandler = () => {
        setShowCreateAccountModal(prevState => !prevState)
    }
    useEffect(() => {
        getUsersRequest({token})
    }, [getUsersRequest]);
    if (usersStatus === "pending") {
        usersContent = <LoadingSpinner/>
    }
    if (usersStatus === "completed" && users && !usersError) {
        console.log(users.data.users);
        usersContent = <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                rows={users.data.users}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
        </Box>
    }
    if (usersStatus === "completed" && users.data.users.length === 0) {
        usersContent = <p className={"self-center"}>There is not any User, create one!</p>
    }
    return (
        <>
            <Layout>
                <div className="flex justify-between items-center mb-4">
                    <h1 className={"font-bold text-4xl"}>Clients</h1>
                    <Button onClick={toggleCreateAccountHandler} variant="contained">Add Client</Button>
                </div>
                {usersContent}
                {showCreateAccountModal && <Modal title={"Create Account"} onConfirm={toggleCreateAccountHandler}>
                    <CreateAccountForm onConfirm={toggleCreateAccountHandler}/>
                </Modal>}
            </Layout>
        </>);
}
export default ClientsPage;