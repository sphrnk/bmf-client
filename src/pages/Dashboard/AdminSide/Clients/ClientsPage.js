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


const ClientsPage = () => {
    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients.clients);
    console.log("clients:", clients)
    const closeCreateAccountModalHandler = () => {
        setShowCreateAccountModal(false)
    }
    const openCreateAccountModalHandler = () => {
        setShowCreateAccountModal(true)
    }
    useEffect(() => {
        // getUsersRequest({token})
        dispatch(fetchClientsData({token}));
    }, [token]);


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
            {clients.length > 0 && <ClientsList clients={clients}/>}
            {clients.length === 0 && <p>Nothing To Show</p>}
            {/*{showCreateAccountModal &&*/}
            {/*    <Modal title={"Create Account"}>*/}
            {/*        <CreateAccountForm onConfirm={closeCreateAccountModalHandler}/>*/}
            {/*    </Modal>}*/}
            {showCreateAccountModal &&
                <Modal title={"Create Account"}
                       onClose={closeCreateAccountModalHandler} open={showCreateAccountModal}>
                    <CreateAccountForm onClose={closeCreateAccountModalHandler}
                                       onConfirm={closeCreateAccountModalHandler}/>
                </Modal>
            }
        </>
    );
}
export default ClientsPage;