import {Button, Typography} from "@mui/material";
import IndividualPanel from "../../../../components/Panels/Individual/IndividualPanel";
import Address from "../../../../components/Panels/Address";

const IndividualPanelPage = () => {
    return (
        <>
            <Typography component={'h1'} variant={'h4'} fontWeight={'bold'} gutterBottom>
                Individual Portal
            </Typography>

            <IndividualPanel/>
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
export default IndividualPanelPage