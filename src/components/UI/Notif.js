import React, {useState} from "react";
import {Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notif = () => {
    const notification = useSelector((state) => state.ui.notification)
    const dispatch = useDispatch();
    const snackbarState = {
        open: !!notification.open,
        vertical: 'bottom',
        horizontal: 'right',
        message: notification.message,
        status: notification.status,
    };
    const {
        vertical: snackbarVertical,
        horizontal: snackbarHorizontal,
        open: snackbarOpen,
        status: snackbarStatus,
        message: snackbarMessage
    } = snackbarState;
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        // props.onClose();
        dispatch(uiActions.hideNotification())
    };

    return (
        <Snackbar open={snackbarOpen} onClose={handleSnackbarClose} autoHideDuration={6000}
                  anchorOrigin={{vertical: snackbarVertical, horizontal: snackbarHorizontal}}
                  key={snackbarVertical + snackbarHorizontal}>
            <Alert onClose={handleSnackbarClose} severity={snackbarStatus} sx={{width: '100%'}}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
}

export default Notif;
