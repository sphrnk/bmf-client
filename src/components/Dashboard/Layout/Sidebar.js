import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import { Link } from "react-router-dom";
const Sidebar = (props) => {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;
  const asideClasses = `${
    props.isShown ? "left-0 md:-left-28 " : "-left-28 md:left-0 "
  } w-28 fixed h-full bg-primary transition-all`;
  return (
    <aside className={asideClasses}>
      {/* <div className="h-20 justify-center px-3 py-2 flex flex-col items-center w-full text-white"> */}
      {/* <div className="rounded-3xl px-4 py-0.5">
          <i className="fa-solid fa-bars fa-2x"></i>
        </div> */}
      {/* </div> */}
      <ul className="">
        <li>
          <Link
            to=""
            className="px-3 py-2 flex flex-col items-center w-full gap-1 text-white"
          >
            <div className="glassmorphic rounded-3xl px-4 py-0.5">
              <i className="fa-solid fa-house"></i>
              <span className="absolute right-0 top-0 w-2 h-2 animate-fadeNotif rounded-full"></span>
            </div>

            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="px-3 py-2 flex flex-col items-center w-full gap-1 text-white"
          >
            <div className="rounded-3xl px-4 py-0.5">
              <i className="fa-regular fa-message"></i>
              <span className="absolute w-2 h-2 bg-red-600 rounded-full">
                {" "}
              </span>
            </div>
            <span>Chat</span>
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="px-3 py-2 flex flex-col items-center w-full gap-1 text-white"
          >
            <div className="rounded-3xl px-4 py-0.5">
              <i className="fa-regular fa-files"></i>
            </div>
            <span>Files</span>
          </Link>
        </li>
        {user.role !== "client" && (
          <>
            <li>
              <Link
                to=""
                className="px-3 py-2 flex flex-col items-center w-full gap-1 text-white"
              >
                <div className="rounded-3xl px-4 py-0.5">
                  <i className="fa-regular fa-users"></i>
                </div>
                <span>Clients</span>
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="px-3 py-2 flex flex-col items-center w-full gap-1 text-white"
              >
                <div className="rounded-3xl px-4 py-0.5">
                  <i className="fa-regular fa-user-check"></i>
                </div>
                <span>Requests</span>
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="px-3 py-2 flex flex-col items-center w-full gap-1 text-white"
              >
                <div className="rounded-3xl px-4 py-0.5">
                  <i className="fa-regular fa-user-plus"></i>
                </div>
                <span>New Clients</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
