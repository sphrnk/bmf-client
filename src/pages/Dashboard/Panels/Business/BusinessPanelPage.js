import {Button, Typography} from "@mui/material";
import Address from "../../../../components/Panels/Address";
import BusinessPanel from "../../../../components/Panels/Business/BusinessPanel";

const BusinessPanelPage = () => {

    return (
        <>
            <Typography component={'h1'} variant={'h4'} fontWeight={'bold'} gutterBottom>
                Business Portal
            </Typography>
            <BusinessPanel/>
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
export default BusinessPanelPage;