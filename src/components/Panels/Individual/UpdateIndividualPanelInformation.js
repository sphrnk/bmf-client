import Select from "../../Forms/UI/Select";
import InfoItem from "../../UI/InfoItem";
import {InputAdornment, TextField, Typography} from "@mui/material";
import React, {useState, useEffect, useRef} from "react";
import useHttp from "../../../hooks/use-http";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import {validateZipCode} from "../../../lib/utils";

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
const UpdateIndividualPanelInformation = (props) => {
    const {panel} = props
    console.log(props);
    const [formattedInputValues, setFormattedInputValues] = useState({
        phoneNumber: '',
    })
    const firstNameInputRef = useRef();
    const middleNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const formattedInputChangeHandler = (event) => {
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });
    };
    useEffect(() => {
        setFormattedInputValues((prevState) => {
            return {
                phoneNumber: panel.phoneNumber,
            }
        })
    }, [props])
    const {
        sendRequest: sendZipCodeRequest,
        status: zipCodeStatus,
        data: zipCodeData,
        error: zipCodeErr
    } = useHttp(validateZipCode);
    const zipCodeInputRef = useRef();
    const addressLineInputRef = useRef();
    const aptInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();
    const zipCodeHandler = async () => {
        const enteredZipCode = zipCodeInputRef.current.value;
        // console.log(enteredZipCode);
        if (enteredZipCode.length === 5) {
            await sendZipCodeRequest({enteredZipCode});
        }
    }
    if (zipCodeStatus === "completed" && zipCodeData && !zipCodeErr) {
        cityInputRef.current.value = zipCodeData.data.code[0];
        stateInputRef.current.value = zipCodeData.data.code[1];
    }
    const submitFormHandler = async (e) => {
        e.preventDefault();
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredMiddleName = middleNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPhoneNumber = formattedInputValues.phoneNumber;
        const enteredZipCode = zipCodeInputRef.current.value;
        const enteredAddressLine = addressLineInputRef.current.value;
        const enteredApt = aptInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredState = stateInputRef.current.value;
        const portalType = "individual"
        props.onSubmit({
            panelData: {
                enteredFirstName,
                enteredMiddleName,
                enteredLastName,
                enteredEmail,
                enteredPhoneNumber
            },
            address: {
                zipCode: enteredZipCode,
                addressLine: enteredAddressLine,
                apt: enteredApt,
                city: enteredCity,
                state: enteredState,
            },
            portalType
        });
    }
    return (
        <div className={"flex flex-col gap-4"}>
            <div className={"grid grid-cols-1 lg:grid-cols-3 mb-4 gap-4"}>
                <TextField
                    label="First Name"
                    required
                    // inputRef={firstNameInputRef}
                    type={'text'}
                    value={panel.firstName}
                />
                <TextField
                    label="Middle Name"
                    // inputRef={middleNameInputRef}
                    type={'text'}
                    value={panel.middleName}
                />
                <TextField
                    label="Last Name"
                    required
                    // inputRef={lastNameInputRef}
                    value={panel.lastName}
                    type={'text'}
                />
            </div>
            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"}>
                <TextField
                    label="Email Address"
                    required
                    // inputRef={emailInputRef}
                    type={'email'}
                    value={panel.email}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-envelope"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="Phone Number"
                    required
                    // ref={companyPhoneNumberInputRef}
                    name="phoneNumber"
                    value={formattedInputValues.phoneNumber}
                    onChange={formattedInputChangeHandler}
                    type={'tel'}
                    InputProps={{
                        inputComponent: phoneTextMaskCustom,
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-phone-office"></i></InputAdornment>,
                    }}
                />
            </div>
            <Typography component={'h1'} variant={'h5'} fontWeight={'bold'} gutterBottom>
                Address:
            </Typography>
            <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4"}>
                <TextField
                    label="Zip Code"
                    required
                    // onKeyUp={zipCodeHandler}
                    // inputRef={zipCodeInputRef}
                    value={panel.address.zipCode}
                    type={'text'}
                />
                <TextField
                    label="City"
                    required
                    // inputRef={cityInputRef}
                    disabled
                    value={panel.address.city}
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-city"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="State"
                    required
                    // inputRef={stateInputRef}
                    value={panel.address.state}
                    disabled
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-flag-usa"></i></InputAdornment>,
                    }}
                />

            </div>
            <div className={"grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4"}>
                <TextField
                    label="Address Line"
                    required
                    className={"col-span-8"}
                    // inputRef={addressLineInputRef}
                    type={'text'}
                    value={panel.address.addressLine}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-location-dot"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="Apt"
                    className={"col-span-4"}
                    // inputRef={aptInputRef}
                    type={'text'}
                    value={panel.address.apt}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-building"></i></InputAdornment>,
                    }}
                />
            </div>
        </div>
    )
}
export default IndividualPanelInformation