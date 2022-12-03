import AuthLayout from "../../components/Layout/Auth/AuthLayout";
import useHttp from "../../hooks/use-http";
import {Link} from "react-router-dom";
import Input from "../../components/Forms/UI/Input";
import Notif from "../../components/UI/Notif";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {useRef} from "react";
import {forgotPassword} from "../../lib/api/auth";

const ForgotPasswordPage = () => {
    const {sendRequest, status, data, error} = useHttp(forgotPassword);
    const emailInputRef = useRef();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        await sendRequest({email: enteredEmail})
    };
    return (
        <>
            <AuthLayout title={"Forgot Password"}>
                <form
                    onSubmit={onSubmitHandler}
                    className="flex gap-6 flex-col w-full"
                >
                    <Input ref={emailInputRef} label={"Email Address"} required={true} input={{
                        id: "email",
                        name: "email",
                        className: "border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none",
                        type: "text",
                    }}/>
                    {
                        status === "completed" && error && (
                            <Notif status={"fail"} text={error}/>
                        )
                    }

                    {(status === "completed" || !status) && (
                        <button
                            type="submit"
                            id="submit-form"
                            name="submit"
                            className="rounded bg-primary px-2.5 py-1.5 text-white"
                        >
                            Send Email
                        </button>
                    )}
                    {status === "pending" && (
                        <LoadingSpinner/>
                    )}
                </form>
            </AuthLayout>
        </>
    );
};
export default ForgotPasswordPage;
