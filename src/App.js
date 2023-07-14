import {useContext} from "react";
import "./App.css";
import "./css/font-awsome.min.css";
import Layout from "./Layout/Dashboard/Layout";
import LoginPage from "./pages/Auth/LoginPage";
import IndexPage from "./pages/Dashboard/AdminSide/IndexPage";
import {Routes, Route, Navigate} from "react-router-dom";
import AuthContext from "./store/auth-context";

import SendRequestPage from "./pages/Auth/SendRequestPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import FilesPage from "./pages/Dashboard/AdminSide/FilesPage";
import ClientsPage from "./pages/Dashboard/AdminSide/Clients/ClientsPage";
import PanelsPage from "./pages/Dashboard/AdminSide/Panels/PanelsPage";
import AccountRequestsPage from "./pages/Dashboard/AdminSide/AccountRequestsPage";
import DataTablePage from "./pages/Dashboard/AdminSide/DataTablePage";
import ClientPage from "./pages/Dashboard/AdminSide/Clients/ClientPage";
import AccountRequestPage from "./pages/Dashboard/AdminSide/AccountRequestPage";
import AuthLayout from "./Layout/Auth/AuthLayout";
import CreateClientPage from "./pages/Dashboard/AdminSide/Clients/CreateClientPage";
import CreatePanelPage from "./pages/Dashboard/AdminSide/Panels/CreatePanelPage";
import IndividualPortalPage from "./pages/Dashboard/ClientSide/Portals/Individual/IndividualPortalPage";
import BusinessPortalPage from "./pages/Dashboard/ClientSide/Portals/Business/BusinessPortalPage";
import CompleteIndividualPortalPage from "./pages/Dashboard/ClientSide/Portals/Individual/CompleteIndividualPortalPage";
import CompleteBusinessPortalPage from "./pages/Dashboard/ClientSide/Portals/Business/CompleteBusinessPortalPage";
import UploadFilesPage from "./pages/Dashboard/AdminSide/UploadFilesPage";
import TempPasswordPage from "./pages/Dashboard/AdminSide/TempPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/Dashboard/AdminSide/ProfilePage";

function App() {
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;

    const isIndividualPortalNotCompleted = token && user && user.individualPortalCount > user.individualPortals.length;
    const isBusinessPortalNotCompleted = token && user && user.businessPortalCount > user.businessPortals.length;
    console.log(isIndividualPortalNotCompleted)
    console.log(isBusinessPortalNotCompleted)
    return (
        <>
            {!token && !user &&
                <AuthLayout>
                    <Routes>
                        <Route path={"/404"} element={<NotFoundPage/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/forgot-password"} element={<ForgotPasswordPage/>}/>
                        <Route path={"/resetPassword/:token"} element={<ResetPasswordPage/>}/>
                        <Route path={"/send-request"} element={<SendRequestPage/>}/>
                        <Route
                            path="*"
                            element={
                                <Navigate replace to={"/login"}/>
                            }
                        />
                    </Routes>
                </AuthLayout>
            }
            {token && user &&
                <Layout>
                    <Routes>
                        {isBusinessPortalNotCompleted && !isIndividualPortalNotCompleted &&
                            <>
                                <Route path={"/complete-business-portal"} element={<CompleteBusinessPortalPage/>}/>
                                <Route
                                    path="/"
                                    element={
                                        <Navigate replace to={"/complete-business-portal"}/>
                                    }
                                />
                            </>
                        }
                        {!isBusinessPortalNotCompleted && isIndividualPortalNotCompleted &&
                            <>
                                <Route path={"/complete-individual-portal"} element={<CompleteIndividualPortalPage/>}/>
                                <Route
                                    path="/"
                                    element={
                                        <Navigate replace to={"/complete-individual-portal"}/>
                                    }
                                />
                            </>
                        }
                        {(isBusinessPortalNotCompleted && isIndividualPortalNotCompleted) &&
                            <>
                                <Route path={"/complete-individual-portal"}
                                       element={<CompleteIndividualPortalPage/>}/>
                                <Route path={"/complete-business-portal"} element={<CompleteBusinessPortalPage/>}/>
                                <Route
                                    path="/"
                                    element={
                                        <Navigate replace to={"/complete-individual-portal"}/>
                                    }
                                />
                            </>
                        }
                        {!isIndividualPortalNotCompleted && !isBusinessPortalNotCompleted &&
                            <>
                                <Route path={"/dashboard"} element={<IndexPage/>}/>
                                <Route path={"/portals"} element={<FilesPage/>}/>
                                <Route path={"/portals/upload"} element={<UploadFilesPage/>}/>
                                <Route path={"/profile"} element={<ProfilePage/>}/>
                                {/*<Route path={"/portals"} element={<PanelsPage/>}/>*/}
                                {/*<Route path={"/portals/add"} element={<CreatePanelPage/>}/>*/}
                                {user.role === "admin" &&
                                    <>
                                        <Route path={"/clients"} element={<ClientsPage/>}/>
                                        <Route path={"/clients/add"} element={<CreateClientPage/>}/>
                                        <Route path={"/clients/:clientId"} element={<ClientPage/>}/>
                                        <Route path={"/account-requests"} element={<AccountRequestsPage/>}/>
                                        <Route path={"/account-requests/:requestId"}
                                               element={<AccountRequestPage/>}/>
                                    </>
                                }
                                <Route
                                    path="/"
                                    element={
                                        <Navigate replace to={"/dashboard"}/>
                                    }
                                />
                            </>}
                        <Route path={"/404"} element={<NotFoundPage/>}/>
                        <Route
                            path="*"
                            element={
                                <Navigate replace to={"/404"}/>
                            }
                        />
                    </Routes>
                </Layout>
            }
        </>
    );
}

export default App;
