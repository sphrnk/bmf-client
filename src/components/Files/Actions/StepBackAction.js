import React from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import {Icon} from "@mui/material";

function StepBackAction() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const cantGoBack = currentPath === ('/portals' && '/portals/')
    // Function to remove the last part of the path and navigate
    const handleRemoveLastPart = () => {
        if (cantGoBack) return
        // Get the current path
        // const currentPath = location.pathname;

        // Split the path into segments
        const pathSegments = currentPath.split('/');

        // Remove the last segment (last-part)
        pathSegments.pop();

        // Join the segments back into a new path
        const newPath = pathSegments.join('/');

        // Navigate to the new path
        navigate(newPath);
    };

    return (
        <Icon onClick={handleRemoveLastPart}
              color={"primary"}
              baseClassName="far"
              className={cantGoBack ? 'fa-arrow-left cursor-not-allowed opacity-50 ' : "fa-arrow-left cursor-pointer"}/>
    );
}

export default StepBackAction;
