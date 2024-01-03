import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import {Icon} from "@mui/material";
import {useDownloadFileQuery} from "../../../store/file/fileActions";
import AuthContext from "../../../store/auth-context";
import {downloadFile} from '../../../store/file/portal-actions';
import {useDispatch} from "react-redux";

function DownloadFileAction(props) {
    const {path, file} = props;

    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const {user, token} = authCtx
    const navigate = useNavigate();
    const location = useLocation();
    console.log('download:',user,token,path,file);
    // const [filePath, setFilePath] = useState(null); // State to hold the file ID
    // const {data, isFetching} = useDownloadFileQuery(filePath, {
    //     skip: filePath === null, // Skip the query unless filePath is set
    // });

    const handleDownloadFile = (filePath) => {
        dispatch(downloadFile({
            path,
            fileName: file.name,
            token
        }))
    };

    // useEffect(() => {
    //     if (!isFetching && data && filePath) {
    //         const url = window.URL.createObjectURL(new Blob([data]));
    //         console.log('url:', url);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', filename);
    //         document.body.appendChild(link);
    //         link.click();
    //         link.parentNode.removeChild(link);
    //         window.URL.revokeObjectURL(url);
    //         setFilePath(null); // Reset fileId after downloading
    //     }
    // }, [data, isFetching, filePath]);

    return (
        <Icon
            onClick={handleDownloadFile}
            sx={{color: 'green'}}
            color={"green"}
            baseClassName="far"
            fontSize={"small"}
            className={"fa-down-to-bracket cursor-pointer"}/>
    );
}

export default DownloadFileAction;
