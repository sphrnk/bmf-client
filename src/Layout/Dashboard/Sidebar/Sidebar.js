import {useContext} from "react";
import AuthContext from "../../../store/auth-context";
import {Link, NavLink} from "react-router-dom";
import {Divider, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, styled} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../../store/ui-slice";
import Drawer from '@mui/material/Drawer';
import React from "react";

const DrawerHeader = styled('div')(({theme}) => {
    console.log('them:', theme);
    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }
});

const drawerWidth = 240;

const Sidebar = (props) => {
    const {userInfo} = useSelector((state) => state.auth)
    const {sidebarState} = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const handleDrawerClose = () => {
        dispatch(uiActions.hideSidebar());
    };
    return (
        <Drawer sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
        }} variant="persistent" anchor={'left'} open={sidebarState}>
            <DrawerHeader color={'primary'}>
                <Icon onClick={handleDrawerClose} color={"primary"}
                      baseClassName="far"
                      className="fa-solid fa-chevron-left cursor-pointer"/>
            </DrawerHeader>
            <Divider/>
            <List>
                {/*<ListItem disablePadding>*/}
                {/*    <NavLink*/}
                {/*        to={'/dashboard'}*/}
                {/*        className={(navData) => navData.isActive ? "active text-center px-3 py-2 flex flex-col items-center w-full gap-1" : "text-center px-3 py-2 flex flex-col items-center w-full gap-1"}>*/}
                {/*        <div*/}
                {/*            className={"glassmorphic rounded-3xl px-4 py-0.5"}>*/}
                {/*            <i className="fa-solid fa-house"></i>*/}
                {/*            <span className="absolute right-0 top-0 w-2 h-2 rounded-full"></span>*/}
                {/*        </div>*/}
                {/*        <ListItemText primary={'Dashboard'}/>*/}
                {/*    </NavLink>*/}
                {/*</ListItem>*/}
                <ListItem disablePadding>
                    <NavLink
                        to={'/profile'}
                        className={(navData) => navData.isActive ? "active text-center px-3 py-2 flex flex-col items-center w-full gap-1" : "text-center px-3 py-2 flex flex-col items-center w-full gap-1"}>
                        <div
                            className={"glassmorphic rounded-3xl px-4 py-0.5"}>
                            <i className="fa-solid fa-user"></i>
                            <span className="absolute right-0 top-0 w-2 h-2 rounded-full"></span>
                        </div>
                        <ListItemText primary={'Profile'}/>
                    </NavLink>
                </ListItem>
                <ListItem disablePadding>
                    <NavLink
                        to={'/portals'}
                        className={(navData) => navData.isActive ? "active text-center px-3 py-2 flex flex-col items-center w-full gap-1" : "text-center px-3 py-2 flex flex-col items-center w-full gap-1"}>
                        <div
                            className={"glassmorphic rounded-3xl px-4 py-0.5"}>
                            <i className="fa-solid fa-folders"></i>
                            <span className="absolute right-0 top-0 w-2 h-2 rounded-full"></span>
                        </div>
                        <ListItemText primary={'Portals'}/>
                    </NavLink>
                </ListItem>
                {userInfo.role === "client" && userInfo.businessPortal &&
                    <>
                        <ListItem disablePadding>
                            <NavLink
                                to={'/partners'}
                                className={(navData) => navData.isActive ? "active text-center px-3 py-2 flex flex-col items-center w-full gap-1" : "text-center px-3 py-2 flex flex-col items-center w-full gap-1"}>
                                <div
                                    className={"glassmorphic rounded-3xl px-4 py-0.5"}>
                                    <i className="fa-solid fa-users"></i>
                                    <span className="absolute right-0 top-0 w-2 h-2 rounded-full"></span>
                                </div>
                                <ListItemText primary={'Partners'}/>
                            </NavLink>
                        </ListItem>
                    </>}
                {userInfo.role === "admin" &&
                    <>
                        <ListItem disablePadding>
                            <NavLink
                                to={'/clients'}
                                className={(navData) => navData.isActive ? "active text-center px-3 py-2 flex flex-col items-center w-full gap-1" : "text-center px-3 py-2 flex flex-col items-center w-full gap-1"}>
                                <div
                                    className={"glassmorphic rounded-3xl px-4 py-0.5"}>
                                    <i className="fa-solid fa-users"></i>
                                    <span className="absolute right-0 top-0 w-2 h-2 rounded-full"></span>
                                </div>
                                <ListItemText primary={'Clients'}/>
                            </NavLink>
                        </ListItem>
                        {/*<ListItem disablePadding>*/}
                        {/*    <NavLink*/}
                        {/*        to={'/clients'}*/}
                        {/*        className={(navData) => navData.isActive ? "active text-center px-3 py-2 flex flex-col items-center w-full gap-1" : "text-center px-3 py-2 flex flex-col items-center w-full gap-1"}>*/}
                        {/*        <div*/}
                        {/*            className={"glassmorphic rounded-3xl px-4 py-0.5"}>*/}
                        {/*            <i className="fa-solid fa-folders"></i>*/}
                        {/*            <span className="absolute right-0 top-0 w-2 h-2 rounded-full"></span>*/}
                        {/*        </div>*/}
                        {/*        <ListItemText primary={'Clients'}/>*/}
                        {/*    </NavLink>*/}
                        {/*</ListItem>*/}
                    </>
                }
            </List>
        </Drawer>
    )
        ;
};

export default Sidebar;
