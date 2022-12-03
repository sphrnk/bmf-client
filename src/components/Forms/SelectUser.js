import useHttp from "../../hooks/use-http.js";
import React, {useRef, useContext, useState, useEffect} from "react";
import {getUsers} from "../../lib/api/users";
import LoadingSpinner from "../UI/LoadingSpinner.js";
import AuthContext from "../../store/auth-context.js";
import Select from "./UI/Select";

const SelectUser = (props) => {
    const [selectedUser, setSelectedUser] = useState();
    const {
        sendRequest: getUsersRequest,
        status: getUsersRequestStatus,
        data: usersData,
        error: usersError
    } = useHttp(getUsers);
    let selectUser;
    let reqStatus;
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    useEffect(() => {
        if (user.role === "admin") {
            const req = async () => {
                await getUsersRequest({token});
            }
            req().catch((err) => console.log(err));
        }
    }, [getUsersRequest, token])
    console.count(getUsersRequestStatus);
    if (getUsersRequestStatus === 'pending') {
        selectUser = <p>Loading users...</p>
    }
    if (getUsersRequestStatus === 'completed' && usersData.data.users.length === 0) {
        selectUser = <p>There isn't any users. Create a user first </p>
    }
    if (getUsersRequestStatus === 'completed' && usersData && !usersError) {
        const newUsers = usersData.data.users.map((user) => {
            return {text: user.email, id: user._id};
        })
        selectUser = <Select object={"User"} options={newUsers}
                             onSelect={props.onSubmit}
        />
    }
    if (getUsersRequestStatus === 'completed' && !usersData && usersError) {
        selectUser = <p>Failed to fetch users. try again later...</p>

    }
    return (
        <>
            <p>sad</p>
            {selectUser}
        </>
    );
};
export default React.memo(SelectUser);