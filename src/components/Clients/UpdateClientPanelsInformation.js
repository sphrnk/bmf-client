import {Tab, Tabs, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useState, useContext} from "react";
import {useSelector} from "react-redux";
import UpdateClientIndividualPanels from "./UpdateClientIndividualPanels";
import UpdateClientBusinessPanels from "./UpdateClientBusinessPanels";

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
                <Box sx={{p: 2, display: 'flex'}}>
                    {/*<div className={"grid grid-cols-12"}>*/}
                    {children}
                    {/*</div>*/}
                </Box>
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

const UpdateClientPanelsInformation = (props) => {
    const {individualPortals, businessPortals, individualPortal, businessPortal} = props;
    const [shownTab, setShownTab] = useState(0);
    const {userInfo: user, userToken: token} = useSelector((state) => state.auth)
    let individualPortalsContent;
    let businessPortalsContent;
    const setTabHandler = (event, tab) => {
        setShownTab(tab);
    }
    if (individualPortal) {
        individualPortalsContent = <TabPanel value={shownTab} index={0}>
            <UpdateClientIndividualPanels panels={individualPortals}/>
        </TabPanel>
    }
    if (businessPortal) {
        businessPortalsContent = <TabPanel value={shownTab} index={1}>
            <UpdateClientBusinessPanels panels={businessPortals}/>
        </TabPanel>
    }
    return (
        <>
            <Tabs
                value={shownTab}
                onChange={setTabHandler}
                aria-label="Panel type tabs"
            >
                {individualPortal &&
                    <Tab icon={<i className={`fa-duotone fa-user-tie`}></i>} iconPosition="start"
                         label="Individual"/>
                }

                {businessPortal &&
                    <Tab icon={<i className={`fa-duotone fa-briefcase`}></i>} iconPosition="start"
                         label="Business"/>
                }
            </Tabs>
            {individualPortalsContent}
            {businessPortalsContent}
            {/*{individualPortals.length === 0 &&}*/}
            {/*{businessPanels}*/}
        </>
    )
}
export default UpdateClientPanelsInformation;