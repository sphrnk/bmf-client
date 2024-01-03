import Select from "../../Forms/UI/Select";
import InfoItem from "../../UI/InfoItem";
import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import React, {useState, useEffect, useRef} from "react";
import useHttp from "../../../hooks/use-http";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import {validateZipCode} from "../../../lib/utils";
import Address from "../Address";
import {useUpdateIndividualPanelMutation} from "../../../store/panel/panelApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../../store/auth/authSlice";
import {uiActions} from "../../../store/ui-slice";

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

phoneTextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
const IndividualPanelInformation = ({panel}) => {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        USCitizen: '',
    }, [panel])
    const zipCodeInputRef = useRef();
    const addressLineInputRef = useRef();
    const aptInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();
    useEffect(() => {
        setValues(() => {
            return {
                firstName: panel.firstName,
                middleName: panel.middleName,
                lastName: panel.lastName,
                email: panel.email,
                phoneNumber: panel.phoneNumber,
                USCitizen: panel.USCitizen,
            }
        })
        zipCodeInputRef.current.value = panel.address.zipCode;
        addressLineInputRef.current.value = panel.address.addressLine;
        aptInputRef.current.value = panel.address.apt;
        cityInputRef.current.value = panel.address.city;
        stateInputRef.current.value = panel.address.state;
    })
    const [updateIndividualPanel, {isLoading, isSuccess, isError, error}] = useUpdateIndividualPanelMutation()

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
        await updateIndividualPanel(data)
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
            <div className={"grid grid-cols-1 lg:grid-cols-3 mb-4 gap-4"}>
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
                    <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>Phone Number:</Box>
                    <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{values.phoneNumber}</Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{fontWeight: 'bold', color: 'text.primary'}}>USA Citizen:</Box>
                    <Box sx={{fontWeight: 'normal', color: 'text.secondary'}}>{`${values.USCitizen}`}</Box>
                </Box>
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
        </div>
    )
}
export default IndividualPanelInformation