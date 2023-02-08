import {useContext, useEffect, useState} from "react";
import AuthHeader from "./AuthHeader";
import {useSelector} from "react-redux";
import AuthContext from "../../store/auth-context"
import {Link, useLocation} from "react-router-dom";
import Notif from "../../components/UI/Notif";


const AuthLayout = (props) => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState();
    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);
    return (
        <>
            <AuthHeader/>
            <main>
                <div className="container mx-auto px-4">
                    <div className="py-12 flex flex-col gap-3">
                        {/*<h1 className="uppercase text-center text-2xl font-semibold text-primary mb-4">*/}
                        {/*    {props.title}*/}
                        {/*</h1>*/}
                        <div className="flex w-full flex-col items-center gap-4 justify-center">
                            <div
                                className="w-full lg:w-5/12 sm:w-7/12 flex flex-col px-8 py-5 sm:border-2 rounded-none sm:rounded-xl items-center gap-4 bg-white">
                                {props.children}
                            </div>
                        </div>
                        {(currentPath === "/login" || currentPath === "/forgot-password") && (
                            <div
                                className="flex w-full lg:w-5/12 sm:w-7/12 text-center gap-2 text-primary px-8 mx-auto flex-col">
                                <span className="uppercase">New to BMF?</span>
                                <Link
                                    to="/send-request"
                                    className="rounded-full text-primary border-primary-light border px-2.5 py-1 transition hover:bg-primary hover:text-white"
                                >
                                    Send a request
                                </Link>
                            </div>
                        )}
                        {currentPath === "/send-request" && (
                            <div
                                className="flex mx-auto w-full lg:w-5/12 sm:w-7/12 text-center gap-2 text-primary px-8 flex-col">
                                <span className="uppercase">Have account?</span>
                                <Link
                                    to="/login"
                                    className="rounded-full text-primary border-primary-light border px-2.5 py-1 transition hover:bg-primary hover:text-white"
                                >
                                    Login to Panel
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <Notif/>
            </main>
        </>
    );
};

export default AuthLayout;
