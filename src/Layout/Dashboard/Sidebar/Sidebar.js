import {useContext} from "react";
import AuthContext from "../../../store/auth-context";
import {Link, NavLink} from "react-router-dom";
import {Divider, IconButton, List, ListItem, ListItemButton, ListItemText, styled} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../../store/ui-slice";
import MuiDrawer from '@mui/material/Drawer';

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(16)} + 1px)!important`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',

        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': {
                ...openedMixin(theme),
                background: theme.palette.primary.main,
                color: '#fff'
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': {
                ...closedMixin(theme),
                background: theme.palette.primary.main,
                color: '#fff'
            },

        }),
    }),
);

const Sidebar = (props) => {
    const authCtx = useContext(AuthContext);
    const {user} = authCtx;
    console.log(user.role);
    const {sidebarState} = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const handleDrawerClose = () => {
        dispatch(uiActions.hideSidebar());
    };
    return (
        <Drawer variant="permanent" open={sidebarState}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <i className="fa-solid fa-chevron-left text-white"></i>
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <NavLink
                        to={'/dashboard'}
                        className={(navData) => navData.isActive ? "active text-center px-3 py-2 flex flex-col items-center w-full gap-1" : "text-center px-3 py-2 flex flex-col items-center w-full gap-1"}>
                        <div
                            className={"glassmorphic rounded-3xl px-4 py-0.5"}>
                            <i className="fa-solid fa-house"></i>
                            <span className="absolute right-0 top-0 w-2 h-2 rounded-full"></span>
                        </div>
                        <ListItemText primary={'Dashboard'}/>
                    </NavLink>
                </ListItem>
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
                {user.role === "admin" &&
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
    );
};

export default Sidebar;
