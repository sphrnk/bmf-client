import {Button, Typography} from "@mui/material";
import IndividualPortal from "../../../../../components/Portal/IndividualPortal";
import Address from "../../../../../components/Portal/Address";

const IndividualPortalPage = () => {
    return (
        <>
            <Typography component={'h1'} variant={'h4'} fontWeight={'bold'} gutterBottom>
                Individual Portal
            </Typography>

            <IndividualPortal/>
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
export default IndividualPortalPage