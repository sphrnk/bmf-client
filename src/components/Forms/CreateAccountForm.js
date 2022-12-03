import useHttp from "../../hooks/use-http";
import {useRef, useContext} from "react";
import {createUser} from "../../lib/api/users";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notif from "../UI/Notif";
import AuthContext from "../../store/auth-context";

const CreateAccountForm = (props) => {
    const {sendRequest, status, data, error} = useHttp(createUser);
    let reqStatus;
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const firstNameInputRef = useRef();
    const middleNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const phoneNumberInputRef = useRef();
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
        <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-3">
                <label htmlFor="first-name">First Name</label>
                <input
                    id="first-name"
                    name="first-name"
                    className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                    type="text"
                    placeholder=""
                    ref={firstNameInputRef}
                    required
                />
                {/*<small className="text-red-600">*some error*</small>*/}
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="middle-name">Middle Name</label>
                <input
                    id="middle-name"
                    name="middle-name"
                    className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                    type="text"
                    placeholder=""
                    ref={middleNameInputRef}
                />
                {/*<small className="text-red-600">*some error*</small>*/}
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="last-name">Last Name</label>
                <input
                    id="last-name"
                    name="last-name"
                    className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                    type="text"
                    placeholder=""
                    ref={lastNameInputRef}
                    required
                />
                {/*<small className="text-red-600">*some error*</small>*/}
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                    type="text"
                    placeholder=""
                    ref={emailInputRef}
                    required
                />
                {/*<small className="text-red-600">*some error*</small>*/}
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    name="phone"
                    className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                    type="text"
                    placeholder=""
                    ref={phoneNumberInputRef}
                    required
                />
                {/*<small className="text-red-600">*some error*</small>*/}
            </div>
        </div>
        {reqStatus}
        <div className="flex justify-end gap-3">
            <button
                onClick={props.onConfirm}
                type="button"
                className="rounded border-primary border px-2.5 py-1.5 "
                disabled={status === 'pending'}
            >
                Cancel
            </button>

            <button
                type="submit"
                className="rounded bg-primary px-2.5 py-1.5 text-white disabled:bg-primary-light"
                disabled={status === 'pending'}
            >
                Create Account
            </button>
        </div>
    </form>);
};
export default CreateAccountForm;