import UploadFileForm from "../../components/Forms/UploadFileForm";
import {Button, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import FirstTimeChangePasswordForm from "../../components/Forms/FirstTimeChangePasswordForm";

const TempPasswordPage = () => {
    return (
        <>
            <Typography variant={'h2'} component={'h2'}>
                Change Current Temp Password
            </Typography>
            <Typography mt={1} variant={'body1'}>
                Change Current Temp Password your new password should contain 8 characters, 1 symbol and capital
                character.
            </Typography>
            <FirstTimeChangePasswordForm/>
        </>
    )
}
export default TempPasswordPage;