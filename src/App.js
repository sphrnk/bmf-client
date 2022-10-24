import {useContext} from "react";
import "./App.css";
import "./css/font-awsome.min.css";
import Layout from "./components/Dashboard/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import IndexPage from "./pages/Dashboard/IndexPage";
import {Routes, Route, Navigate} from "react-router-dom";
import AuthContext from "./store/auth-context";

import SendRequestPage from "./pages/SendRequestPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    return (
        <>
            <Routes>
                {/*{!token && !user && (*/}
                <Route path={"/login"} element={<AuthPage/>}/>
                <Route path={"/reset-password"} element={<ResetPasswordPage/>}/>
                <Route path={"/send-request"} element={<SendRequestPage/>}/>
                {/*)}*/}
                {token && user && <Route path={"/dashboard"} element={<IndexPage/>}/>}
                <Route
                    path="*"
                    element={
                        token && user ? (
                            <Navigate replace to={"/dashboard"}/>
                        ) : (
                            <Navigate replace to={"/login"}/>
                        )
                    }
                />
            </Routes>
        </>
    );
}

export default App;
