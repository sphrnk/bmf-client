import {useContext, useState} from "react";
import AuthContext from "../../store/auth-context";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";
import {
    AppBar,
    Icon,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {logout} from "../../store/auth/authSlice";
import React from "react";

const drawerWidth = 240;
const MuiAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, sidebarState}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(sidebarState && {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const Header = ({toggleTheme}) => {
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

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    return (
        <MuiAppBar position="fixed" sidebarState={sidebarState} color={'primary'} enableColorOnDark>
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
                <div className={'flex justify-center items-center gap-4'}>
                    <Icon onClick={toggleTheme}
                          baseClassName="fat"
                          className={isDarkMode ? "text-white fa-moon cursor-pointer" : "text-white fa-sharp fa-thin fa-sun-bright cursor-pointer"}/>
                    {/*<div></div>*/}
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
                </div>
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
