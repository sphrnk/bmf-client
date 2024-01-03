import {Typography} from "@mui/material";
import IndividualPanel from "../../../../components/Panels/Individual/IndividualPanel";
import {Link} from "react-router-dom";


const CompleteIndividualPortalPage = () => {
    return (
        <>
            <Typography component={'h1'} variant={'h1'} color={'primary'} fontWeight={'bold'} gutterBottom>
                Complete Individual Portal:
            </Typography>
            <Typography color={'primary'} paragraph gutterBottom>
                {/*Here is info of the user who wants to use this panel enter the info of the user*/}
                some text
            </Typography>
            <IndividualPanel/>
        </>
    )
}
export default CompleteIndividualPortalPage;