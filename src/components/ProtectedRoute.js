import {useDispatch, useSelector} from 'react-redux'
import {NavLink, Outlet, useLocation, Navigate} from 'react-router-dom'
import {Button} from "@mui/material";
import {selectCurrentToken} from "../store/auth/authSlice";
import {useEffect} from "react";

const ProtectedRoute = () => {
    const token = useSelector(selectCurrentToken)
    const dispatch = useDispatch()
    const location = useLocation();

    return (token ? <Outlet/> : <Navigate to={'/login'} state={{from: location}} replace/>)
}
export default ProtectedRoute