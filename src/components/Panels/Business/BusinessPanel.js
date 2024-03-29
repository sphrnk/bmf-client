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
import React, {useRef, useState, useEffect, useContext} from "react";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import useHttp from "../../../hooks/use-http";
import {validateZipCode} from "../../../lib/utils";
import Address from "../Address";
import BusinessPartner from "./Partners/businessPartner";
import {useCreateBusinessPanelMutation} from "../../../store/panel/panelApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectCurrentUser} from "../../../store/auth/authSlice";
import {uiActions} from "../../../store/ui-slice";
import AuthContext from "../../../store/auth-context";
import {useNavigate} from "react-router-dom";

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
const BusinessPanel = (props) => {
    const [createBusinessPanel, {isLoading, isSuccess, isError, error}] = useCreateBusinessPanelMutation()
    const currentUser = useSelector(selectCurrentUser);
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const partnersAmountInputRef = useRef();
    const businessPartnerZipCodeInputRef = useRef();
    const businessPartnerAddressLineInputRef = useRef();
    const businessPartnerAptInputRef = useRef();
    const businessPartnerCityInputRef = useRef();
    const businessPartnerStateInputRef = useRef();
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
        const data = {
            userId: currentUser.id,
            companyEmail: enteredCompanyEmail,
            companyPhoneNumber: enteredCompanyPhoneNumber,
            companyName: enteredCompanyName,
            companyType: enteredCompanyType,
            UBINumber: enteredCompanyUBINumber,
            EINNumber: enteredCompanyEINNumber,
            // partnersInformation: enteredPartnersInformation,
            address: {
                zipCode: enteredZipCode,
                addressLine: enteredAddressLine,
                apt: enteredApt,
                city: enteredCity,
                state: enteredState,
            },
        }
        await createBusinessPanel(data);
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Panel Created Successfully! Sign in again to use your account'
            }))
            authCtx.logout();
            dispatch(logout())
            navigate('/login');


        } else if (isError) {

            dispatch(uiActions.showNotification({
                status: 'error',
                message: error.data.message
            }))
        }
    }, [isError, isSuccess, error])
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
            <Address ref={{zipCodeInputRef, cityInputRef, stateInputRef, addressLineInputRef, aptInputRef}}/>
            {/*<Typography component={'h1'} variant={'h5'} fontWeight={'bold'} gutterBottom>*/}
            {/*    Business Partners:*/}
            {/*</Typography>*/}
            {/*<div className={"flex justify-start my-4 gap-4"}>*/}
            {/*    <TextField inputRef={partnersAmountInputRef} variant="outlined" label={"Amount Of Partners"}*/}
            {/*               size={"small"}/>*/}
            {/*    <Button onClick={addBusinessPartnerButtonClickHandler}*/}
            {/*            startIcon={<i className="fa-regular fa-user-plus"></i>} variant={'contained'}>*/}
            {/*        Add Business Partners*/}
            {/*    </Button>*/}
            {/*</div>*/}
            {/*{*/}
            {/*    showAddBusinessPartner && <>*/}
            {/*        <div className={"grid grid-cols-1 lg:grid-cols-3 mb-4 gap-4"}>*/}
            {/*            <TextField*/}
            {/*                label="First Name"*/}
            {/*                required*/}
            {/*                inputRef={businessPartnerFirstNameInputRef}*/}
            {/*                type={'text'}*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                label="Middle Name"*/}
            {/*                inputRef={businessPartnerMiddleNameInputRef}*/}
            {/*                type={'text'}*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                label="Last Name"*/}
            {/*                required*/}
            {/*                inputRef={businessPartnerLastNameInputRef}*/}
            {/*                type={'text'}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4"}>*/}
            {/*            <TextField*/}
            {/*                label="Email Address"*/}
            {/*                required*/}
            {/*                inputRef={businessPartnerEmailInputRef}*/}
            {/*                type={'email'}*/}
            {/*                InputProps={{*/}
            {/*                    startAdornment: <InputAdornment position="start"><i*/}
            {/*                        className="fa-regular fa-envelope"></i></InputAdornment>,*/}
            {/*                }}*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                label="Phone Number"*/}
            {/*                required*/}
            {/*                // ref={companyPhoneNumberInputRef}*/}
            {/*                name="businessPartnerPhoneNumber"*/}
            {/*                value={formattedInputValues.businessPartnerPhoneNumber}*/}
            {/*                onChange={formattedInputChangeHandler}*/}
            {/*                type={'tel'}*/}
            {/*                InputProps={{*/}
            {/*                    inputComponent: phoneTextMaskCustom,*/}
            {/*                    startAdornment: <InputAdornment position="start"><i*/}
            {/*                        className="fa-regular fa-phone-office"></i></InputAdornment>,*/}
            {/*                }}*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                label="SSN Number"*/}
            {/*                required*/}
            {/*                // ref={companyPhoneNumberInputRef}*/}
            {/*                name="businessPartnerSSNNumber"*/}
            {/*                value={formattedInputValues.businessPartnerSSNNumber}*/}
            {/*                onChange={formattedInputChangeHandler}*/}
            {/*                type={'tel'}*/}
            {/*                InputProps={{*/}
            {/*                    inputComponent: businessPartnerSSNNumberTextMaskCustom,*/}
            {/*                    startAdornment: <InputAdornment position="start"><i className="fa-regular fa-user-lock"></i></InputAdornment>,*/}
            {/*                }}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </>*/}
            {/*}*/}
            {/*<BusinessPartner ref={{*/}
            {/*    businessPartnerFirstNameInputRef,*/}
            {/*    businessPartnerMiddleNameInputRef,*/}
            {/*    businessPartnerLastNameInputRef,*/}
            {/*    businessPartnerEmailInputRef,*/}
            {/*    businessPartnerPhoneNumber: formattedInputValues.businessPartnerPhoneNumber,*/}
            {/*    businessPartnerSSNNumber: formattedInputValues.businessPartnerSSNNumber*/}
            {/*}}/>*/}
            <div className={"flex justify-end"}>
                <Button type={"submit"} variant="contained">
                    {isLoading &&
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    }
                    Create Panel
                </Button>
            </div>
        </form>
    )
}
export default BusinessPanel;