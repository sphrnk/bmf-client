import useHttp from "../../hooks/use-http.js";
import {useRef, useContext, useState, useEffect} from "react";
import {getUsers} from "../../lib/api/users";
import LoadingSpinner from "../UI/LoadingSpinner.js";
import Notif from "../UI/Notif.js";
import AuthContext from "../../store/auth-context.js";
import CreateBusinessPanel from "../Layout/Dashboard/CreateBusinessPanel";
import CreateIndividualPanel from "../Layout/Dashboard/CreateIndividualPanel";
import SelectUser from "./SelectUser";
import {createPanel} from "../../lib/api/panels";
import {validateZipCode} from "../../lib/utils";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

const CreatePanelForm = (props) => {
    const [selectedUser, setSelectedUser] = useState();
    const [panelType, setPanelType] = useState('');

    const [showForm, setShowForm] = useState({
        businessForm: false,
        individualForm: false,
    })
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
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
        console.log(panelData)
        await sendCreatePanelRequest({panelData, token, panelType});
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

            {reqStatus}
        </>
    );
};
export default CreatePanelForm;