import useHttp from "../../hooks/use-http";
import {useRef, useContext} from "react";
import {updatePassword} from "../../lib/api/auth";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notif from "../UI/Notif";
import AuthContext from "../../store/auth-context";

const FirstTimeChangePasswordForm = (props) => {
    const {sendRequest, status, data, error} = useHttp(updatePassword);
    let reqStatus;
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const passwordInputRef = useRef();
    const changePasswordHandler = async (el) => {
        el.preventDefault();
        const enteredPassword = passwordInputRef.current.value;
        await sendRequest({
            password: enteredPassword,
            token,
        });
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
        reqStatus = <Notif status={"failed"} text={error}/>
    }
    return (<form
        onSubmit={changePasswordHandler}
        action="client/src/components/Layout/Dashboard/Layout#"
        className="flex gap-6 flex-col w-full"
    >
        <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-3">
                <label htmlFor="email">New Password</label>
                <input
                    id="password"
                    name="password"
                    className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                    type="password"
                    placeholder=""
                    ref={passwordInputRef}
                    required
                />
                {/*<small className="text-red-600">*some error*</small>*/}
            </div>
        </div>
        {reqStatus}
        <div className="flex sm:justify-end">
            <button
                type="submit"
                className="rounded bg-primary px-2.5 py-1.5 text-white disabled:bg-primary-light"
                disabled={status === 'pending'}
            >
                Change Password
            </button>
        </div>
    </form>);
};
export default FirstTimeChangePasswordForm;