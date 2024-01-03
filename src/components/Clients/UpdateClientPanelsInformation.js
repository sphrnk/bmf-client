import {Tab, Tabs, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useState, useContext} from "react";
import PropTypes from "prop-types";
import ClientIndividualPanels from "./ClientIndividualPanels";
import ClientBusinessPanels from "./ClientBusinessPanels";
import AuthContext from "../../store/auth-context";
import {useSelector} from "react-redux";

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

const ClientPanelsInformation = (props) => {
    const {individualPortals, businessPortals, individualPortal, businessPortal} = props;
    console.log('props:', businessPortal);
    const [shownTab, setShownTab] = useState(0);
    const {userInfo: user, userToken: token} = useSelector((state) => state.auth)
    let individualPortalsContent;
    let businessPortalsContent;
    const setTabHandler = (event, tab) => {
        setShownTab(tab);
    }
    // if (props.individualPanels.length !== 0) {
    //     // individualPanels;
    // } else {
    //     if (user.role !== "client") {
    //         individualPanels =
    //             <TabPanel value={shownTab} index={0}>
    //                 <Typography className={"col-span-12"} variant={"h6"} component={"h6"}>
    //                     There isn't any individual portals, contact to user to complete his info.</Typography>
    //             </TabPanel>
    //     } else {
    //         individualPanels =
    //             <TabPanel value={shownTab} index={0}>
    //                 <Typography className={"col-span-12"} variant={"h6"} component={"h6"}>
    //                     There isn't any individual portals</Typography>
    //             </TabPanel>
    //     }
    // }
    // if (props.businessPanels.length !== 0) {
    //     businessPanels = (<TabPanel value={shownTab} index={1}>
    //         <ClientBusinessPanels panels={props.businessPanels}/>
    //     </TabPanel>)
    // } else {
    //     if (user.role !== "client")
    {/*        businessPanels =*/
    }
    {/*            <TabPanel value={shownTab} index={1}>*/
    }
    {/*                <Typography className={"col-span-full"} variant={"h6"} component={"h6"}>*/
    }
    {/*                    There isn't any business portals, contact to user to complete his info.</Typography>*/
    }
    {/*            </TabPanel>*/
    }
    //     else {
    //         businessPanels =
    //             <TabPanel value={shownTab} index={1}>
    //                 <Typography className={"col-span-full"} variant={"h6"} component={"h6"}>
    //                     There isn't any business portals</Typography>
    //             </TabPanel>
    //     }
    // }
    if (individualPortal) {
        individualPortalsContent = <TabPanel value={shownTab} index={0}>
            <ClientIndividualPanels panels={individualPortals}/>
        </TabPanel>
    }
    if (businessPortal) {
        businessPortalsContent = <TabPanel value={shownTab} index={1}>
            <ClientBusinessPanels panels={businessPortals}/>
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
export default ClientPanelsInformation;