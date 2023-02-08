import useHttp from "../../hooks/use-http.js";
import {useRef, useContext, useState, useEffect} from "react";
import {getUsers} from "../../lib/api/users";
import LoadingSpinner from "../UI/LoadingSpinner.js";
import Notif from "../UI/Notif.js";
import AuthContext from "../../store/auth-context.js";
import CreateBusinessPanel from "../CreateBusinessPanel";
import CreateIndividualPanel from "../CreateIndividualPanel";
import SelectUser from "./SelectUser";
import {createPanel} from "../../lib/api/portals";
import {validateZipCode} from "../../lib/utils";
import {Button, ToggleButton, ToggleButtonGroup} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

const CreatePanelForm = (props) => {
    const [selectedUser, setSelectedUser] = useState();
    const [panelType, setPanelType] = useState('');
    const [showForm, setShowForm] = useState({
        businessForm: false,
        individualForm: false,
    })
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const navigate = useNavigate();
    if (user.role !== "admin") {
        setSelectedUser(user._id)
    }
    const {sendRequest: sendCreatePanelRequest, status, data, error} = useHttp(createPanel);
    const {
        sendRequest: sendZipCodeRequest,
        status: zipCodeStatus,
        data: zipCodeData,
        error: zipCodeErr
    } = useHttp(validateZipCode);
    let reqStatus;
    const selectUserHandler = (value) => {

        setSelectedUser(value);
    }

    const createPanelHandler = async (panelData) => {

        // await sendCreatePanelRequest({panelData, token, panelType});
        props.onSubmit({...panelData, token, panelType});
    }
    const changePanelTypeHandler = (e) => {
        // console.log(e.target.value);
        if (e.target.value === "business") {
            setShowForm((prevState) => {
                return {
                    individualForm: false,
                    businessForm: true,
                }
            })
            setPanelType('business');
        } else if (e.target.value === "individual") {
            setShowForm((prevState) => {
                return {
                    businessForm: false,
                    individualForm: true,
                }
            })
            setPanelType('individual')
        }
    }
    if (data) {
        // console.log(data);
        reqStatus = <Notif status={"success"}
                           text={"Panel Created Successfully!"}/>
    }
    if (status === "completed" && error) {
        reqStatus = <Notif status={"fail"} text={error}/>
    }
    return (
        <>
            <div className="flex w-full flex-col gap-4 mb-4">
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-3">
                        {/*{user.role === 'admin' && usersData && users.length === 0 ?*/}
                        {/*    <p>There is not any user, add some user first</p> :*/}
                        <h1 className={"text-2xl font-bold"}>User</h1>
                        {/*}*/}
                        {<SelectUser onSubmit={selectUserHandler}/>}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-3">
                        <span>Select Panel Type</span>
                        <div className="grid gap-3 grid-cols-2">
                            <ToggleButtonGroup
                                color="primary"
                                value={panelType}
                                exclusive
                                onChange={changePanelTypeHandler}
                                aria-label="Platform"
                            >
                                <ToggleButton value="business">Business</ToggleButton>
                                <ToggleButton value="individual">Individual</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        {/*<small className="text-red-600">*some error*</small>*/}
                    </div>
                </div>
            </div>

            {showForm.businessForm &&
                <CreateBusinessPanel onCreatePanel={createPanelHandler} onConfirm={props.onConfirm}
                                     user={selectedUser}/>}
            {showForm.individualForm &&
                <CreateIndividualPanel onCreatePanel={createPanelHandler} onConfirm={props.onConfirm}
                                       user={selectedUser}/>}
            {/*<div className="flex justify-end gap-3">*/}
            {/*    <Button*/}
            {/*        variant='outlined'*/}
            {/*        color={'error'}*/}
            {/*        type="button"*/}
            {/*        onClick={() => {*/}
            {/*            navigate('/portals')*/}
            {/*        }}*/}
            {/*        disabled={props.isPending}*/}
            {/*    >*/}
            {/*        Cancel*/}
            {/*    </Button>*/}

            {/*    <Button*/}
            {/*        variant='contained'*/}
            {/*        type="submit"*/}
            {/*        disabled={props.isPending}*/}
            {/*    >*/}
            {/*        {props.isPending &&*/}
            {/*            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"*/}
            {/*                 xmlns="http://www.w3.org/2000/svg" fill="none"*/}
            {/*                 viewBox="0 0 24 24">*/}
            {/*                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"*/}
            {/*                        strokeWidth="4"></circle>*/}
            {/*                <path className="opacity-75" fill="currentColor"*/}
            {/*                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>*/}
            {/*            </svg>}*/}
            {/*        Create Panel*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </>
    );
};
export default CreatePanelForm;