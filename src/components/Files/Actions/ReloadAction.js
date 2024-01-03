import React from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import {Icon} from "@mui/material";
import {useGetFilesQuery} from "../../../store/file/fileActions";

function ReloadAction() {
    const location = useLocation();
    const currentPath = location.pathname;
    const {refetch} = useGetFilesQuery({path: currentPath})
    // Function to navigate home
    const handleReloadAction = () => {
        // Navigate to the new path
        refetch()
    };

    return (
        <Icon onClick={handleReloadAction} color={"primary"}
              baseClassName="far"
              className={'fa-sync-alt cursor-pointer'}/>
    );
}

export default ReloadAction;
