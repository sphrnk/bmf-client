import {NavLink} from "react-router-dom";

const SidebarItem = (props) => {
    return <NavLink
        to={props.path}
        className={({isActive}) => isActive ? "active px-3 py-2 flex flex-col items-center w-full gap-1 text-white" : "px-3 py-2 flex flex-col items-center w-full gap-1 text-white"}>
        <div className="glassmorphic rounded-3xl px-4 py-0.5">
            <i className="fa-solid fa-house"></i>
            <span className="absolute right-0 top-0 w-2 h-2 rounded-full"></span>
        </div>

        <span>{props.text}</span>
    </NavLink>
}
export default SidebarItem;