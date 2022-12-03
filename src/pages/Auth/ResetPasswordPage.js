import ResetPasswordForm from "../../components/Forms/ResetPasswordForm";
import AuthLayout from "../../components/Layout/Auth/AuthLayout";
import Input from "../../components/Forms/UI/Input";
import {useRef} from "react";
import useHttp from "../../hooks/use-http";
import {resetPassword} from "../../lib/api/auth";
import {useParams} from "react-router-dom";
import Notif from "../../components/UI/Notif";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const ResetPasswordPage = () => {
    const passwordInputRef = useRef();
    const {sendRequest, status, data, error} = useHttp(resetPassword);
    const {token} = useParams();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const enteredPassword = passwordInputRef.current.value;
        await sendRequest({password: enteredPassword, params: token})
    };
    return (
        <>
            <AuthLayout title={"Reset Password"}>
                <form
                    onSubmit={onSubmitHandler}
                    className="flex gap-6 flex-col w-full"
                >
                    <Input ref={passwordInputRef} input={{
                        id: "password",
                        name: "password",
                        className: "border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none",
                        type: "password",
                    }} label={"New Password"} required={true}/>

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
                            Reset Password
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
export default ResetPasswordPage;
