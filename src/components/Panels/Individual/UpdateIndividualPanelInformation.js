import Select from "../../Forms/UI/Select";
import InfoItem from "../../UI/InfoItem";
import {Button, InputAdornment, TextField, Typography} from "@mui/material";
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

phoneTextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
const UpdateIndividualPanelInformation = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const {panel} = props
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
        firstNameInputRef.current.value = panel.firstName;
        middleNameInputRef.current.value = panel.middleName;
        lastNameInputRef.current.value = panel.lastName;
        emailInputRef.current.value = panel.email;
        zipCodeInputRef.current.value = panel.address.zipCode;
        addressLineInputRef.current.value = panel.address.addressLine;
        aptInputRef.current.value = panel.address.apt;
        cityInputRef.current.value = panel.address.city;
        stateInputRef.current.value = panel.address.state;
    }, [panel])
    const zipCodeInputRef = useRef();
    const addressLineInputRef = useRef();
    const aptInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();
    const [updateIndividualPanel, {isLoading, isSuccess, isError, error}] = useUpdateIndividualPanelMutation();
    const updatePanelHandler = async (e) => {
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
            firstName: enteredFirstName,
            middleName: enteredMiddleName,
            lastName: enteredLastName,
            email: enteredEmail,
            phoneNumber: enteredPhoneNumber,
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
        await updateIndividualPanel(data);
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
            <div className={"grid grid-cols-1 lg:grid-cols-3 mb-4 gap-4"}>
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
export default UpdateIndividualPanelInformation