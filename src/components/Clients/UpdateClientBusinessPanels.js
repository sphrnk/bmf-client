import {Box, Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import {useState} from "react";
import BusinessPanelInformation from "../Panels/Business/BusinessPanelInformation";
import UpdateBusinessPanelInformation from "../Panels/Business/UpdateBusinessPanelInformation";

function VerticalTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`business-panel-tabpanel-${index}`}
            aria-labelledby={`business-panel-tab-${index}`}
            {...other}
            className={'md:w-full'}
        >
            <Box sx={{p: 2}}>
                {value === index && (
                    <>{children}</>
                )}
            </Box>
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
        id: `business-panel-tab-${index}`,
        'aria-controls': `business-panel-tabpanel-${index}`,
    };
}

const ClientBusinessPanels = (props) => {
    console.log("mmmmmmm")
    console.log(props)
    console.log("mmmmmmm")
    const [businessPanelTab, setBusinessPanelTab] = useState(0);
    const setBusinessPanelTabHandler = (event, tab) => {
        setBusinessPanelTab(tab);
    }
    return (
        <Box sx={{
            display: 'flex',
            width: '100%'
        }}>
            <Tabs
                className={"col-span-1"}
                orientation="vertical"
                variant="scrollable"
                value={businessPanelTab}
                onChange={setBusinessPanelTabHandler}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                {props.panels.map((panel, i) =>
                    <Tab key={i}
                         label={panel.companyName} {...a11yProps(i)} />
                )}
            </Tabs>
            {props.panels.map((panel, i) =>
                <VerticalTabPanel key={i} value={businessPanelTab} index={i}>
                    <UpdateBusinessPanelInformation panel={panel}/>
                </VerticalTabPanel>
            )}
        </Box>
    )
}
export default ClientBusinessPanels