import {Tab, Tabs, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";
import PropTypes from "prop-types";
import UserIndividualPanels from "./UserIndividualPanels";
import UserBusinessPanels from "./UserBusinessPanels";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div

            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div className={"grid grid-cols-12"}>
                    {children}
                </div>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const UsersPanels = (props) => {
    const [shownTab, setShownTab] = useState(0);
    console.log(props);
    let individualPanels;
    let businessPanels;
    const setTabHandler = (event, tab) => {
        setShownTab(tab);
    }
    if (props.individualPanels.length !== 0) {
        individualPanels = <TabPanel value={shownTab} index={0}>
            <UserIndividualPanels panels={props.individualPanels}/>
        </TabPanel>
    } else {

        individualPanels =
            <TabPanel value={shownTab} index={0}>
                <Typography className={"col-span-12"} variant={"h6"} component={"h6"}>
                    There isn't any individual portals, contact to user to complete his info.</Typography>
            </TabPanel>
    }
    if (props.businessPanels.length !== 0) {
        businessPanels = (<TabPanel value={shownTab} index={1}>
            <UserBusinessPanels panels={props.businessPanels}/>
        </TabPanel>)
    } else {
        businessPanels =
            <TabPanel value={shownTab} index={1}>
                <Typography className={"col-span-full"} variant={"h6"} component={"h6"}>
                    There isn't any business portals, contact to user to complete his info.</Typography>
            </TabPanel>
    }
    {console.log(props.businessPanels)}
    return (<>
            <Tabs
                value={shownTab}
                onChange={setTabHandler}
                aria-label="Panel type tabs"
            >
                {/*{props.indiviualPortal &&*/}
                    <Tab icon={<i className={`fa-duotone fa-user-tie`}></i>} iconPosition="start"
                         label="Individual"/>
                // }

                {/*{props.businessPortal &&*/}
                    <Tab icon={<i className={`fa-duotone fa-briefcase`}></i>} iconPosition="start"
                    label="Business"/>
                {/*}*/}
            </Tabs>
            {individualPanels}

            {businessPanels}
        </>
    )
}
export default UsersPanels;