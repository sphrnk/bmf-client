import useHttp from "../../hooks/use-http.js";
import React, {useRef, useContext, useState, useEffect} from "react";
import {getPanelsOfUser} from "../../lib/api/portals";
import LoadingSpinner from "../UI/LoadingSpinner.js";
import AuthContext from "../../store/auth-context.js";
import {useParams} from "react-router-dom";
import {FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup} from "@mui/material";

const SelectPanel = (props) => {
    const selectedUser = props.selectedUser;
    const [panelType, setPanelType] = useState('individual');
    const [selectedPanel, setSelectedPanel] = useState();

    let selectPanel;
    let reqStatus;
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const {
        sendRequest: getPanelsRequest,
        status: getPanelsRequestStatus,
        data: panelsData,
        error: panelsError
    } = useHttp(getPanelsOfUser, true);
    useEffect(() => {
        console.log(selectedUser);
        getPanelsRequest({token, selectedUser, panelType})
    }, [getPanelsRequest, token, panelType, selectedUser])
    const changePanelTypeHandler = (e) => {
        // console.log(e.target.value);
        if (e.target.value === "business") {
            setPanelType('business');
        } else if (e.target.value === "individual") {
            setPanelType('individual')
        }
    }
    const handleChange = (event) => {
        setSelectedPanel(event.target.value);
        props.onSubmit({panel: event.target.value, panelType});
    };
    if (getPanelsRequestStatus === 'pending') {
        selectPanel = <p>Loading panels...</p>
    }
    if (getPanelsRequestStatus === 'completed' && panelsData.data.panels.length === 0) {
        selectPanel = <p>There isn't any {panelType} panels for user</p>
    }
    if (getPanelsRequestStatus === 'completed' && panelsData.data.panels.length !== 0 && !panelsError) {
        const newPanels = panelsData.data.panels.map((panel) => {
            console.log(panel)
            if (panel.type === "individual") {
                return {text: panel.firstName + panel.middleName + panel.lastName, id: panel._id};
            } else if (panel.type === "business") {
                return {text: panel.companyEmail, id: panel._id};
            }
        })
        selectPanel = <FormControl sx={{minWidth: 200}}>
            <InputLabel id="panel-type-label">Select Panel</InputLabel>
            <Select
                labelId="panel-type-label"
                value={selectedPanel}
                label="Select Panel"
                onChange={handleChange}
            >
                {newPanels.map((panel) => (
                    <MenuItem key={panel.id} value={panel.id}>{panel.text}</MenuItem>
                ))}
            </Select>
        </FormControl>
    }
    if (getPanelsRequestStatus === 'completed' && !panelsData && panelsError) {
        selectPanel = <p>Failed to fetch panels. try again later...</p>
    }
    return (
        <>
            <div className={"grid grid-cols-2 gap-6 items-center"}>
                <ToggleButtonGroup
                    color="primary"
                    value={panelType}
                    exclusive
                    fullWidth
                    onChange={changePanelTypeHandler}
                    aria-label="Platform"
                >
                    <ToggleButton value="business">Business</ToggleButton>
                    <ToggleButton value="individual">Individual</ToggleButton>
                </ToggleButtonGroup>
                {selectPanel}
            </div>
        </>
    );
};
export default React.memo(SelectPanel);