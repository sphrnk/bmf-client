import {useRef} from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notif from "../UI/Notif";
import Input from "./UI/Input";

const LoginForm = (props) => {
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        props.submit(enteredEmail, enteredPassword)
    };
    return (
        <>
            <form
                onSubmit={submitHandler}
                className="flex gap-6 flex-col w-full"
            >
                <Input ref={emailInputRef} label={"Email Address"} input={{
                    id: "email",
                    name: "email",
                    className: "border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none",
                    type: "text",
                }} required={true}/>
                <Input ref={passwordInputRef} label={"Password"} input={{
                    id: "password",
                    name: "password",
                    className: "border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none",
                    type: "password",
                }} required={true}/>
                {
                    props.status === "completed" && props.error && (
                        <Notif status={"fail"} text={props.error}/>
                    )
                }

                {(props.status === "completed" || !props.status) && (
                    <button
                        type="submit"
                        id="submit-form"
                        name="submit"
                        className="rounded bg-primary px-2.5 py-1.5 text-white"
                    >
                        Log in
                    </button>
                )}
                {props.status === "pending" && (
                    <LoadingSpinner/>
                )}
            </form>
        </>
    );
};

export default LoginForm;
