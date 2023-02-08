import useHttp from "../../hooks/use-http.js";
import React, {useRef, useContext, useState, useEffect} from "react";
import {getUsers} from "../../lib/api/users";
import LoadingSpinner from "../UI/LoadingSpinner.js";
import AuthContext from "../../store/auth-context.js";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    OutlinedInput,
    Radio, RadioGroup
} from "@mui/material";

const SelectUser = (props) => {
    const [selectedUser, setSelectedUser] = useState('');
    const {
        sendRequest: getUsersRequest,
        status: getUsersRequestStatus,
        data: usersData,
        error: usersError
    } = useHttp(getUsers);
    let selectUser;
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
    const handleChange = (event) => {
        setSelectedUser(event.target.value);
        props.onSubmit(event.target.value);
    };
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
        console.log(newUsers)
        selectUser =
            <FormControl sx={{minWidth: 200}}>
                <InputLabel id="panel-type-label">Select User</InputLabel>
                <Select
                    labelId="panel-type-label"
                    value={selectedUser}
                    label="Select User"
                    onChange={handleChange}
                >
                    {newUsers.map((user) => (
                        <MenuItem key={user.id} value={user.id}>{user.text}</MenuItem>
                    ))}
                </Select>
            </FormControl>
    }
    if (getUsersRequestStatus === 'completed' && !usersData && usersError) {
        selectUser = <p>Failed to fetch users. try again later...</p>

    }
    return (
        <>
            {selectUser}
        </>
    );
};
export default React.memo(SelectUser);