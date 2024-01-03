import Layout from "../Layout/Dashboard/Layout";
import InfoItem from "./UI/InfoItem";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Link,
    Slide, Snackbar,
    Typography
} from "@mui/material";
import Modal from "./UI/Modal";
import CreateClientForm from "./Clients/CreateClientForm";
import React, {useState, useContext, useEffect} from "react";
import useHttp from "../hooks/use-http";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import AuthContext from "../store/auth-context";
import {createUser} from "../lib/api/users";
import {deleteAccountRequest} from "../lib/api/accountRequests";


const RequestInformation = (props) => {
    const [cautionModal, setShowCautionModal] = useState(false);
    const [createAccountModal, setShowCreateAccountModal] = useState(false);
    const request = props.request;
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const {requestId} = useParams();
    const navigate = useNavigate();
    const {
        sendRequest: deleteAccountRequestRequest,
        status: deleteAccountRequestStatus,
        data: deleteAccountRequestData,
        error: deleteAccountRequestError
    } = useHttp(deleteAccountRequest);
    const {
        sendRequest: createAccountRequest,
        status: createAccountStatus,
        data: createAccountData,
        error: createAccountError
    } = useHttp(createUser);
    const openCautionModalHandler = () => {
        setShowCautionModal(true);
    }
    const closeCautionModalHandler = () => {
        setShowCautionModal(false);
    }
    const openCreateAccountModalHandler = () => {
        setShowCreateAccountModal(true)
    }
    const closeCreateAccountModalHandler = () => {
        setShowCreateAccountModal(false)
    }
    const deleteAccountHandler = async () => {
        await deleteAccountRequestRequest({requestId, token})
    }
    const createAccountHandler = async () => {
        await createAccountRequest({...request, token})
    }
    useEffect(() => {
        if (deleteAccountRequestStatus === "completed" && !deleteAccountRequestError) {
            navigate('/account-requests', {
                state: {
                    open: true,
                    vertical: 'bottom',
                    horizontal: 'right',
                    message: 'Account request deleted successfully',
                    status: 'success',
                }
            })
        }
        if (deleteAccountRequestStatus === "completed" && deleteAccountRequestError) {
            navigate('/account-requests', {
                state: {
                    open: true,
                    vertical: 'bottom',
                    horizontal: 'right',
                    message: 'There was an error to remove account, try again later!',
                    status: 'error',
                }
            })
        }
    }, [deleteAccountRequestStatus, deleteAccountRequestData, deleteAccountRequestError])
    useEffect(() => {
        if (createAccountStatus === "completed" && !createAccountError && createAccountData) {
            navigate('/account-requests', {
                state: {
                    open: true,
                    vertical: 'bottom',
                    horizontal: 'right',
                    message: 'Account Created Successfully, if the email is correct user will get his information!',
                    status: 'success',
                }
            })
        }
        if (createAccountStatus === "completed" && createAccountError) {
            navigate('/account-requests', {
                state: {
                    open: true,
                    vertical: 'bottom',
                    horizontal: 'right',
                    message: createAccountError || 'There was an error to create account, try again later!',
                    status: 'error',
                }
            })
        }
    }, [createAccountRequest, createAccountData, createAccountError])

    return (
        <>
            <div className="flex-col lg:flex-row flex gap-6">
                <div className="basis-full">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                        <InfoItem editable={true} title={"First Name"} text={request.firstName}/>
                        <InfoItem editable={true} title={"Middle Name"}
                                  text={request.middleName !== "" ? request.middleName : "-"}/>
                        <InfoItem editable={true} title={"Last Name"} text={request.lastName}/>
                        <InfoItem editable={true} title={"Email Address"} text={request.email}/>
                        <InfoItem editable={true} title={"Phone Number"} text={`${request.phoneNumber}`}/>
                        <InfoItem editable={true} title={"Reason"} text={`${request.reason}`}/>
                        {/*<InfoItem editable={true} title={"Permissions"}*/}
                        {/*          text={"File Manager, Chat, Filling Forms, Meeting"}/>*/}
                        <div
                            className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <h6 className={""}>Created At:</h6>
                                <span className="text-gray-400">
                                   {request.createdAt}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h6 className={""}>Last Update At:</h6>
                                <span className="text-gray-400">
                                    {request.updatedAt}
                                </span>
                            </div>
                        </div>
                        <div
                            className="flex justify-end gap-4">
                            <Button
                                onClick={openCautionModalHandler}
                                variant={'outlined'} color={"error"}>Reject
                                Request</Button>
                            {/*<Link component={RouterLink} to={'/clients/add'} underline={"none"}>*/}
                            <Button
                                onClick={() => {
                                    navigate('/clients/add', {state: {...request}})
                                }}
                                variant={'contained'}>
                                Accept Request
                            </Button>
                            {/*</Link>*/}
                        </div>

                        {/*{createAccountModal &&*/}
                        {/*    <Modal open={createAccountModal} title={"Create Account"}*/}
                        {/*           onClose={closeCreateAccountModalHandler}>*/}
                        {/*        <CreateClientForm onClose={closeCreateAccountModalHandler} {...request}/>*/}
                        {/*    </Modal>*/}
                        {/*}*/}
                        {cautionModal &&
                            <Modal pending={deleteAccountRequestStatus === "pending"}
                                   onClose={closeCautionModalHandler} open={cautionModal}
                                   onAction={deleteAccountHandler} rejectText={"No"} resolveText={"Yes"}>
                                <div className={'flex gap-4 items-center justify-center flex-col'}>
                                    <i className="fa-regular text-red-400 fa-circle-exclamation fa-4x mb-4"></i>
                                    <Typography align={"left"} variant={"h4"} component={'h4'}
                                                className={"text-red-500"}>Are
                                        you sure you
                                        want to
                                        delete this account
                                        request?</Typography>
                                </div>
                            </Modal>
                        }

                        {/*<div className="flex justify-between">*/}
                        {/*    <div className="w-5/12 flex justify-between text-primary">*/}
                        {/*        <span className="">Email:</span>*/}
                        {/*        <span>{request.email}</span>*/}
                        {/*    </div>*/}
                        {/*    <span className="text-opacity-70 text-primary">Edit</span>*/}
                        {/*</div>*/}
                        {/*<div className="flex justify-between">*/}
                        {/*    <div className="w-5/12 flex justify-between text-primary">*/}
                        {/*        <span className="">Phone Number:</span>*/}
                        {/*        <span>{request.phoneNumber}</span>*/}
                        {/*    </div>*/}
                        {/*    <span className="text-opacity-70 text-primary">Edit</span>*/}
                        {/*</div>*/}
                        {/*<div className="flex justify-between">*/}
                        {/*    <div className="w-5/12 flex justify-between text-primary">*/}
                        {/*        <span className="">Permissions:</span>*/}
                        {/*        <span>File Manager, Chat, Filling Forms, Meeting</span>*/}
                        {/*    </div>*/}
                        {/*    <span className="text-opacity-70 text-primary">Edit</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    )
}
export default RequestInformation;