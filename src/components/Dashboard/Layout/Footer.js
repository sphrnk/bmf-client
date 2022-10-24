import useHttp from "../../../hooks/use-http";
import {useRef, useState} from "react";
import {useSelector} from "react-redux";
import Modal from "../../UI/Modal";
import CreateAccountForm from "../Forms/CreateAccountForm";

const Footer = () => {
    const [showModal, setShowModal] = useState(false);
    const isSidebarShown = useSelector((state) => state.ui.sidebarIsVisible);
    const footerClasses = `${
        isSidebarShown ? "ml-28 md:ml-0 " : "ml-0 md:ml-28 "
    }w-full bg-white border-t transition-all z-20`;


    const showModalHandler = () => {
        setShowModal((prevState) => !prevState);
    };

    return (<>
            <footer className="flex fixed bottom-0 w-full">
                <div className={footerClasses}>
                    <div className="container mx-auto py-5 px-4">
                        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-content-end">
                            <button
                                onClick={showModalHandler}
                                className="md:col-start-3 cursor-pointer py-2 px-4 bg-primary text-white rounded flex items-center gap-3 justify-center"
                            >
                                Create Account
                                <i className="fa-regular fa-plus fa-xl"></i>
                            </button>
                            <button
                                onClick={showModalHandler}
                                className="md:col-start-4 cursor-pointer py-2 px-4 bg-primary text-white rounded flex items-center gap-3 justify-center"
                            >
                                Upload File
                                <i className="fa-regular fa-plus fa-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
            {showModal && <Modal title={"Create Account"} onConfirm={showModalHandler}>
                <CreateAccountForm onConfirm={showModalHandler}/>
            </Modal>}
        </>
    );
};
export default Footer;