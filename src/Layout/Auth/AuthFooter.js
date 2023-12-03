import useHttp from "../../hooks/use-http";
import {useContext, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Modal from "../../components/UI/Modal";
import CreateAccountForm from "./Forms/CreateAccountForm";
import AuthContext from "../../store/auth-context";
import CreatePanelForm from "./Forms/CreatePanelForm";
import UploadFileForm from "./Forms/UploadFileForm";

const AuthFooter = () => {
    const [showModal, setShowModal] = useState({
        createAccount: false,
        createPanel: false,
        uploadFile: false,
    });
    const isSidebarShown = useSelector((state) => state.ui.sidebarIsVisible);
    const footerClasses = `${
        isSidebarShown ? "ml-28 md:ml-0 " : "ml-0 md:ml-28 "
    }w-full bg-white border-t transition-all z-20`;

    // const authCtx = useContext(AuthContext)
    // const {user} = authCtx;
    // console.log(user);
    const showCreateAccountHandler = () => {
        setShowModal((prevState) => {
            return {
                ...prevState,
                createAccount: !prevState.createAccount,
            }
        });
    };

    const showUploadFileHandler = () => {
        setShowModal((prevState) => {
            return {
                ...prevState,
                uploadFile: !prevState.uploadFile,
            }
        });
    };

    const showCreatePanelHandler = () => {
        setShowModal((prevState) => {
            return {
                ...prevState,
                createPanel: !prevState.createPanel,
            }
        });
    };
    return (<>
            <footer className="flex fixed bottom-0 p w-full">
                <div className={footerClasses}>
                    <div className="container mx-auto py-5 px-4">
                        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-content-end">
                            {user.role === "admin" && <button
                                onClick={showCreateAccountHandler}
                                className="lg:col-start-2 cursor-pointer py-2 px-4 bg-primary text-white rounded flex items-center gap-3 justify-center"
                            >
                                Create Account
                                <i className="fa-regular fa-plus fa-xl"></i>
                            </button>}
                            <button
                                onClick={showCreatePanelHandler}
                                className="lg:col-start-3 cursor-pointer py-2 px-4 bg-primary text-white rounded flex items-center gap-3 justify-center"
                            >
                                Create Panel
                                <i className="fa-regular fa-building-user"></i>
                            </button>
                            <button
                                onClick={showUploadFileHandler}
                                className="lg:col-start-4 cursor-pointer py-2 px-4 bg-primary text-white rounded flex items-center gap-3 justify-center"
                            >
                                Upload File
                                <i className="fa-regular fa-file-arrow-up"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
            {showModal.createAccount && <Modal title={"Create Account"} onConfirm={showCreateAccountHandler}>
                <CreateAccountForm onConfirm={showCreateAccountHandler}/>
            </Modal>}
            {showModal.createPanel && <Modal title={"Create Panel"} onConfirm={showCreatePanelHandler}>
                <CreatePanelForm onConfirm={showCreatePanelHandler}/>
            </Modal>}
            {showModal.uploadFile && <Modal title={"Upload File"} onConfirm={showUploadFileHandler}>
                <UploadFileForm onConfirm={showUploadFileHandler}/>
            </Modal>}
        </>
    );
};
export default AuthFooter;