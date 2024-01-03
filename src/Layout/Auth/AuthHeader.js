import {Link} from "react-router-dom";
import {AppBar, styled, useTheme} from "@mui/material";


const AuthHeader = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    return (
        <AppBar position="static" color={'primary'} enableColorOnDark className="px-8 py-5 border-b-2">
            <div className="container flex mx-auto justify-center items-center">
                <Link to={'/login'}>
                    <img
                        className="object-scale-down h-10 w-46"
                        src={window.location.origin + `/images/logo/logo-white.png`}
                        alt=""
                    />
                </Link>
            </div>
        </AppBar>
    );
};

export default AuthHeader;
