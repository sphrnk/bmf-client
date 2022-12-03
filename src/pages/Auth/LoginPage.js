import LoginForm from "../../components/Forms/LoginForm";
import AuthLayout from "../../components/Layout/Auth/AuthLayout";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useRef} from "react";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import Input from "../../components/Forms/UI/Input";
import Notif from "../../components/UI/Notif";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {login} from "../../lib/api/auth";

const LoginPage = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const {sendRequest: loginRequest, status: loginStatus, data: loginData, error: loginError} = useHttp(login);
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        await loginRequest({enteredEmail, enteredPassword})
    }
    if (loginStatus === "completed" && loginData && !loginError) {
        const {user, token} = loginData.data;
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
        );
        authCtx.login(user, token, expiryDate);
        navigate('/dashboard');
    }
    return (
        <>
            <AuthLayout title={"Sign in"}>
                <form
                    onSubmit={onSubmitHandler}
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

                    <div className="w-full flex gap-3">
                        <span className="text-gray-600">Forgot password?</span>
                        <Link to={"/forgot-password"} className="text-primary underline">
                            Reset Password
                        </Link>
                    </div>

                    {
                        loginStatus === "completed" && loginError && (
                            <Notif status={"fail"} text={loginError}/>
                        )
                    }

                    {(loginStatus === "completed" || !loginStatus) && (
                        <button
                            type="submit"
                            id="submit-form"
                            name="submit"
                            className="rounded bg-primary px-2.5 py-1.5 text-white"
                        >
                            Log in
                        </button>
                    )}
                    {loginStatus === "pending" && (
                        <LoadingSpinner/>
                    )}
                </form>
            </AuthLayout>
        </>
    );
};
export default LoginPage;
