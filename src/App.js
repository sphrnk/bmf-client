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
import ProtectedRoute from "./components/ProtectedRoute";
import {useSelector} from "react-redux";
import PersistLogin from "./store/auth/PersistLogin";
import Prefetch from "./store/auth/Prefetch";
import RequireAuth from "./store/auth/RequireAuth";
import {ROLES} from './config/roles'

function App() {
    const {userInfo, userToken: token} = useSelector((state) => state.auth)
    console.log(userInfo)
    const isIndividualPortalNotCompleted = token && userInfo && userInfo.individualPortalCount > userInfo.individualPortals.length;
    const isBusinessPortalNotCompleted = token && userInfo && userInfo.businessPortalCount > userInfo.businessPortals.length;
    console.log(isIndividualPortalNotCompleted)
    console.log(isBusinessPortalNotCompleted)
    return (
        <>
            {!userInfo ?
                <AuthLayout>
                    <Routes>
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
                        {/*<Route path={"/404"} element={<NotFoundPage/>}/>*/}
                    </Routes>
                </AuthLayout>
                :
                <Layout>
                    <Routes>
                        {isBusinessPortalNotCompleted && !isIndividualPortalNotCompleted &&
                            <>
                                <Route path={"/complete-business-file"} element={<CompleteBusinessPortalPage/>}/>
                                <Route
                                    path="*"
                                    element={
                                        <Navigate replace to={"/complete-business-file"}/>
                                    }
                                />
                            </>
                        }
                        {!isBusinessPortalNotCompleted && isIndividualPortalNotCompleted &&
                            <>
                                <Route path={"/complete-individual-file"} element={<CompleteIndividualPortalPage/>}/>
                                <Route
                                    path="*"
                                    element={
                                        <Navigate replace to={"/complete-individual-file"}/>
                                    }
                                />
                            </>
                        }
                        {(isBusinessPortalNotCompleted && isIndividualPortalNotCompleted) &&
                            <>
                                <Route path={"/complete-individual-file"}
                                       element={<CompleteIndividualPortalPage/>}/>
                                <Route path={"/complete-business-file"} element={<CompleteBusinessPortalPage/>}/>
                                <Route
                                    path="*"
                                    element={
                                        <Navigate replace to={"/complete-individual-file"}/>
                                    }
                                />
                            </>
                        }
                        {!isIndividualPortalNotCompleted && !isBusinessPortalNotCompleted &&
                            <Route element={<PersistLogin/>}>
                                {/*<Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>*/}
                                <Route element={<Prefetch/>}>
                                    {/*<Route path={"/dashboard"} element={<IndexPage/>}/>*/}
                                    <Route path={'portals'}>
                                        <Route index element={<FilesPage/>}/>
                                        <Route path={"upload"} element={<UploadFilesPage/>}/>
                                    </Route>
                                    <Route path={"/profile"} element={<ProfilePage/>}/>
                                    {/*<Route path={"/portals"} element={<PanelsPage/>}/>*/}
                                    {/*<Route path={"/portals/add"} element={<CreatePanelPage/>}/>*/}
                                    {userInfo.role === "admin" &&
                                        <>
                                            {/*<Route element={<RequireAuth allowedRoles={[ROLES.admin]}/>}>*/}
                                            <Route path={'clients'}>
                                                <Route index element={<ClientsPage/>}/>
                                                <Route path={"add"} element={<CreateClientPage/>}/>
                                                <Route path={":clientId"} element={<ClientPage/>}/>
                                                <Route path={":clientId/update"} element={<ClientPage/>}/>
                                            </Route>
                                            <Route path={'account-requests'}>
                                                <Route index element={<AccountRequestsPage/>}/>
                                                <Route path={":requestId"}
                                                       element={<AccountRequestPage/>}/>
                                            </Route>
                                            {/*</Route>*/}
                                        </>
                                    }
                                    <Route
                                        path="/"
                                        exact
                                        element={
                                            <Navigate replace to={"/portals"}/>
                                        }
                                    />
                                    {/*<Route path={"/404"} element={<NotFoundPage/>}/>*/}
                                    {/*<Route*/}
                                    {/*    path="*"*/}
                                    {/*    element={*/}
                                    {/*        <Navigate replace to={"/404"}/>*/}
                                    {/*    }*/}
                                    {/*/>*/}
                                </Route>
                                {/*</Route>*/}
                            </Route>
                        }

                    </Routes>
                </Layout>
            }
        </>
    );
}

export default App;
