import useHttp from "../../hooks/use-http";
import {useRef, useContext} from "react";
import {updateTempPassword} from "../../lib/api/auth";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notif from "../UI/Notif";
import AuthContext from "../../store/auth-context";
import {Button, TextField} from "@mui/material";
import {setCredentials} from "../../store/auth/authSlice";
import {useDispatch} from "react-redux";

const FirstTimeChangePasswordForm = (props) => {
    const {sendRequest, status, data, error} = useHttp(updateTempPassword);
    const dispatch = useDispatch();
    let reqStatus;
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const changePasswordHandler = async (el) => {
        el.preventDefault();
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;
        if (enteredPassword === enteredConfirmPassword) {
            console.log(enteredPassword);
            await sendRequest({
                password: enteredPassword,
                token,
            });
        } else {
            reqStatus = <Notif status={"fail"} text={"passwords are not the same"}/>
        }
    };
    if (status === "pending") {
        reqStatus = <LoadingSpinner/>
    }
    if (status === "completed" && data) {
        const {user, token: secondToken} = data.data;
        // console.log(user);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
        );
        dispatch(setCredentials({...data}))
        authCtx.login(user, secondToken, expiryDate);
        props.onConfirm();
    }
    if (status === "completed" && error) {
        console.log(error);
        reqStatus = <Notif status={"fail"} text={error}/>
    }
    return (<form
        onSubmit={changePasswordHandler}
        action="client/src/Layout/Dashboard/Layout#"
        className="flex gap-6 flex-col w-full"
    >
        <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-3">

                <TextField
                    label="New Password"
                    required
                    // inputRef={firstNameInputRef}
                    name={'password'}
                    type={"password"}
                    inputRef={passwordInputRef}
                />
                <TextField
                    label="Confirm Password"
                    required
                    // inputRef={firstNameInputRef}
                    name={'confirm-password'}
                    type={"password"}
                    inputRef={confirmPasswordInputRef}
                />
            </div>
        </div>
        {reqStatus}
        <div className="flex sm:justify-end">
            <Button
                variant={'contained'}
                type="submit"
                disabled={status === 'pending'}
            >
                Change Password
            </Button>
        </div>
    </form>);
};
export default FirstTimeChangePasswordForm;