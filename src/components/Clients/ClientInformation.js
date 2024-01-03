import Layout from "../../Layout/Dashboard/Layout";
import InfoItem from "../UI/InfoItem";
import {
    Box,
    Button,
    Checkbox, Chip, FormControl, FormHelperText,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField, Typography
} from "@mui/material";
import React, {useState, useRef, useEffect} from "react";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import useHttp from "../../hooks/use-http";
import {updateUser} from "../../lib/api/users";
import {useDispatch} from "react-redux";
import {uiActions} from "../../store/ui-slice";
import {useNavigate} from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const phoneTextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="+1 (#00) 000-0000"
            definitions={{
                '#': /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});
phoneTextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
const ClientInformation = ({user}) => {
    const createdAt = new Date(user.createdAt).toLocaleDateString("en-US");
    const updatedAt = new Date(user.updatedAt).toLocaleDateString("en-US");
    console.log(user);
    const [values, setValues] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        individualPortalCount: '',
        businessPortalCount: '',
    })
    useEffect(() => {
        setValues((prevState) => {
            return {
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                individualPortal: user.individualPortal,
                individualPortalCount: user.individualPortalCount,
                businessPortal: user.businessPortal,
                businessPortalCount: user.businessPortalCount,
            }
        })
    }, [user])
    return (
        <>
            <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-12">
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>First Name:</Box>
                        <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.firstName}</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>Middle Name:</Box>
                        <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.middleName || '-'}</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>Last Name:</Box>
                        <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.lastName}</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>Email Address:</Box>
                        <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.email}</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box color={'primary'} sx={{fontWeight: 'bold', color: 'text.primary'}}>Phone Number:</Box>
                        <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.phoneNumber}</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box color={'primary'} sx={{fontWeight: 'bold', color: 'text.primary'}}>Portal Access:</Box>
                        <Box
                            sx={{fontWeight: 'normal', color: 'text.secondary'}} mt={0.5}>
                            {values.individualPortal ? <Chip label="Individual"/> : null}
                            {values.businessPortal ? <Chip label="Business"/> : null}
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box color={'primary'} sx={{fontWeight: 'bold', color: 'text.primary'}}>Number of Individual
                            Portals:</Box>
                        <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.individualPortalCount}</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box color={'primary'} sx={{fontWeight: 'bold', color: 'text.primary'}}>Number of Business
                            Portals:</Box>
                        <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.businessPortalCount}</Box>
                    </Box>
                    {/*<InfoItem editable={true} title={"Permissions"}*/}
                    {/*          text={"File Manager, Chat, Filling Forms, Meeting"}/>*/}
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box color={'primary'} sx={{fontWeight: 'bold', color: 'text.primary'}}>Created At:</Box>
                        <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{createdAt}</Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>Last Update At:</Box>
                        <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{updatedAt}</Box>
                    </Box>
                </div>
            </div>
        </>
    )
}
export default ClientInformation;