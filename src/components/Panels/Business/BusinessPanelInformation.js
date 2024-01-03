import InfoItem from "../../UI/InfoItem";
import {
    Select,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    TextField,
    Typography, Button, Box
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import useHttp from "../../../hooks/use-http";
import {validateZipCode} from "../../../lib/utils";
import Address from "../Address";
import {uiActions} from "../../../store/ui-slice";
import {useDispatch, useSelector} from "react-redux";
import {useUpdateBusinessPanelMutation} from "../../../store/panel/panelApiSlice";
import {selectCurrentUser} from "../../../store/auth/authSlice";

const phoneTextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="(#00) 000-0000"
            definitions={{
                '#': /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

const einTextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="00-0000000"
            definitions={{
                '#': /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

const ubiTextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="000-000-000"
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

einTextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
ubiTextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const BusinessPanelInformation = ({panel}) => {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        companyName: '',
        companyType: '',
        EINNumber: '',
        UBINumber: '',
        companyEmail: '',
        companyPhoneNumber: '',
    })
    const zipCodeInputRef = useRef();
    const addressLineInputRef = useRef();
    const aptInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();
    const [updateBusinessPanel, {isLoading, isSuccess, isError, error}] = useUpdateBusinessPanelMutation()
    console.log("ppppp", panel)
    useEffect(() => {
        setValues(() => {
            return {
                companyName: panel.companyName,
                companyType: panel.companyType,
                EINNumber: panel.EINNumber,
                UBINumber: panel.UBINumber,
                companyEmail: panel.companyEmail,
                companyPhoneNumber: panel.companyPhoneNumber,
            }
        })
        zipCodeInputRef.current.value = panel.address.zipCode;
        addressLineInputRef.current.value = panel.address.addressLine;
        aptInputRef.current.value = panel.address.apt;
        cityInputRef.current.value = panel.address.city;
        stateInputRef.current.value = panel.address.state;
    }, [panel])
    const updateAddressHandler = async (e) => {
        e.preventDefault();
        const enteredZipCode = zipCodeInputRef.current.value;
        const enteredAddressLine = addressLineInputRef.current.value;
        const enteredApt = aptInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredState = stateInputRef.current.value;
        console.log(panel);
        console.log(user);
        const data = {
            address: {
                apt: enteredApt,
                city: enteredCity,
                state: enteredState,
                zipCode: enteredZipCode,
                addressLine: enteredAddressLine,
            },
            panelId: panel.id,
            userId: user.id,
        }
        await updateBusinessPanel(data)
    }
    useEffect(() => {
        if (isSuccess) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Address Updated Successfully! Sign in again to see the update!'
            }))
        } else if (isError) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: error.data.message
            }))
        }
    }, [isSuccess, isError, error])
    return (
        <div className={"flex flex-col gap-4"}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>Company Name:</Box>
                    <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.companyName}</Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>Company Type:</Box>
                    <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.companyType}</Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>Company Email Address:</Box>
                    <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.companyEmail}</Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>Company Phone Number:</Box>
                    <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.companyPhoneNumber}</Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>Company UBI Number:</Box>
                    <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.UBINumber}</Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>Company EIN Number:</Box>
                    <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.EINNumber}</Box>
                </Box>
                <div className={"grid grid-cols-1 gap-4 mb-4"}>
                    {/*<TextField*/}
                    {/*    label="EIN Number"*/}
                    {/*    required*/}
                    {/*    name="EINNumber"*/}
                    {/*    value={formattedInputValues.EINNumber}*/}
                    {/*    onChange={formattedInputChangeHandler}*/}
                    {/*    type={'text'}*/}
                    {/*    InputProps={{*/}
                    {/*        inputComponent: einTextMaskCustom,*/}
                    {/*        startAdornment: <InputAdornment position="start"><i*/}
                    {/*            className="fa-regular fa-input-numeric"></i></InputAdornment>,*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*<TextField*/}
                    {/*    label="UBI Number"*/}
                    {/*    required*/}
                    {/*    // ref={UBINumberInputRef}*/}
                    {/*    name="UBINumber"*/}
                    {/*    value={formattedInputValues.UBINumber}*/}
                    {/*    onChange={formattedInputChangeHandler}*/}
                    {/*    type={'text'}*/}
                    {/*    InputProps={{*/}
                    {/*        inputComponent: ubiTextMaskCustom,*/}
                    {/*        startAdornment: <InputAdornment position="start"><i*/}
                    {/*            className="fa-regular fa-input-numeric"></i></InputAdornment>,*/}
                    {/*    }}*/}
                    {/*/>*/}

                </div>
            </div>
            <Address ref={{
                zipCodeInputRef: zipCodeInputRef,
                cityInputRef: cityInputRef,
                stateInputRef: stateInputRef,
                addressLineInputRef: addressLineInputRef,
                aptInputRef: aptInputRef
            }}/>
            <div className={'flex justify-end gap-4'}>
                {/*<Button variant={'text'}>Cancel</Button>*/}
                <Button onClick={updateAddressHandler} variant={'contained'}>Update Address</Button>
            </div>
            <Typography fontWeight={'bold'} color={'primary'} variant={'h4'} component={'h4'}>Business
                Partners:</Typography>
        </div>
    )
}
export default BusinessPanelInformation