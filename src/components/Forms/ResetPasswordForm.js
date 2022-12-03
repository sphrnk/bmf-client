import {useContext, useRef, useState} from "react";
import {resetPassword} from "../../lib/api/auth";
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../store/auth-context";
import {Link} from "react-router-dom";
import useHttp from "../../hooks/use-http";

const ResetPasswordForm = () => {
    const passwordInputRef = useRef();
    const {sendRequest, status, data, error} = useHttp(resetPassword);
    const {token} = useParams();
    console.log(token);
    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredPassword = passwordInputRef.current.value;
        await sendRequest({password: enteredPassword, params: token})
    };

    return (
        <>
            <h1 className="uppercase text-center text-2xl font-semibold text-primary mb-4">
                Reset Password
            </h1>
            <div className="flex w-full flex-col items-center gap-4 justify-center">
                <div
                    className="w-full lg:w-5/12 sm:w-7/12 flex flex-col px-8 py-5 sm:border-2 rounded-none sm:rounded-xl items-center gap-6 bg-white ">
                    <form
                        onSubmit={submitHandler}
                        className="flex gap-6 flex-col w-full"
                    >
                        <div className="flex flex-col gap-3">
                            <label htmlFor="password" className="text-primary">
                                New Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                                type="password"
                                ref={passwordInputRef}
                                required
                            />
                            {/*<small className="text-red-600">*some error*</small>*/}
                        </div>

                        {/*{!isLoading && (*/}
                        <button
                            type="submit"
                            id="submit-form"
                            name="submit"
                            className="rounded bg-primary px-2.5 py-1.5 text-white"
                        >
                            Reset Password
                        </button>
                        {/*)}*/}
                        {/*{isLoading && (*/}
                        {/*<button*/}
                        {/*    type="submit"*/}
                        {/*        id="submit-form"*/}
                        {/*        name="submit"*/}
                        {/*        className="rounded bg-primary px-2.5 py-1.5 text-white"*/}
                        {/*    >*/}
                        {/*        Loading...*/}
                        {/*    </button>*/}
                        {/*)}*/}
                    </form>
                    {/*<div className="w-full flex gap-3">*/}
                    {/*    <span className="text-gray-600">Forgot password?</span>*/}
                    {/*    <a href="client/src/components/Forms/AuthForm" className="text-primary underline">*/}
                    {/*        Reset Password*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                </div>
                {/*<div className="flex w-full lg:w-5/12 sm:w-7/12 text-center gap-2 text-primary px-8 flex-col">*/}
                {/*    <span className="uppercase">New to BMF?</span>*/}
                {/*    <Link*/}
                {/*        to="/send-request"*/}
                {/*        className="rounded-full text-primary border-primary-light border px-2.5 py-1 transition hover:bg-primary hover:text-white"*/}
                {/*    >*/}
                {/*        Send a request*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </div>
        </>
    );
};

export default ResetPasswordForm;
