import {useContext, useState} from "react";
import AuthContext from "../../store/auth-context";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";
import {AppBar, IconButton, ListItemIcon, Menu, MenuItem, styled, Toolbar, Typography} from "@mui/material";
import {logout} from "../../store/auth/authSlice";

const drawerWidth = 240;
const MuiAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, sidebarState}) => ({
    background: '#fff',
    color: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(sidebarState && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const {sidebarState} = useSelector((state) => state.ui);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch();
    const handleDrawerOpen = () => {
        dispatch(uiActions.showSidebar());
    };
    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
        <MuiAppBar position="fixed" sidebarState={sidebarState}>
            <Toolbar className={"justify-between"}>
                <div className={"items-center flex"}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <i className="fa-regular fa-bars text-2xl"></i>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        BMF Accounting Solutions
                    </Typography>
                </div>
                {/*<img*/}
                {/*    className="object-scale-down "*/}
                {/*    src={process.env.PUBLIC_URL + `/images/logo/logo.png`}*/}
                {/*    alt=""*/}
                {/*/>*/}
                <div aria-controls={open ? 'account-menu' : undefined}
                     aria-haspopup="true"
                     aria-expanded={open ? 'true' : undefined} onClick={handleClick}
                     className="flex items-center rounded-full cursor-pointer w-12 h-12 border-neutral-800 border-2 overflow-hidden">
                    <img
                        src={process.env.PUBLIC_URL + `/images/default-profile.png`}
                        className="object-fill"
                        alt=""
                    />
                </div>
                {/*<i className="fa-regular fa-angle-down"></i>*/}
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 8,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 18,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem onClick={logoutHandler}>
                        <ListItemIcon>
                            <i className="fa-regular fa-right-from-bracket"></i>
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </MuiAppBar>
    );
};

export default Header;
