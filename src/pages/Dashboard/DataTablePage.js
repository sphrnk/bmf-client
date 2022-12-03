import Layout from "../../components/Layout/Dashboard/Layout";
import useHttp from "../../hooks/use-http";
import {getUsers} from "../../lib/api/users";
import DataTable from "../../components/DataTable/DataTable";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import * as React from 'react';
import {Link} from "react-router-dom";

const cols = [
    {
        fieldName: 'firstName',
        headerName: 'First Name',
        width: 110,
        renderCell: (params) => (
            <span>{}</span>
        )
    },
    {
        fieldName: 'middleName',
        headerName: 'Middle Name',
        width: 110,
    },
    {
        fieldName: 'lastName',
        headerName: 'Last Name',
        width: 110,
    },
    {
        fieldName: 'email',
        headerName: 'Email',
        width: 110,
    },
    {
        fieldName: 'phoneNumber',
        headerName: 'Phone Number',
        width: 110,
    },
]
const DataTablePage = () => {
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const {sendRequest: getUsersRequest, status: usersStatus, data: usersData, error: usersError} = useHttp(getUsers);
    const users = usersData ? usersData.data.users : [];
    let usersContent;

    useEffect(() => {
        getUsersRequest({token})
    }, [getUsersRequest]);
    if (usersStatus === "pending") {
        usersContent = <LoadingSpinner/>
    }
    if (usersStatus === "completed" && users && !usersError) {
        console.log(users);
        usersContent = <DataTable cols={cols} rows={users}></DataTable>;
    }

    return (
        <>
            <Layout>
                <h1 className={"font-bold w- text-red text-4xl mb-3"}>Clients</h1>
                {usersContent}
            </Layout>
        </>);
}
export default DataTablePage;