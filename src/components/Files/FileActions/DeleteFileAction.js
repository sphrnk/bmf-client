import React, {useEffect, useState} from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import {Icon} from "@mui/material";
import {useDeleteFileMutation, useGetFilesQuery} from "../../../store/file/fileActions";
import {uiActions} from "../../../store/ui-slice";
import {useDispatch} from "react-redux";

function DeleteFileAction(props) {
    const {file} = props;
    console.log(file);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname;
    console.log(file.filepath);
    const [deleteFile, {isLoading, isSuccess, isError}] = useDeleteFileMutation();
    const {refetch} = useGetFilesQuery({path: currentPath})
    const handleDeleteFile = async () => {
        try {
            // Use the deleteFile mutation hook to delete the file
            await deleteFile(file.filePath);
            // The cache will be updated automatically upon success
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'File deleted Successfully!'
            }))
            refetch();
        } catch (error) {
            // Handle error, e.g., show an error message or log the error
            dispatch(uiActions.showNotification({
                status: 'error',
                message: error
            }))
        }
    };

    return (
        <Icon
            onClick={handleDeleteFile}
            sx={{color: 'red'}}
            color={"red"}
            baseClassName="far"
            fontSize={"small"}
            className={"fa-trash-can cursor-pointer"}/>
    );
}

export default DeleteFileAction;
