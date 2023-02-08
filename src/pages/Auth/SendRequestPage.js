import AuthLayout from "../../Layout/Auth/AuthLayout";
import Notif from "../../components/UI/Notif";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {useRef} from "react";
import useHttp from "../../hooks/use-http";
import {createAccountRequest} from "../../lib/api/accountRequests";
import Input from "../../components/Forms/UI/Input";
import Layout from "../../Layout/Dashboard/Layout";
import {TextField} from "@mui/material";
import {uiActions} from "../../store/ui-slice";
import {useDispatch} from "react-redux";

const SendRequestPage = () => {
    const dispatch = useDispatch();
    const firstNameInputRef = useRef();
    const middleNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const phoneNumberInputRef = useRef();
    const reasonInputRef = useRef();
    const {sendRequest, status, data, error} = useHttp(createAccountRequest);
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredMiddleName = middleNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPhoneNumber = phoneNumberInputRef.current.value;
        const enteredReason = reasonInputRef.current.value;
        await sendRequest({
            firstName: enteredFirstName,
            middleName: enteredMiddleName,
            lastName: enteredLastName,
            email: enteredEmail,
            phoneNumber: enteredPhoneNumber,
            reason: enteredReason,
        });
    };
    if (status === "completed" && error) {
        dispatch(uiActions.showNotification({
            status: 'error',
            message: error
        }))
    }
    if (status === "completed" && !error && data) {
        dispatch(uiActions.showNotification({
            status: 'success',
            message: "You Request Submitted Successfully, Please wait for reviewing your request and acceptation"
        }))
    }
    return (
        <>
            {/*<AuthLayout title={"Send Create Account Request"}>*/}
            <h1 className="uppercase text-center text-2xl font-semibold text-primary mb-4">
                Send Create Account Request
            </h1>
            <form
                onSubmit={onSubmitHandler}
                className="flex gap-6 flex-col w-full"
            >
                <TextField required variant="standard" inputRef={firstNameInputRef} label={"First Name"}
                           inputMode={'text'} type={'text'}/>
                {/*<Input ref={firstNameInputRef} input={{*/}
                {/*    id: "first-name",*/}
                {/*    name: "first-name",*/}
                {/*    className: "border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none",*/}
                {/*    type: "text",*/}
                {/*}} label={"First Name"} required={true}/>*/}

                <TextField variant="standard" inputRef={middleNameInputRef} label={"Middle Name"}
                           inputMode={'text'} type={'text'}/>
                {/*<Input ref={middleNameInputRef} input={{*/}
                {/*    id: "middle-name",*/}
                {/*    name: "middle-name",*/}
                {/*    className: "border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none",*/}
                {/*    type: "text",*/}
                {/*}} label={"Middle Name"} required={false}/>*/}


                <TextField required variant="standard" inputRef={lastNameInputRef} label={"Last Name"}
                           inputMode={'text'} type={'text'}/>
                {/*<Input ref={lastNameInputRef} input={{*/}
                {/*    id: "last-name",*/}
                {/*    name: "last-name",*/}
                {/*    className: "border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none",*/}
                {/*    type: "text",*/}
                {/*}} label={"Last Name"} required={true}/>*/}


                <TextField required variant="standard" inputRef={emailInputRef} label={"Email Address"}
                           inputMode={'email'} type={'email'}/>
                {/*<Input ref={emailInputRef} input={{*/}
                {/*    id: "email",*/}
                {/*    name: "email",*/}
                {/*    className: "border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none",*/}
                {/*    type: "email",*/}
                {/*}} label={"Email"} required={true}/>*/}

                <TextField required variant="standard" inputRef={phoneNumberInputRef} label={"Phone Number"}
                           type={"tel"} inputMode={"tel"}/>
                {/*<Input ref={phoneNumberInputRef} input={{*/}
                {/*    id: "phone-number",*/}
                {/*    name: "phone-number",*/}
                {/*    className: "border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none",*/}
                {/*    type: "text",*/}
                {/*    placeHolder: '+1 123 4567890'*/}
                {/*}} label={"Phone Number"} required={true}/>*/}

                <TextField multiline rows={5} variant="standard" inputRef={reasonInputRef} label={"Reason"}
                           inputMode={'text'} type={'text'}/>
                {/*<div className="flex flex-col gap-3">*/}
                {/*    <label htmlFor="reason" className="text-primary">*/}
                {/*        Reason*/}
                {/*    </label>*/}
                {/*    <textarea*/}
                {/*        id="reason"*/}
                {/*        name="reason"*/}
                {/*        className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"*/}
                {/*        ref={reasonInputRef}*/}
                {/*        rows={4}*/}
                {/*    />*/}
                {/*    /!*<small className="text-red-600">*some error*</small>*!/*/}
                {/*</div>*/}
                {/*{*/}
                {/*    status === "completed" && error && (*/}
                {/*        <Notif status={"fail"} text={error}/>*/}
                {/*    )*/}
                {/*}*/}
                {/*{*/}
                {/*    status === "completed" && data && (*/}
                {/*        <Notif status={"success"}*/}
                {/*               text={"You Request Submitted Successfully, Please wait for reviewing your request and acceptation"}/>)*/}
                {/*}*/}
                {(status === "completed" || !status) && (
                    <button
                        type="submit"
                        id="submit-form"
                        name="submit"
                        className="rounded bg-primary px-2.5 py-1.5 text-white"
                    >
                        Send Request
                    </button>
                )}
                {status === "pending" && (
                    <LoadingSpinner/>
                )}
            </form>
            {/*</AuthLayout>*/}
        </>
    );
};
export default SendRequestPage;
