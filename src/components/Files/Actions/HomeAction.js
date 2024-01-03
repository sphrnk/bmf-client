import React from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import {Icon} from "@mui/material";

function GoHomeAction() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const cantGoHome = currentPath === ('/portals' && '/portals/')
    // Function to navigate home
    const handleGoHome = () => {
        if (cantGoHome) return

        // Navigate to the new path
        navigate('/portals/');
    };

    return (
        <Icon onClick={handleGoHome} color={"primary"}
              baseClassName="far"
              className={cantGoHome ? "fa-home cursor-not-allowed opacity-50" : "fa-home cursor-pointer"}/>
    );
}

export default GoHomeAction;
