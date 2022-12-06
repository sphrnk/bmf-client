import useHttp from "../../hooks/use-http";
import React,{useState,useRef, useContext} from "react";
import {createUser} from "../../lib/api/users";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notif from "../UI/Notif";
import AuthContext from "../../store/auth-context";
import {Button, InputAdornment, TextField} from "@mui/material";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";

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


const CreateAccountForm = (props) => {
    const {sendRequest, status, data, error} = useHttp(createUser);
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
    const phoneNumberInputRef = useRef();
    const formattedInputChangeHandler = (event) => {
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });
    };
    const createAccountSubmitHandler = async (el) => {
        el.preventDefault();
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredMiddleName = middleNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPhoneNumber = phoneNumberInputRef.current.value;
        await sendRequest({
            firstName: enteredFirstName,
            middleName: enteredMiddleName,
            lastName: enteredLastName,
            email: enteredEmail,
            phoneNumber: enteredPhoneNumber,
            token,
        });
    };
    // console.log(data, error);
    if (status === "pending") {
        reqStatus = <LoadingSpinner/>
    }
    if (data) {
        // console.log(data);
        reqStatus = <Notif status={"success"}
                           text={"Account Created Successfully, if the email is correct user will get his information!"}/>
    }
    if (status === "completed" && error) {
        reqStatus = <Notif status={"failed"} text={error}/>
    }
    return (<form
        onSubmit={createAccountSubmitHandler}
        action="client/src/components/Layout/Dashboard/Layout#"
        className="flex gap-6 flex-col w-full"
    >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
            className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
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
        {reqStatus}
        <div className="flex justify-end gap-3">
            <Button
                variant='text'
                type="button"
                onClick={props.onConfirm}
                disabled={status === 'pending'}
            >
                Cancel
            </Button>

            <Button
                variant='contained'
                type="submit"
                // disabled={status === 'pending'}
                disabled={status === 'pending'}
            >
                Create Account
            </Button>
        </div>
    </form>);
};
export default CreateAccountForm;