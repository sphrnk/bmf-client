import LoginForm from "../../components/Forms/LoginForm";
import AuthLayout from "../../Layout/Auth/AuthLayout";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {Button, Link, TextField, Typography} from "@mui/material";
import {useContext, useEffect, useRef} from "react";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import Input from "../../components/Forms/UI/Input";
import Notif from "../../components/UI/Notif";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {login} from "../../lib/api/auth";
import {uiActions} from "../../store/ui-slice";
import {useDispatch, useSelector} from "react-redux";
import {setCredentials} from "../../store/auth/authSlice";
import {useLoginMutation} from "../../store/auth/authActions";


const LoginPage = () => {

    const {userInfo} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [login, {isLoading, isSuccess, isError, error}] = useLoginMutation()
    useEffect(() => {
        emailInputRef.current.focus();
    }, [])
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const data = await login({email: enteredEmail, password: enteredPassword}).unwrap()
        console.log(data);
        dispatch(setCredentials({...data}))
    }
    // localStorage.setItem('userToken', data.token) // deletes token from storage
    // localStorage.setItem('userInfo', JSON.stringify(data.user)) // deletes token from storage}
    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            if (!error.status) {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    message: 'No Server Response'
                }))
            } else if (error.status === 400) {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    message: 'Missing Email or Password'
                }))
            } else if (error.status === 401) {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    message: 'Unauthorized'
                }))
            } else {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    message: error
                }))
            }
        }
    }, [isError, error])

// useEffect(() => {
//     if (loginStatus === "completed" && loginData && !loginError) {
//         const {user, token} = loginData.data;
//         const remainingMilliseconds = 60 * 60 * 1000;
//         const expiryDate = new Date(
//             new Date().getTime() + remainingMilliseconds
//         );
//         authCtx.login(user, token, expiryDate);
//         navigate('/portals');
//     }
// })
    return (
        <>
            {/*<AuthLayout title={"Sign in"}>*/}
            <form
                onSubmit={onSubmitHandler}
                className="flex gap-6 flex-col w-full"
            >
                <TextField required variant="standard" inputRef={emailInputRef} label={"Email Address"}
                           inputMode={'email'} type={'email'}/>

                <TextField required variant="standard" inputRef={passwordInputRef} label={"Password"}
                           type={"password"}/>

                <div className="w-full flex gap-3">
                    <Typography component={'span'} variant={'body2'} className="text-gray-600">Forgot
                        password?</Typography>
                    <Link component={RouterLink} to={"/forgot-password"}>
                        Reset Password
                    </Link>
                </div>

                <Button
                    variant={'contained'}
                    type="submit"
                >
                    {isLoading &&
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    }
                    Log in
                </Button>
            </form>
            {/*</AuthLayout>*/}
        </>
    );
}
export default LoginPage;
