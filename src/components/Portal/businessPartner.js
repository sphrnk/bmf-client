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
const BusinessPartner = React.forwardRef((props, ref) => {
    const [formattedInputValues, setFormattedInputValues] = useState({
        businessPartnerPhoneNumber: '',
        businessPartnerSSNNumber: '',
    })
    const formattedInputChangeHandler = (event) => {
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <>
            <div className={"grid grid-cols-1 lg:grid-cols-3 mb-4 gap-4"}>
                <TextField
                    label="First Name"
                    required
                    inputRef={ref.businessPartnerFirstNameInputRef}
                    type={'text'}
                />
                <TextField
                    label="Middle Name"
                    inputRef={ref.businessPartnerMiddleNameInputRef}
                    type={'text'}
                />
                <TextField
                    label="Last Name"
                    required
                    inputRef={ref.businessPartnerLastNameInputRef}
                    type={'text'}
                />
            </div>
            <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4"}>
                <TextField
                    label="Email Address"
                    required
                    inputRef={ref.businessPartnerEmailInputRef}
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
                    value={ref.businessPartnerPhoneNumber}
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
                    value={ref.businessPartnerSSNNumber}
                    onChange={formattedInputChangeHandler}
                    type={'tel'}
                    InputProps={{
                        inputComponent: businessPartnerSSNNumberTextMaskCustom,
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-user-lock"></i></InputAdornment>,
                    }}
                />
            </div>
            }
        </>
    )
})
export default BusinessPartner;