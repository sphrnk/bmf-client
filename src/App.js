import {useContext} from "react";
import "./App.css";
import "./css/font-awsome.min.css";
import Layout from "./components/Layout/Dashboard/Layout";
import LoginPage from "./pages/Auth/LoginPage";
import IndexPage from "./pages/Dashboard/IndexPage";
import {Routes, Route, Navigate} from "react-router-dom";
import AuthContext from "./store/auth-context";

import SendRequestPage from "./pages/Auth/SendRequestPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import FilesPage from "./pages/Dashboard/FilesPage";
import ClientsPage from "./pages/Dashboard/ClientsPage";
import PanelsPage from "./pages/Dashboard/PanelsPage";
import AccountsRequest from "./pages/Dashboard/AccountRequestsPage";
import AccountRequestsPage from "./pages/Dashboard/AccountRequestsPage";
import DataTablePage from "./pages/Dashboard/DataTablePage";
import ClientPage from "./pages/Dashboard/ClientPage";

function App() {
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    return (
        <div className={"bg-gray-50 min-h-full"}>
            <Routes>
                {/*{!token && !user && (*/}
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/forgot-password"} element={<ForgotPasswordPage/>}/>
                <Route path={"/reset-password/:token"} element={<ResetPasswordPage/>}/>
                <Route path={"/send-request"} element={<SendRequestPage/>}/>
                {/*)}*/}
                {token && user &&
                    (
                        <Route path={"/dashboard"} element={<IndexPage/>}/>
                    )}
                {token && user &&
                    (
                        <Route path={"/data-table"} element={<DataTablePage/>}/>
                    )}
                {token && user &&
                    (
                        <Route path={"/files"} element={<FilesPage/>}/>

                    )}
                {token && user &&
                    (
                        <Route path={"/panels"} element={<PanelsPage/>}/>

                    )}
                {token && user &&
                    (
                        <Route path={"/clients"} element={<ClientsPage/>}/>

                    )}
                {token && user &&
                    (
                        <Route path={"/clients/:clientId"} element={<ClientPage/>}/>

                    )}
                {token && user &&
                    (
                        <Route path={"/account-requests"} element={<AccountRequestsPage/>}/>

                    )}
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
        </div>
    );
}

export default App;
