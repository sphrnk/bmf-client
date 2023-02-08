import ResetPasswordForm from "../../components/Forms/ResetPasswordForm";
import AuthLayout from "../../Layout/Auth/AuthLayout";
import Input from "../../components/Forms/UI/Input";
import {useRef} from "react";
import useHttp from "../../hooks/use-http";
import {resetPassword} from "../../lib/api/auth";
import {useParams} from "react-router-dom";
import Notif from "../../components/UI/Notif";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {TextField} from "@mui/material";
import {uiActions} from "../../store/ui-slice";
import {useDispatch} from "react-redux";

const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const passwordInputRef = useRef();
    const {sendRequest, status, data, error} = useHttp(resetPassword);
    const {token} = useParams();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const enteredPassword = passwordInputRef.current.value;
        await sendRequest({password: enteredPassword, params: token})
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
            message: "Your password changed successfully"
        }))
    }
    return (
        <>
            {/*<AuthLayout title={"Reset Password"}>*/}
            <h1 className="uppercase text-center text-2xl font-semibold text-primary mb-4">
                Reset Password
            </h1>
                <form
                    onSubmit={onSubmitHandler}
                    className="flex gap-6 flex-col w-full"
                >
                    <TextField required variant="standard" inputRef={passwordInputRef} label={"New Password"}
                               type={"password"}/>
                    {/*<Input ref={passwordInputRef} input={{*/}
                    {/*    id: "password",*/}
                    {/*    name: "password",*/}
                    {/*    className: "border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none",*/}
                    {/*    type: "password",*/}
                    {/*}} label={"New Password"} required={true}/>*/}

                    {
                        status === "completed" && error && (
                            <Notif status={"fail"} text={error}/>
                        )
                    }
                    {
                        status === "completed" && data && (
                            <Notif status={"success"} text={"Password Changed Successfully"}/>
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
            {/*</AuthLayout>*/}
        </>
    );
};
export default ResetPasswordPage;
