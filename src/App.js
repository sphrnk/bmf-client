import {useContext} from "react";
import "./App.css";
import "../../../training/hwi/public/assets/css/font-awsome.min.css";
import Layout from "./Layout/Dashboard/Layout";
import LoginPage from "./pages/Auth/LoginPage";
import IndexPage from "./pages/Dashboard/IndexPage";
import {Routes, Route, Navigate} from "react-router-dom";
import AuthContext from "./store/auth-context";

import SendRequestPage from "./pages/Auth/SendRequestPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import FilesPage from "./pages/Dashboard/Files/FilesPage";
import ClientsPage from "./pages/Dashboard/Clients/ClientsPage";
import PanelsPage from "./pages/Dashboard/Panels2/PanelsPage";
import AccountRequestsPage from "./pages/Dashboard/AccountRequestsPage";
import DataTablePage from "./pages/Dashboard/DataTablePage";
import UpdateClientPage from "./pages/Dashboard/Clients/UpdateClientPage";
import AccountRequestPage from "./pages/Dashboard/AccountRequestPage";
import AuthLayout from "./Layout/Auth/AuthLayout";
import CreateClientPage from "./pages/Dashboard/Clients/CreateClientPage";
import CreatePanelPage from "./pages/Dashboard/Panels2/CreatePanelPage";
import IndividualPanelPage from "./pages/Dashboard/Panels/Individual/IndividualPanelPage";
import BusinessPanelPage from "./pages/Dashboard/Panels/Business/BusinessPanelPage";
import CompleteIndividualPortalPage from "./pages/Dashboard/Panels/Individual/CompleteIndividualPanelPage";
import CompleteBusinessPortalPage from "./pages/Dashboard/Panels/Business/CompleteBusinessPanelPage";
import UploadFilesPage from "./pages/Dashboard/Files/UploadFilesPage";
import TempPasswordPage from "./pages/Dashboard/TempPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/Dashboard/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import {useSelector} from "react-redux";
import PersistLogin from "./store/auth/PersistLogin";
import Prefetch from "./store/auth/Prefetch";
import RequireAuth from "./store/auth/RequireAuth";
import {ROLES} from './config/roles'
import {selectCurrentToken, selectCurrentUser} from "./store/auth/authSlice";
import BusinessPartnersPage from "./pages/Dashboard/Panels/Business/Partners/BusinessPartnersPage";
import CreateBusinessPartnerPage from "./pages/Dashboard/Panels/Business/Partners/CreateBusinessPartnerPage";
import UpdateBusinessPartnerPage from "./pages/Dashboard/Panels/Business/Partners/UpdateBusinessPartnerPage";

function App({toggleTheme}) {
    const {userInfo, userToken: token} = useSelector((state) => state.auth)
    // const userInfo = useSelector(selectCurrentUser);
    // const token = useSelector(selectCurrentToken);
    console.log("hello:", userInfo)
    const isIndividualPortalNotCompleted = token && userInfo && userInfo.individualPortalCount > userInfo.individualPortals.length;
    const isBusinessPortalNotCompleted = token && userInfo && userInfo.businessPortalCount > userInfo.businessPortals.length;
    console.log(isIndividualPortalNotCompleted);
    console.log(isBusinessPortalNotCompleted);
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
                <Layout toggleTheme={toggleTheme}>
                    <Routes>
                        {isBusinessPortalNotCompleted && !isIndividualPortalNotCompleted &&
                            <>
                                <Route path={"/complete-business-panel"} element={<CompleteBusinessPortalPage/>}/>
                                <Route
                                    path="*"
                                    element={
                                        <Navigate replace to={"/complete-business-panel"}/>
                                    }
                                />
                            </>
                        }
                        {!isBusinessPortalNotCompleted && isIndividualPortalNotCompleted &&
                            <>
                                <Route path={"/complete-individual-panel"} element={<CompleteIndividualPortalPage/>}/>
                                <Route
                                    path="*"
                                    element={
                                        <Navigate replace to={"/complete-individual-panel"}/>
                                    }
                                />
                            </>
                        }
                        {(isBusinessPortalNotCompleted && isIndividualPortalNotCompleted) &&
                            <>
                                <Route path={"/complete-individual-panel"}
                                       element={<CompleteIndividualPortalPage/>}/>
                                <Route path={"/complete-business-panel"} element={<CompleteBusinessPortalPage/>}/>
                                <Route
                                    path="*"
                                    element={
                                        <Navigate replace to={"/complete-individual-panel"}/>
                                    }
                                />
                            </>
                        }
                        {!isIndividualPortalNotCompleted && !isBusinessPortalNotCompleted &&
                            <Route element={<PersistLogin/>}>
                                {/*<Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>*/}
                                <Route element={<Prefetch/>}>
                                    {/*<Route path={"/dashboard"} element={<IndexPage/>}/>*/}
                                    {/*<Route path={'portals'}>*/}
                                    <Route path={"/portals/*"} element={<FilesPage/>}/>
                                    {/*<Route path={"/portals/:path/*"} element={<FilesPage/>}/>*/}
                                    {/*<Route path={"/:path/*"} element={<FilesPage/>}/>*/}
                                    {/*<Route path={"upload"} element={<UploadFilesPage/>}/>*/}
                                    {/*</Route>*/}
                                    <Route path={"/profile"} element={<ProfilePage/>}/>
                                    {userInfo.role === "client" && userInfo.businessPortal &&
                                        <Route path={'/partners'}>
                                            <Route index element={<BusinessPartnersPage/>}/>
                                            <Route path={"add"} element={<CreateBusinessPartnerPage/>}/>
                                            {/*<Route path={":partnerId"} element={<UpdateClientPage/>}/>*/}
                                            <Route path={":partnerId/update"} element={<UpdateBusinessPartnerPage/>}/>
                                        </Route>
                                    }
                                    {/*<Route path={"/portals"} element={<PanelsPage/>}/>*/}
                                    {/*<Route path={"/portals/add"} element={<CreatePanelPage/>}/>*/}
                                    {userInfo.role === "admin" &&
                                        <>
                                            {/*<Route element={<RequireAuth allowedRoles={[ROLES.admin]}/>}>*/}
                                            <Route path={'clients'}>
                                                <Route index element={<ClientsPage/>}/>
                                                <Route path={"add"} element={<CreateClientPage/>}/>
                                                <Route path={":clientId"} element={<UpdateClientPage/>}/>
                                                <Route path={":clientId/update"} element={<UpdateClientPage/>}/>
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
                                            <Navigate replace to={"/portals/"}/>
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
