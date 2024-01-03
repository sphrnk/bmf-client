import {Typography} from "@mui/material";
import CreatePanelForm from "../../../components/Forms/CreatePanelForm";

const CreatePanelPage = () => {
    // const authCtx = useContext(AuthContext);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const {sendRequest, status, data, error} = useHttp(createPanel);
    // // const createPanelReq = async (data) => {
    // //     await sendRequest({...data, token});
    // // }
    // if (data) {
    //     // console.log(data);
    //     dispatch(uiActions.showNotification({
    //         status: 'success',
    //         message: 'Panel Created Successfully!'
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
    //         navigate('/portals')
    //     }
    // })
    return (
        <>
            <Typography component={"h4"} variant={"h4"} mb={2} fontWeight={"bold"}>Create Panel</Typography>
            <CreatePanelForm/>
        </>

    )
}
export default CreatePanelPage;