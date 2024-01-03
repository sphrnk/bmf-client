import InfoItem from "../../UI/InfoItem";
import {
    Select,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import useHttp from "../../../hooks/use-http";
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

const UpdateBusinessPanelInformation = (props) => {
    console.log('ZXZxzxczxcZ', props.panel, "asdasdDDDAS")
    const [formattedInputValues, setFormattedInputValues] = useState({
        phoneNumber: '',
        EINNumber: '',
        UBINumber: '',
    })
    const [companyType, setCompanyType] = useState(props.panel.companyType);
    const [companyTypeHasError, setCompanyTypeHasError] = useState(false);
    const companyNameInputRef = useRef();
    const companyEmailInputRef = useRef();
    const zipCodeInputRef = useRef();
    const addressLineInputRef = useRef();
    const aptInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();
    useEffect(() => {
        setFormattedInputValues((prevState) => {
            return {
                phoneNumber: props.panel.companyPhoneNumber,
                EINNumber: props.panel.EINNumber,
                UBINumber: props.panel.companyPhoneNumber,
            }
        })
    }, [props])
    const {
        sendRequest: sendZipCodeRequest,
        status: zipCodeStatus,
        data: zipCodeData,
        error: zipCodeErr
    } = useHttp(validateZipCode);
    const companyTypeChangeHandler = (event) => {
        setCompanyType(event.target.value);
    };

    const formattedInputChangeHandler = (event) => {
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });

    };

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
    return (
        <div className={"flex flex-col gap-4"}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className={"grid grid-cols-1 mb-4 gap-4"}>
                    <TextField
                        label="Company Name"
                        required
                        // inputRef={companyNameInputRef}
                        value={props.panel.companyName}
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
                            <MenuItem value={"small business cooperation 1120S"}>Small Business Cooperation
                                1120S</MenuItem>
                            <MenuItem value={"partnership 1065"}>Partnership 1065</MenuItem>
                            <MenuItem value={"cooperation 1120"}>Cooperation 1120</MenuItem>
                            <MenuItem value={"limited liability LLC"}>Limited Liability LLC</MenuItem>
                            <MenuItem value={"non-profit organization 990"}>Non-profit Organization 990</MenuItem>
                        </Select>
                        {companyTypeHasError && <FormHelperText>This is required!</FormHelperText>}
                    </FormControl>
                </div>
                <div className={"grid grid-cols-1 gap-4 mb-4"}>
                    <TextField
                        label="Email Address"
                        required
                        // inputRef={companyEmailInputRef}
                        value={props.panel.companyEmail}
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
                <div className={"grid grid-cols-1 gap-4 mb-4"}>
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
                {/*<InfoItem editable={true} title={"Company Name"} text={panel.companyName}/>*/}
                {/*<InfoItem editable={true} title={"Company Type"} text={panel.companyType}/>*/}
                {/*<InfoItem editable={true} title={"Company Email"} text={panel.companyEmail}/>*/}
                {/*<InfoItem editable={true} title={"Company Phone Number"} text={panel.companyPhoneNumber}/>*/}
                {/*<InfoItem editable={true} title={"Company EIN Number"} text={panel.EINNumber}/>*/}
                {/*<InfoItem editable={true} title={"Company UBI Number"} text={panel.UBINumber}/>*/}
            </div>
            <Typography component={'h1'} variant={'h5'} fontWeight={'bold'} gutterBottom>
                Address:
            </Typography>
            <div className="grid grid-cols-1 gap-4">
                <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4"}>
                    <TextField
                        label="Zip Code"
                        required
                        value={props.panel.address.zipCode}
                        // onKeyUp={zipCodeHandler}
                        // inputRef={zipCodeInputRef}
                        type={'text'}
                    />
                    <TextField
                        label="City"
                        required
                        // inputRef={cityInputRef}
                        value={props.panel.address.city}
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
                        // inputRef={stateInputRef}
                        value={props.panel.address.state}
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
                        value={props.panel.address.addressLine}
                        type={'text'}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><i
                                className="fa-regular fa-location-dot"></i></InputAdornment>,
                        }}
                    />
                    <TextField
                        label="Apt"
                        className={"col-span-4"}
                        // inputRef={aptInputRef}
                        value={props.panel.address.apt}
                        type={'text'}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><i
                                className="fa-regular fa-building"></i></InputAdornment>,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default UpdateBusinessPanelInformation