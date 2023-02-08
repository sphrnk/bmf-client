import Layout from "../../../Layout/Dashboard/Layout";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../store/auth-context";
import useHttp from "../../../hooks/use-http";
import {getAccountRequests} from "../../../lib/api/accountRequests";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {Link, useLocation} from "react-router-dom";
import {Snackbar} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import AccountRequestList from "../../../components/AccountRequestsList";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AccountRequestsPage = () => {
    const {state} = useLocation();
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
        message: 'success',
        status: 'success',
    });
    useEffect(() => {
        if (state) {
            setSnackbarState({
                open: state.open,
                vertical: 'bottom',
                horizontal: 'right',
                message: state.message,
                status: state.status,
            })
        }
    }, [state])
    const {
        vertical: snackbarVertical,
        horizontal: snackbarHorizontal,
        open: snackbarOpen,
        status: snackbarStatus,
        message: snackbarMessage
    } = snackbarState;
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
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarState((prevState) => {
            return {...prevState, open: false}
        });
    };
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
        accountRequestsContent = <AccountRequestList accountRequests={accountRequests}/>
    }
    if (accountRequestsStatus === "completed" && !accountRequests && accountRequestsError) {
        accountRequestsContent = <p className={"self-center"}>There is not any file, upload one!</p>
    }
    return (
        <>
            <h1 className={"font-bold text-4xl mb-3"}>AccountRequests</h1>
            {accountRequestsContent}
            <Snackbar open={snackbarOpen} onClose={handleSnackbarClose} autoHideDuration={6000}
                      anchorOrigin={{vertical: snackbarVertical, horizontal: snackbarHorizontal}}
                      key={snackbarVertical + snackbarHorizontal}>
                <Alert onClose={handleSnackbarClose} severity={snackbarStatus} sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
export default AccountRequestsPage;