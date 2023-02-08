import {Button, Typography} from "@mui/material";
import IndividualPortal from "../../../../../components/Portal/IndividualPortal";
import Address from "../../../../../components/Portal/Address";
import BusinessPortal from "../../../../../components/Portal/BusinessPortal";

const BusinessPortalPage = ()=>{

    return(
        <>
            <Typography component={'h1'} variant={'h4'} fontWeight={'bold'} gutterBottom>
                Business Portal
            </Typography>
            <BusinessPortal/>
            <Typography component={'h1'} variant={'h5'} fontWeight={'bold'} gutterBottom>
                Address:
            </Typography>
            <Address/>
            <div className={"flex justify-end"}>
                <Button variant="contained">Submit</Button>
            </div>
        </>
    )
}
export default BusinessPortalPage;