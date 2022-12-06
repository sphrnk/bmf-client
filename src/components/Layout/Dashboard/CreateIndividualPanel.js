import useHttp from "../../../hooks/use-http";
import React, {useRef, useContext, useState} from "react";
import {createPanel} from "../../../lib/api/panels";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Notif from "../../UI/Notif";
import AuthContext from "../../../store/auth-context";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import {Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField} from "@mui/material";
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


const CreateIndividualPanel = (props) => {
    // const {sendRequest, status, data, error} = useHttp(createPanel);
    const {
        sendRequest: sendZipCodeRequest,
        status: zipCodeStatus,
        data: zipCodeData,
        error: zipCodeErr
    } = useHttp(validateZipCode);
    const [page, setPage] = useState(1);
    const [formattedInputValues, setFormattedInputValues] = useState({
        phoneNumber: '',
    })
    let reqStatus;
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const firstNameInputRef = useRef();
    const middleNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const zipCodeInputRef = useRef();
    const addressLineInputRef = useRef();
    const aptInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();

    const formattedInputChangeHandler = (event) => {
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });
    };

    const zipCodeHandler = async () => {
        if (page === 2) {
            console.log(zipCodeInputRef);
            const enteredZipCode = zipCodeInputRef.current.value;
            // console.log(enteredZipCode);
            if (enteredZipCode.length === 5) {
                await sendZipCodeRequest({enteredZipCode});
            }
        }
    }
    if (zipCodeStatus === "completed" && zipCodeData && !zipCodeErr) {
        cityInputRef.current.value = zipCodeData.data.code[0];
        stateInputRef.current.value = zipCodeData.data.code[1];
    }

    const createPanelSubmitHandler = async (el) => {
        el.preventDefault();
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
        props.onCreatePanel({
            firstName: enteredFirstName,
            middleName: enteredMiddleName,
            lastName: enteredLastName,
            email: enteredEmail,
            phoneNumber: enteredPhoneNumber,
            address: {
                addressLine: enteredAddressLine,
                apt: enteredApt,
                city: enteredCity,
                state: enteredState,
                zipCode: enteredZipCode
            },
            panelType: 'business',
        });
    };
    // console.log(data, error);
    // if (status === "pending") {
    //     reqStatus = <LoadingSpinner/>
    // }
    // if (data) {
    //     // console.log(data);
    //     reqStatus = <Notif status={"success"}
    //                        text={"Account Created Successfully, if the email is correct user will get his information!"}/>
    // }
    // if (status === "completed" && error) {
    //     reqStatus = <Notif status={"failed"} text={error}/>
    // }
    return (
        <form
            onSubmit={createPanelSubmitHandler}
            action="client/src/components/Layout/Dashboard/CreateIndividualPanel#"
            className="flex gap-6 flex-col w-full"
        >
            <div className={page === 1 ? "grid grid-cols-1 lg:grid-cols-3 gap-4" : 'hidden'}>
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
            <div
                className={page === 1 ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : 'hidden'}>
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
            <div
                className={page === 2 ? "grid grid-cols-1 lg:grid-cols-3 gap-4" : 'hidden'}>
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
            <div
                className={page === 2 ? "grid grid-cols-1 lg:grid-cols-12 gap-4" : 'hidden'}>
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
                    required
                    className={"col-span-4"}
                    inputRef={aptInputRef}
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-building"></i></InputAdornment>,
                    }}
                />
            </div>
            <div
                className={page === 2 ? "grid grid-cols-1 gap-4" : 'hidden'}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="USA Citizen"/>
                </FormGroup>
            </div>

            {page === 1 && <div className="flex justify-end gap-3">
                <Button
                    variant='text'
                    onClick={props.onConfirm}
                    type="button"
                    // disabled={status === 'pending'}
                >
                    Cancel
                </Button>

                <Button
                    variant='contained'
                    type="button"
                    onClick={() => {
                        setPage(2)
                    }}
                >
                    Next
                </Button>
            </div>}
            {page === 2 && <div className="flex justify-end gap-3">
                <Button
                    variant='text'
                    onClick={() => {
                        setPage(1)
                    }}
                    type="button"
                    // disabled={status === 'pending'}
                >
                    Previous
                </Button>

                <Button
                    variant='contained'
                    onClick={props.createPanel}
                    type="submit"
                    // disabled={status === 'pending'}
                >
                    Create Panel
                </Button>
            </div>}
        </form>);
};
export default CreateIndividualPanel;