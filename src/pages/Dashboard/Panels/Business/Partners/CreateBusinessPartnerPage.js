import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import CreateBusinessPartnerForm from "../../../../../components/Panels/Business/Partners/CreateBusinessPartnerForm";
import {useDispatch} from "react-redux";
import {uiActions} from "../../../../../store/ui-slice";
import {useNavigate} from "react-router-dom";
import {useCreateBusinessPartnerMutation} from "../../../../../store/panel/businessPartnersApiSlice";


const CreateBusinessPartnerPage = () => {
    return (
        <>
            <Typography color={'primary'} component={"h1"} variant={"h1"} mb={2} fontWeight={"bold"}>Create
                Business Partner</Typography>
            <CreateBusinessPartnerForm/>
        </>);
}
export default CreateBusinessPartnerPage;