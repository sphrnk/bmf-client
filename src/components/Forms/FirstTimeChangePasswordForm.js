import useHttp from "../../hooks/use-http";
import {useRef, useContext} from "react";
import {updatePassword} from "../../lib/api/auth";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notif from "../UI/Notif";
import AuthContext from "../../store/auth-context";
import {Button, TextField} from "@mui/material";

const FirstTimeChangePasswordForm = (props) => {
    const {sendRequest, status, data, error} = useHttp(updatePassword);
    let reqStatus;
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const passwordInputRef = useRef();
    // const confirmPasswordInputRef = useRef();
    const changePasswordHandler = async (el) => {
        el.preventDefault();
        const enteredPassword = passwordInputRef.current.value;
        // const enteredConfirmPassword = confirmPasswordInputRef.current.value;
        // if (enteredPassword === enteredConfirmPassword) {
        await sendRequest({
            password: enteredPassword,
            token,
        });
        // }else{
        //     reqStatus = <Notif status={"fail"} text={"passwords are not the same"}/>
        // }
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
                {/*<TextField*/}
                {/*    label="Confirm Password"*/}
                {/*    required*/}
                {/*    // inputRef={firstNameInputRef}*/}
                {/*    name={'confirm-password'}*/}
                {/*    type={"password"}*/}
                {/*    inputRef={confirmPasswordInputRef}*/}
                {/*/>*/}
                {/*<small className="text-red-600">*some error*</small>*/}
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