import Layout from "../../../../Layout/Dashboard/Layout";
import useHttp from "../../../../hooks/use-http";
import {getUsers} from "../../../../lib/api/users";
import {getFiles} from "../../../../lib/api/files";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../../store/auth-context";
import {Button, Link} from "@mui/material";
import Modal from "../../../../components/UI/Modal";
import CreateAccountForm from "../../../../components/Forms/CreateAccountForm";
import ClientsList from "../../../../components/Clients/ClientsList";
import {Link as RouterLink} from 'react-router-dom'
import {fetchClientsData} from "../../../../store/client/client-actions";
import {useDispatch, useSelector} from "react-redux";
import {useGetClientsQuery} from "../../../../store/client/clientsApiSlice";


const ClientsPage = () => {
    const {data: clients, isLoading, isSuccess, isError, error} = useGetClientsQuery('clientsList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <h1 className={"font-bold text-4xl"}>Clients</h1>
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