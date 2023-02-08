import {Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import {useState} from "react";
import IndividualPanelInformation from "../IndividualPanelInformation";

function VerticalTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            className={'col-span-11 px-4'}
            role="tabpanel"
            hidden={value !== index}
            id={`individual-panel-tabpanel-${index}`}
            aria-labelledby={`individual-panel-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}

VerticalTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `individual-panel-tab-${index}`,
        'aria-controls': `individual-panel-tabpanel-${index}`,
    };
}

const UserIndividualPanels = (props) => {
    const [individualPanelTab, setIndividualPanelTab] = useState(0);
    const setIndividualPanelTabHandler = (event, tab) => {
        setIndividualPanelTab(tab);
    }
    return (
        <>
            <Tabs
                className={"col-span-1"}
                orientation="vertical"
                variant="scrollable"
                value={individualPanelTab}
                onChange={setIndividualPanelTabHandler}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                {props.panels.map((panel, i) =>
                    <Tab key={i}
                         label={panel.firstName + " " + panel.middleName + " " + panel.lastName} {...a11yProps(i)} />
                )}
            </Tabs>
            {props.panels.map((panel, i) =>
                <VerticalTabPanel key={i} value={individualPanelTab} index={i}>
                    <IndividualPanelInformation panel={panel}/>
                </VerticalTabPanel>
            )}

        </>
    )
}
export default UserIndividualPanels