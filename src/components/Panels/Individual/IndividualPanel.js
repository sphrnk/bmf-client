import {Box, Button, Checkbox, FormControlLabel, InputAdornment, TextField, Typography} from "@mui/material";
import React, {useState, useRef, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {IMaskInput} from "react-imask";
import Address from "../Address";
import useHttp from "../../../hooks/use-http";
import {validateZipCode} from "../../../lib/utils";
import {selectCurrentUser, logout} from "../../../store/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useCreateIndividualPanelMutation} from '../../../store/panel/panelApiSlice';
import {uiActions} from "../../../store/ui-slice";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../../store/auth-context";

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
const IndividualPanel = (props) => {
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [createIndividualPanel, {isLoading, isSuccess, isError, error}] = useCreateIndividualPanelMutation()
    const [formattedInputValues, setFormattedInputValues] = useState({
        phoneNumber: '',
    })
    const navigate = useNavigate();
    const firstNameInputRef = useRef();
    const middleNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const [USCitizen, setUSCitizen] = useState(true);
    const formattedInputChangeHandler = (event) => {
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });
    };
    const handleCitizenChange = (event) => {
        setUSCitizen(event.target.checked)
    }
    const zipCodeInputRef = useRef();
    const addressLineInputRef = useRef();
    const aptInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();

    console.log(currentUser);
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
        const data = {
            userId: currentUser.id,
            firstName: enteredFirstName,
            middleName: enteredMiddleName,
            lastName: enteredLastName,
            email: enteredEmail,
            USCitizen,
            phoneNumber: enteredPhoneNumber,
            address: {
                zipCode: enteredZipCode,
                addressLine: enteredAddressLine,
                apt: enteredApt,
                city: enteredCity,
                state: enteredState,
            },
        }
        await createIndividualPanel(data)
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
            <div className={"grid grid-cols-1 lg:grid-cols-4 mb-4 gap-4"}>
                <TextField
                    label="First Name"
                    required
                    inputRef={firstNameInputRef}
                    type={'text'}
                />
                <TextField
                    label="Middle Name"
                    inputRef={middleNameInputRef}
                    type={'text'}
                />
                <TextField
                    label="Last Name"
                    required
                    inputRef={lastNameInputRef}
                    type={'text'}
                />
                <FormControlLabel control={<Checkbox defaultChecked onChange={handleCitizenChange}/>}
                                  label="US Citizen"/>
            </div>
            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"}>
                <TextField
                    label="Email Address"
                    required
                    inputRef={emailInputRef}
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
            <Address ref={{zipCodeInputRef, cityInputRef, stateInputRef, addressLineInputRef, aptInputRef}}/>

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
                    Submit
                </Button>
            </div>
        </form>
    )
}
export default IndividualPanel