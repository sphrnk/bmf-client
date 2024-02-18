import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import CreateClientForm from "../../../components/Clients/CreateClientForm";
import {useDispatch} from "react-redux";
import {uiActions} from "../../../store/ui-slice";
import {useNavigate} from "react-router-dom";
import {useCreateClientMutation} from "../../../store/client/clientsApiSlice";


const CreateClientPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {sendRequest, status, data} = useHttp(createUser);
    const [createClient, {isSuccess, isLoading, isError, error}] = useCreateClientMutation()
    const createAccount = async (data) => {
        console.log('12312313', data)
        await createClient(data);
        // sendRequest({...data, token});
    }
    useEffect(() => {
        console.log(isSuccess, isError, error)
        if (isSuccess) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Account Created Successfully, if the email is correct user will get his information!'
            }))
            navigate('/clients')
        } else if (isError) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: error.data.message
            }))
        }
    }, [isSuccess, isError, error])

    return (
        <>
            <Typography color={'primary'} component={"h3"} variant={"h3"} mb={2} fontWeight={"bold"}>Create
                Client</Typography>
            <CreateClientForm isLoading={isLoading} onSubmit={createAccount}/>
        </>);
}
export default CreateClientPage;