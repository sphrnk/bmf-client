// import { useContext } from "react";
// import AuthContext from "../../store/auth-context";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../../store/ui-slice";

const Header = () => {
    const dispatch = useDispatch();
    const toggleSidebarHandler = () => {
        dispatch(uiActions.toggle());
    };
    const toggleLogoutHandler = () => {
        dispatch(uiActions.toggleLogout());
    };
    return (
        <header className="h-20 py-4 px-3 z-10 sticky top-0 border-b bg-white">
            <div className="flex mx-auto justify-between items-center">
                <div className="bg-white flex justify-center w-20 mx-0.5" onClick={toggleSidebarHandler}>
                    {/* <img
          className="object-scale-down h-10 w-46"
          src="./public/images/logo/logo.png"
          alt=""
        /> */}
                    <i className="fa-regular fa-bars text-2xl"></i>
                </div>
                <div className="flex items-center gap-6 text-primary cursor-pointer" onClick={toggleLogoutHandler}>
                    <div
                        className="gap-3 flex items-center rounded-full w-12 h-12 border-primary border-2 overflow-hidden">
                        <img
                            src="public//images/logo/logo.png"
                            className="object-fill"
                            alt=""
                        />
                    </div>
                    <i className="fa-regular fa-angle-down"></i>
                </div>
            </div>
        </header>
    );
};

export default Header;
