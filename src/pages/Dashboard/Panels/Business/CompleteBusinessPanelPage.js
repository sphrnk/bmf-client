import {Typography} from "@mui/material";
import BusinessPanel from "../../../../components/Panels/Business/BusinessPanel";
import {useState} from "react";
import {useDispatch} from "react-redux";

const BusinessPortalPage = (props) => {
    const dispatch = useDispatch();
    // const {sendRequest, status, data, error} = useHttp(createPanel);
    const [step, setStep] = useState();
    const createPanelRequest = async (data) => {
        // await sendRequest({...data, token});
    }
    // if (data) {
    //     // console.log(data);
    //     dispatch(uiActions.showNotification({
    //         status: 'success',
    //         message: 'Panel Created Successfully! Sign in again for the update'
    //     }))
    // }
    // if (status === "completed" && error) {
    //     dispatch(uiActions.showNotification({
    //         status: 'error',
    //         message: error
    //     }))
    // }
    // useEffect(() => {
    //     if (status === 'completed' && !error) {
    //         authCtx.logout()
    //     }
    // })
    return (
        <>
            <Typography component={'h1'} variant={'h1'} color={'primary'} fontWeight={'bold'} gutterBottom>
                Complete Business Portal:
            </Typography>
            <Typography color={'primary'} paragraph gutterBottom>
                {/*Here is info of the user who wants to use this panel enter the info of the user*/}
                some text
            </Typography>
            <BusinessPanel onSubmit={createPanelRequest}/>
        </>
    )
}
export default BusinessPortalPage;