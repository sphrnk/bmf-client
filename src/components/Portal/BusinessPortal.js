import {
    Button,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import React, {useRef, useState} from "react";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import useHttp from "../../hooks/use-http";
import {validateZipCode} from "../../lib/utils";

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

const businessPartnerSSNNumberTextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="00-0000-000"
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

businessPartnerSSNNumberTextMaskCustom.propTypes = {
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
const BusinessPortal = (props) => {
    const [showAddBusinessPartner, setShowAddBusinessPartner] = useState(false);
    const [formattedInputValues, setFormattedInputValues] = useState({
        phoneNumber: '',
        businessPartnerPhoneNumber: '',
        businessPartnerSSNNumber: '',
        EINNumber: '',
        UBINumber: '',
    })
    const [companyType, setCompanyType] = useState("sole proprietor");
    const [companyTypeHasError, setCompanyTypeHasError] = useState(false);
    const companyTypeChangeHandler = (event) => {
        setCompanyType(event.target.value);
    };
    const companyNameInputRef = useRef();
    const companyEmailInputRef = useRef();
    const businessPartnerFirstNameInputRef = useRef();
    const businessPartnerMiddleNameInputRef = useRef();
    const businessPartnerLastNameInputRef = useRef();
    const businessPartnerEmailInputRef = useRef();
    const formattedInputChangeHandler = (event) => {
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });
    };
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
    const businessPartnerZipCodeInputRef = useRef();
    const businessPartnerAddressLineInputRef = useRef();
    const businessPartnerAptInputRef = useRef();
    const businessPartnerCityInputRef = useRef();
    const businessPartnerStateInputRef = useRef();
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
        e.preventDefault()
        const enteredCompanyName = companyNameInputRef.current.value;
        const enteredCompanyEmail = companyEmailInputRef.current.value;
        const enteredCompanyType = companyType;
        const enteredCompanyPhoneNumber = formattedInputValues.phoneNumber;
        const enteredCompanyEINNumber = formattedInputValues.EINNumber;
        const enteredCompanyUBINumber = formattedInputValues.UBINumber;
        const enteredZipCode = zipCodeInputRef.current.value;
        const enteredAddressLine = addressLineInputRef.current.value;
        const enteredApt = aptInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredState = stateInputRef.current.value;
        const portalType = "business"
        props.onSubmit({
            panelData: {
                enteredCompanyName,
                enteredCompanyEmail,
                enteredCompanyType,
                enteredCompanyPhoneNumber,
                enteredCompanyEINNumber,
                enteredCompanyUBINumber,
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
    const addBusinessPartnerButtonClickHandler = () => {
        setShowAddBusinessPartner(true)
    }
    return (
        <form onSubmit={submitFormHandler}>
            <div className={"grid grid-cols-1 lg:grid-cols-2 mb-4 gap-4"}>
                <TextField
                    label="Company Name"
                    required
                    inputRef={companyNameInputRef}
                    type={'text'}
                />
                <FormControl fullWidth error={companyTypeHasError}>
                    <InputLabel id="demo-simple-select-label">Company Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={companyType}
                        label="Company Type"
                        onChange={companyTypeChangeHandler}
                    >
                        <MenuItem value={"sole proprietor"}>Sole Proprietor</MenuItem>
                        <MenuItem value={"small business cooperation 1120S"}>Small Business Cooperation 1120S</MenuItem>
                        <MenuItem value={"partnership 1065"}>Partnership 1065</MenuItem>
                        <MenuItem value={"cooperation 1120"}>Cooperation 1120</MenuItem>
                        <MenuItem value={"limited liability LLC"}>Limited Liability LLC</MenuItem>
                        <MenuItem value={"non-profit organization 990"}>Non-profit Organization 990</MenuItem>
                    </Select>
                    {companyTypeHasError && <FormHelperText>This is required!</FormHelperText>}
                </FormControl>
            </div>
            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"}>
                <TextField
                    label="Email Address"
                    required
                    inputRef={companyEmailInputRef}
                    type={'email'}
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
            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"}>
                <TextField
                    label="EIN Number"
                    required
                    name="EINNumber"
                    value={formattedInputValues.EINNumber}
                    onChange={formattedInputChangeHandler}
                    type={'text'}
                    InputProps={{
                        inputComponent: einTextMaskCustom,
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-input-numeric"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="UBI Number"
                    required
                    // ref={UBINumberInputRef}
                    name="UBINumber"
                    value={formattedInputValues.UBINumber}
                    onChange={formattedInputChangeHandler}
                    type={'text'}
                    InputProps={{
                        inputComponent: ubiTextMaskCustom,
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-input-numeric"></i></InputAdornment>,
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
                    onKeyUp={zipCodeHandler}
                    inputRef={zipCodeInputRef}
                    type={'text'}
                />
                <TextField
                    label="City"
                    required
                    inputRef={cityInputRef}
                    disabled
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-city"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="State"
                    required
                    inputRef={stateInputRef}
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
                    inputRef={addressLineInputRef}
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-location-dot"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="Apt"
                    className={"col-span-4"}
                    inputRef={aptInputRef}
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-building"></i></InputAdornment>,
                    }}
                />
            </div>
            <Typography component={'h1'} variant={'h5'} fontWeight={'bold'} gutterBottom>
                Business Partners:
            </Typography>
            <div className={"flex justify-start my-4 gap-4"}>
                <TextField variant="outlined" label={"Amount Of Partners"} size={"small"}/>
                <Button onClick={addBusinessPartnerButtonClickHandler}
                        startIcon={<i className="fa-regular fa-user-plus"></i>} variant={'contained'}>
                    Add Business Partners
                </Button>
            </div>
            {
                showAddBusinessPartner && <>
                    <div className={"grid grid-cols-1 lg:grid-cols-3 mb-4 gap-4"}>
                        <TextField
                            label="First Name"
                            required
                            inputRef={businessPartnerFirstNameInputRef}
                            type={'text'}
                        />
                        <TextField
                            label="Middle Name"
                            inputRef={businessPartnerMiddleNameInputRef}
                            type={'text'}
                        />
                        <TextField
                            label="Last Name"
                            required
                            inputRef={businessPartnerLastNameInputRef}
                            type={'text'}
                        />
                    </div>
                    <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4"}>
                        <TextField
                            label="Email Address"
                            required
                            inputRef={businessPartnerEmailInputRef}
                            type={'email'}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><i
                                    className="fa-regular fa-envelope"></i></InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Phone Number"
                            required
                            // ref={companyPhoneNumberInputRef}
                            name="businessPartnerPhoneNumber"
                            value={formattedInputValues.businessPartnerPhoneNumber}
                            onChange={formattedInputChangeHandler}
                            type={'tel'}
                            InputProps={{
                                inputComponent: phoneTextMaskCustom,
                                startAdornment: <InputAdornment position="start"><i
                                    className="fa-regular fa-phone-office"></i></InputAdornment>,
                            }}
                        />
                        <TextField
                            label="SSN Number"
                            required
                            // ref={companyPhoneNumberInputRef}
                            name="businessPartnerSSNNumber"
                            value={formattedInputValues.businessPartnerSSNNumber}
                            onChange={formattedInputChangeHandler}
                            type={'tel'}
                            InputProps={{
                                inputComponent: businessPartnerSSNNumberTextMaskCustom,
                                startAdornment: <InputAdornment position="start"><i className="fa-regular fa-user-lock"></i></InputAdornment>,
                            }}
                        />
                    </div>
                </>
            }

            <div className={"flex justify-end"}>
                <Button type={"submit"} variant="contained">Submit</Button>
            </div>
        </form>
    )
}
export default BusinessPortal;