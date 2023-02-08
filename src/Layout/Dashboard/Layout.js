import {useContext, useState, useEffect} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";
import Modal from "../../components/UI/Modal";
// import AuthContext from "../../store/auth-context";
import {useDispatch, useSelector} from "react-redux";
import useHttp from "../../hooks/use-http";
import {useRef} from "react";
import Footer from "./Footer";
import CreateAccountForm from "../../components/Forms/CreateAccountForm";
import AuthContext from "../../store/auth-context";
import FirstTimeChangePasswordForm from "../../components/Forms/FirstTimeChangePasswordForm";
import UserActions from "../../components/UI/UserActions";
import AuthHeader from "../Auth/AuthHeader";
import {Link, useLocation} from "react-router-dom";
import Notif from "../../components/UI/Notif";
import {uiActions} from "../../store/ui-slice";


const Layout = (props) => {
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const [changePasswordModal, setShowChangePasswordModal] = useState(authCtx.user.firstTimeLogin);
    const {sidebarIsVisible: isSidebarShown, logoutIsVisible: isUserActionsShown} = useSelector((state) => state.ui);
    const mainClasses = `${user ? isSidebarShown ? "ml-28 md:ml-0 " : "ml-0 md:ml-28 " : ''
    } w-full h-full transition-all`;
    const closeChangePasswordModalHandler = () => {
        setShowChangePasswordModal(false);
    }
    return (
        <>
            {authCtx.user.firstTimeLogin && changePasswordModal &&
                <Modal title={'Change Password'}
                       open={changePasswordModal}>
                    <FirstTimeChangePasswordForm onConfirm={closeChangePasswordModalHandler}/>
                </Modal>}
            {!authCtx.user.firstTimeLogin && <>
                <Header/>
                <Sidebar isShown={isSidebarShown}/>
                {isUserActionsShown && user && token && <UserActions isSidebarShown={isSidebarShown}/>}
                <main className="flex">
                    <div className={mainClasses}>
                        <div className="container mx-auto py-5 px-4">
                            {props.children}
                        </div>
                    </div>
                </main>
            </>}
            <Notif/>
            {/*<Footer/>*/}
        </>
    );
};

export default Layout;
