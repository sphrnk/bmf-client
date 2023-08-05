import {Typography} from "@mui/material";
import BusinessPortal from "../../../../../components/Portal/BusinessPortal";
import {useContext, useEffect} from "react";
import AuthContext from "../../../../../store/auth-context";
import {useDispatch} from "react-redux";
import useHttp from "../../../../../hooks/use-http";
import {createPanel} from "../../../../../lib/api/portals";
import {uiActions} from "../../../../../store/ui-slice";

const BusinessPortalPage = (props) => {
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const dispatch = useDispatch();
    const {sendRequest, status, data, error} = useHttp(createPanel);
    const createPanelRequest = async (data) => {
        console.log(data)
        // await sendRequest({...data, token});
    }
    if (data) {
        // console.log(data);
        dispatch(uiActions.showNotification({
            status: 'success',
            message: 'Panel Created Successfully! Sign in again for the update'
        }))
    }
    if (status === "completed" && error) {
        dispatch(uiActions.showNotification({
            status: 'error',
            message: error
        }))
    }
    useEffect(() => {
        if (status === 'completed' && !error) {
            authCtx.logout()
        }
    })
    return (
        <>
            <Typography component={'h1'} variant={'h4'} fontWeight={'bold'} gutterBottom>
                Complete Business Portal
            </Typography>
            <BusinessPortal onSubmit={createPanelRequest}/>
        </>
    )
}
export default BusinessPortalPage;