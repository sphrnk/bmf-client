import {useSelector} from 'react-redux'
import {selectCurrentToken} from "../store/auth/authSlice"
import {jwtDecode} from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isClient = false
    let isAdmin = false
    let status = "client"

    if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded);
        const {username, roles} = decoded.UserInfo

        isClient = roles.includes('client')
        isAdmin = roles.includes('admin')

        if (isClient) status = "client"
        if (isAdmin) status = "admin"

        return {username, roles, status, isClient, isAdmin}
    }

    return {username: '', roles: [], isClient, isAdmin, status}
}
export default useAuth