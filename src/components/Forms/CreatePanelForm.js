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

const CreatePanelForm = (props) => {
    const [selectedUser, setSelectedUser] = useState();
    const [showForm, setShowForm] = useState({
        businessForm: false,
        individualForm: false,
    })
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    if (user.role !== "admin"){
        setSelectedUser(user._id)
    }
    const {sendRequest:sendCreatePanelRequest, status, data, error} = useHttp(createPanel);
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
    console.log(selectedUser);

    const onSubmitHandler = () =>{

    }
    const changePanelTypeHandler = (e) => {
        // console.log(e.target.value);
        if (e.target.value === "business")
            setShowForm((prevState) => {
                return {
                    individualForm: false,
                    businessForm: true,
                }
            })
        else if (e.target.value === "individual") {
            setShowForm((prevState) => {
                return {
                    businessForm: false,
                    individualForm: true,
                }
            })
        }
    }

    return (
        <>
            <div className="flex w-full flex-col gap-4">
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-3 text-center">
                        {/*{user.role === 'admin' && usersData && users.length === 0 ?*/}
                        {/*    <p>There is not any user, add some user first</p> :*/}

                        {/*}*/}
                        {<SelectUser onSubmit={selectUserHandler}/>}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-3">
                        <span>Select Panel Type</span>
                        <div className="grid gap-3 grid-cols-2">
                            <div className={"flex gap-3"}>
                                <input
                                    onChange={changePanelTypeHandler}
                                    id="business-panel-type"
                                    name="panel-type"
                                    type={"radio"}
                                    className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                                    placeholder=""
                                    required
                                    value={"business"}
                                />
                                <label htmlFor="business-panel-type">Business</label>
                            </div>
                            <div className="flex gap-3">
                                <input
                                    onChange={changePanelTypeHandler}
                                    id="individual-panel-type"
                                    name="panel-type"
                                    type={"radio"}
                                    className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                                    placeholder=""
                                    required
                                    value={"individual"}
                                />
                                <label htmlFor="individual-panel-type">Individual</label>

                                {/*<small className="text-red-600">*some error*</small>*/}
                            </div>
                        </div>
                        {/*<small className="text-red-600">*some error*</small>*/}
                    </div>
                </div>
            </div>
            <form
                onSubmit={onSubmitHandler}
                action="client/src/components/Layout/Dashboard/CreateBusinessPanel#"
                className="flex gap-6 flex-col w-full"
            >
            {showForm.businessForm && <CreateBusinessPanel onConfirm={props.onConfirm} user={selectedUser}/>}
            {showForm.individualForm && <CreateIndividualPanel onConfirm={props.onConfirm} user={selectedUser}/>}
            </form>
            {reqStatus}
        </>
    );
};
export default CreatePanelForm;