import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import UpdateBusinessPartnerForm from "../../../../../components/Panels/Business/Partners/UpdateBusinessPartnerForm";
import {useDispatch} from "react-redux";
import {uiActions} from "../../../../../store/ui-slice";
import {useNavigate, useParams} from "react-router-dom";
import {useGetBusinessPartnersQuery} from "../../../../../store/panel/businessPartnersApiSlice";


const UpdateBusinessPartnerPage = () => {
    const {partnerId} = useParams();
    console.log(partnerId)
    const {businessPartner} = useGetBusinessPartnersQuery('businessPartnersList',
        {
            selectFromResult: ({data}) => ({
                businessPartner: data?.entities[partnerId]
            })
        }
    )
    console.log(businessPartner);
    return (
        <>
            <Typography color={'primary'} component={"h1"} variant={"h1"} mb={2} fontWeight={"bold"}>Update
                Business Partner</Typography>
            <UpdateBusinessPartnerForm businessPartner={businessPartner}/>
        </>);
}
export default UpdateBusinessPartnerPage;