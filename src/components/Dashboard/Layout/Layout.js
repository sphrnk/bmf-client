import {useContext, useState} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Modal from "../../UI/Modal";
// import AuthContext from "../../store/auth-context";
import {useSelector} from "react-redux";
import useHttp from "../../../hooks/use-http";
import {useRef} from "react";
import Footer from "./Footer";
import CreateAccountForm from "../Forms/CreateAccountForm";
import AuthContext from "../../../store/auth-context";
import FirstTimeChangePasswordForm from "../Forms/FirstTimeChangePasswordForm";
import UserActions from "./UserActions";


const Layout = (props) => {
    const [showModal, setShowModal] = useState(true);
    const authCtx = useContext(AuthContext);
    const {sidebarIsVisible: isSidebarShown, logoutIsVisible: isUserActionsShown} = useSelector((state) => state.ui);
    const mainClasses = `${
        isSidebarShown ? "ml-28 md:ml-0 " : "ml-0 md:ml-28 "
    }w-full h-full transition-all`;
    const showModalHandler = () => {
        setShowModal((prevState) => !prevState);
    };
    return (
        <>
            <Header/>
            <Sidebar isShown={isSidebarShown}/>
            {isUserActionsShown && <UserActions isSidebarShown={isSidebarShown}/>}
            <main className="flex">
                <div className={mainClasses}>{props.children}</div>
            </main>
            <Footer/>
            {authCtx.user.firstTimeLogin && showModal &&
                <Modal title={"Change Password"} onConfirm={showModalHandler}>
                    <FirstTimeChangePasswordForm onConfirm={showModalHandler}/>
                </Modal>}
        </>
    );
};

export default Layout;
