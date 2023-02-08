import Layout from "../../../../Layout/Dashboard/Layout";
import useHttp from "../../../../hooks/use-http";
import {getUsers} from "../../../../lib/api/users";
import {getFiles} from "../../../../lib/api/files";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../../store/auth-context";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import {Button, Link} from "@mui/material";
import Modal from "../../../../components/UI/Modal";
import CreatePanelForm from "../../../../components/Forms/CreatePanelForm";
import CreateAccountForm from "../../../../components/Forms/CreateAccountForm";
import ClientsList from "../../../../components/Clients/ClientsList";
import {Link as RouterLink} from 'react-router-dom'


const ClientsPage = () => {
    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const {sendRequest: getUsersRequest, status: usersStatus, data: users, error: usersError} = useHttp(getUsers);
    let usersContent;
    const closeCreateAccountModalHandler = () => {
        setShowCreateAccountModal(false)
    }
    const openCreateAccountModalHandler = () => {
        setShowCreateAccountModal(true)
    }
    useEffect(() => {
        getUsersRequest({token})
    }, [getUsersRequest]);
    if (usersStatus === "pending") {
        usersContent = <LoadingSpinner/>
    }

    if (usersStatus === "completed" && users.data.users.length === 0) {
        usersContent = <p className={"self-center"}>There is not any User, create one!</p>
    }
    if (usersStatus === "completed" && users && !usersError) {
        console.log(users.data.users);
        usersContent = <ClientsList clients={users.data.users}/>
    }
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
            {usersContent}
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