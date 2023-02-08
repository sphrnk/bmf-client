import {useContext, useState} from "react";
import AuthContext from "../../store/auth-context";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";
import {Avatar, ListItemIcon, Menu, MenuItem} from "@mui/material";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch();
    const toggleSidebarHandler = () => {
        dispatch(uiActions.toggle());
    };
    const authCtx = useContext(AuthContext);
    const logoutHandler = () => {
        authCtx.logout();
    }
    return (
        <header className="h-20 py-4 px-3 z-10 sticky top-0 border-b bg-white">
            <div className="flex mx-auto justify-between items-center">
                <div className="bg-white flex justify-center w-20 mx-0.5" onClick={toggleSidebarHandler}>
                    <i className="fa-regular fa-bars text-2xl"></i>
                </div>
                <img
                    className="object-scale-down h-10 w-46"
                    src={process.env.PUBLIC_URL + `/images/logo/logo.png`}
                    alt=""
                />
                <div aria-controls={open ? 'account-menu' : undefined}
                     aria-haspopup="true"
                     aria-expanded={open ? 'true' : undefined} onClick={handleClick}
                     className="flex items-center rounded-full cursor-pointer w-12 h-12 border-primary border-2 overflow-hidden">
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
            </div>
        </header>
    );
};

export default Header;
