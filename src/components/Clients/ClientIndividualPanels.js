import {Box, Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import {useState} from "react";
import IndividualPanelInformation from "../Panels/Individual/IndividualPanelInformation";

function VerticalTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`individual-pssanel-tabpanel-${index}`}
            aria-labelledby={`individual-panel-tab-${index}`}
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
        id: `individual-panel-tab-${index}`,
        'aria-controls': `individual-panel-tabpanel-${index}`,
    };
}

const ClientIndividualPanels = (props) => {
    const [individualPanelTab, setIndividualPanelTab] = useState(0);
    const setIndividualPanelTabHandler = (event, tab) => {
        setIndividualPanelTab(tab);
    }
    return (
        <Box sx={{
            display: 'flex',
            width: '100%'
        }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={individualPanelTab}
                onChange={setIndividualPanelTabHandler}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                {props.panels.map((panel, i) =>
                    <Tab className={'text-center'} key={i}
                         label={`${panel.firstName} ${panel.middleName} ${panel.lastName}`} {...a11yProps(i)} />
                )}
            </Tabs>
            {props.panels.map((panel, i) =>
                <VerticalTabPanel key={i} value={individualPanelTab} index={i}>
                    <IndividualPanelInformation panel={panel}/>
                </VerticalTabPanel>
            )}

        </Box>
    )
}
export default ClientIndividualPanels