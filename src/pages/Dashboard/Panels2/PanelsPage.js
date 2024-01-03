import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../store/auth-context";
import useHttp from "../../../hooks/use-http";
import {getPanels, getPanelsOfUser} from "../../../lib/api/portals";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import {Button, FormControl, InputLabel, Link, MenuItem, Select} from "@mui/material";
import Modal from "../../../components/UI/Modal";
import CreatePanelForm from "../../../components/Forms/CreatePanelForm";
import PanelsList from "../../../components/PanelsList";
import {Link as RouterLink} from "react-router-dom";

const PanelsPage = () => {
    const authCtx = useContext(AuthContext);
    const [panelType, setPanelType] = useState("business");
    const [createPanelModal, setShowCreatePanelModal] = useState(false);
    const {token, user} = authCtx;
    const selectedUser = user._id
    const panelReq = user.role === "admin" ? getPanels : getPanelsOfUser
    const closeCreatePanelModalHandler = () => {
        setShowCreatePanelModal(false)
    }
    const changePanelHandler = (e) => {
        setPanelType(e.target.value)
    }
    const {sendRequest: getPanelsRequest, status: panelStatus, data: panels, error: panelsError} = useHttp(panelReq);
    let panelsContent;
    useEffect(() => {
        if (user.role === "admin") {
            getPanelsRequest({token, panelType})
        } else {
            getPanelsRequest({token, selectedUser, panelType})
        }
    }, [getPanelsRequest, panelType, token, user, selectedUser]);
    if (panelStatus === "pending") {
        panelsContent = <LoadingSpinner/>
    }
    if (panelStatus === "completed" && panels && !panelsError) {
        panels.data.panels.forEach((panel, i) => {
            panel.id = i;
        })
        console.log(panels.data.panels);
        panelsContent = <PanelsList panels={panels.data.panels} panelType={panelType}/>
    }
    console.log(panels, panelsError)
    if (panelStatus === "completed" && panels.data.panels.length === 0) {
        panelsContent = <p className={"self-center"}>There is not any Panel, create one!</p>
    }
    return (
        <>
            <div className="flex justify-between items-center gap-4 mb-4">
                <h1 className={"font-bold text-4xl"}>Panels</h1>
                <div className={"flex items-center gap-4"}>
                    <FormControl sx={{minWidth: 200}}>
                        <InputLabel id="panel-type-label">Panel Type</InputLabel>
                        <Select
                            size={'small'}
                            labelId="panel-type-label"
                            value={panelType}
                            label="Panel Type"
                            onChange={changePanelHandler}
                        >
                            <MenuItem value={'business'}>Business</MenuItem>
                            <MenuItem value={'individual'}>Individual</MenuItem>
                        </Select>
                    </FormControl>
                    <Link component={RouterLink} to={'/portals/add'} underline={"none"}>
                        <Button variant="contained"
                                className={"bg-primary shadow-none w-36"}>Create Panel</Button>
                    </Link>
                </div>
            </div>
            {panelsContent}
            {/*{createPanelModal && <Modal title={"Create Panel"} onConfirm={toggleCreatePanelHandler}>*/}
            {/*    <CreatePanelForm onConfirm={toggleCreatePanelHandler}/>*/}
            {/*</Modal>}*/}
            {createPanelModal &&
                <Modal
                    onClose={closeCreatePanelModalHandler} open={createPanelModal}>
                    <CreatePanelForm/>
                </Modal>
            }
        </>
    );
};
export default PanelsPage;
