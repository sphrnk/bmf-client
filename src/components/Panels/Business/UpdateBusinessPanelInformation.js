import InfoItem from "../../UI/InfoItem";
import {
    Select,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    TextField,
    Typography, Button
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import useHttp from "../../../hooks/use-http";
import {validateZipCode} from "../../../lib/utils";
import Address from "../Address";
import {useUpdateBusinessPanelMutation} from "../../../store/panel/panelApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
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

const UpdateBusinessPanelInformation = ({panel}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [formattedInputValues, setFormattedInputValues] = useState({
        phoneNumber: '',
        EINNumber: '',
        UBINumber: '',
    })
    const [companyType, setCompanyType] = useState(panel.companyType);
    const [companyTypeHasError, setCompanyTypeHasError] = useState(false);
    const companyNameInputRef = useRef();
    const companyEmailInputRef = useRef();
    const zipCodeInputRef = useRef();
    const addressLineInputRef = useRef();
    const aptInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();
    const [updateBusinessPanel, {isLoading, isSuccess, isError, error}] = useUpdateBusinessPanelMutation()
    useEffect(() => {
        setFormattedInputValues((prevState) => {
            return {
                phoneNumber: panel.companyPhoneNumber,
                EINNumber: panel.EINNumber,
                UBINumber: panel.UBINumber,
            }
        })
        companyNameInputRef.current.value = panel.companyName;
        companyEmailInputRef.current.value = panel.companyEmail;

        zipCodeInputRef.current.value = panel.address.zipCode;
        addressLineInputRef.current.value = panel.address.addressLine;
        aptInputRef.current.value = panel.address.apt;
        cityInputRef.current.value = panel.address.city;
        stateInputRef.current.value = panel.address.state;
    }, [panel])

    const companyTypeChangeHandler = (event) => {
        setCompanyType(event.target.value);
    };

    const formattedInputChangeHandler = (event) => {
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });

    };
    const updatePanelHandler = async () => {
        const enteredCompanyName = companyNameInputRef.current.value;
        const enteredEmailAddress = companyEmailInputRef.current.value;
        const enteredEINNumber = formattedInputValues.EINNumber;
        const enteredUBINumber = formattedInputValues.UBINumber;
        const enteredPhoneNumber = formattedInputValues.phoneNumber;
        const enteredZipCode = zipCodeInputRef.current.value;
        const enteredAddressLine = addressLineInputRef.current.value;
        const enteredApt = aptInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredState = stateInputRef.current.value;

        const data = {
            companyName: enteredCompanyName,
            email: enteredEmailAddress,
            EINNumber: enteredEINNumber,
            UBINumber: enteredUBINumber,
            phoneNumber: enteredPhoneNumber,
            companyType,
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
        await updateBusinessPanel(data);
    }
    useEffect(() => {
        if (isSuccess) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Client Panel Updated Successfully!'
            }))
            navigate('/clients')
        } else if (isError) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: error.data.message
            }))
        }
    }, [isError, isSuccess, error])
    return (
        <div className={"flex flex-col gap-4"}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className={"grid grid-cols-1 mb-4 gap-4"}>
                    <TextField
                        label="Company Name"
                        required
                        inputRef={companyNameInputRef}
                        // value={panel.companyName}
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
                        inputRef={companyEmailInputRef}
                        // value={panel.companyEmail}
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
                <Button onClick={updatePanelHandler} variant={'contained'}>Update Panel</Button>
            </div>
        </div>
    )
}
export default UpdateBusinessPanelInformation