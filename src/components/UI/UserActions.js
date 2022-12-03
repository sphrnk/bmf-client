import {useDispatch, useSelector} from "react-redux";
import userActions from "./UserActions";
import {uiActions} from "../../store/ui-slice";
import {useContext} from "react";
import AuthContext from "../../store/auth-context";

const UserActions = (props) => {
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);
    const userActionsClasses = `${props.isSidebarShown ? 'ml-28 md:ml-0 ' : 'ml-0 md:ml-0 '}transition-all fixed flex w-full justify-end z-20`
    const toggleLogoutHandler = () => {
        dispatch(uiActions.toggleLogout());
    };
    const logoutButtonHandler = () => {
        authCtx.logout();
    }
    return (
        <>
            {/*<div onClick={toggleLogoutHandler} className="fixed top-0 left-0 w-full sm:w-full h-screen z-10"*/}
            {/*></div>*/}
            <div className={userActionsClasses}>
                <div className="px-4 py-2 bg-gray-300 w-full md:w-40 flex flex-col">
                    <button onClick={logoutButtonHandler} className={"flex items-center py-3 gap-3 text-red-700"}>
                        <i className="fa-regular fa-right-from-bracket"></i>
                        logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserActions;
