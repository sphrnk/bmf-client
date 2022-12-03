import Layout from "../../components/Layout/Dashboard/Layout";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import {getAccountRequests} from "../../lib/api/accountRequests";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {Link} from "react-router-dom";

const AccountRequestsPage = () => {
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const {
        sendRequest: getAccountRequestsRequest,
        status: accountRequestsStatus,
        data: accountRequestsData,
        error: accountRequestsError
    } = useHttp(getAccountRequests);
    let accountRequestsContent = <p>There isn't any new account Request</p>;
    const accountRequests = accountRequestsData ? accountRequestsData.data.createAccounts : [];
    console.log(accountRequests)
    const columns = React.useMemo(() => [
        {
            field: 'name',
            headerName: 'Name',
            width: 400,
            editable: true,
            valueGetter: (params) =>
                `${params.row.firstName} ${params.row.middleName} ${params.row.lastName} `,
            renderCell: (params) => (
                <Link to={'accout-requests/:requestId'} className={'underline text-primary'}>{params.value}</Link>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: true,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone',
            width: 200,
            editable: true,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 200,
            editable: true,
        },
    ], []);
    useEffect(() => {
        getAccountRequestsRequest({token}).catch((e) => {
            console.log(e)
        })
    }, [getAccountRequestsRequest]);
    if (accountRequestsStatus === "pending") {
        accountRequestsContent = <LoadingSpinner/>
    }
    if (accountRequestsStatus === "completed" && accountRequests && !accountRequestsError) {
        accountRequests.map((file, i) => {
            file.id = i;
        })
        accountRequestsContent = <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                rows={accountRequests}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
        </Box>
    }
    if (accountRequestsStatus === "completed" && !accountRequests && accountRequestsError) {
        accountRequestsContent = <p className={"self-center"}>There is not any file, upload one!</p>
    }
    return (
        <>
            <Layout>
                <h1 className={"font-bold text-4xl mb-3"}>AccountRequests</h1>
                {accountRequestsContent}
            </Layout>
        </>);
}
export default AccountRequestsPage;