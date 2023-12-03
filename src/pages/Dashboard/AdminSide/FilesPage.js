import useHttp from "../../../hooks/use-http";
// import {createFolder, getFiles} from "../../../lib/api/files";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../store/auth-context";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import FilesList from "../../../components/Files/FilesList";
import FileExplorerActions from "../../../components/Files/FileExplorerActions";
import Modal from "../../../components/UI/Modal";
import {Button, List, ListItem, ListItemAvatar, ListItemText, TextField} from "@mui/material";
import {useRef} from "react";
import {uiActions} from "../../../store/ui-slice";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilesData, createFolder} from "../../../store/file/portal-actions";
import {portalActions} from "../../../store/file/portal-slice";
import {fetchClientsData} from "../../../store/client/client-actions";
import ClientsList from "../../../components/Clients/ClientsList";
import FileViewer from "../../../components/FileViewer";

const FilesPage = () => {
    const {userInfo: user, userToken: token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const files = useSelector((state) => state.portal.files)
    console.log(files)
    const pathObj = useSelector((state) => state.portal.pathObj)
    const [selectedRows, setSelectedRows] = useState([]);
    const lastPath = pathObj[pathObj.length - 1];
    useEffect(() => {
        dispatch(fetchFilesData({token, userId: user._id, path: lastPath.path}));
        console.log("done")
    }, [token, lastPath, user]);

    const changePathHandler = (path) => {
        console.log(path);
        dispatch(portalActions.changePath({path}))
    }
    return (
        <>
            <h1 className={"font-bold text-4xl mb-3"}>Portals</h1>
            <FileExplorerActions files={files} onChangePath={changePathHandler} selectedRows={selectedRows}/>
            {files.length === 0 &&
                <p>Nothing To Show!</p>
            }
            {/*{clients.length > 0 && lastPath.path === '/' &&*/}
            {/*    <ClientsList clients={clients} onChangePath={changePathHandler}/>*/}
            {/*}*/}
            {files.length > 0 &&
                <FilesList files={files} onChangePath={changePathHandler}
                           onSetSelectedRows={(params) => setSelectedRows(params)}/>
            }
            {/*<FileViewer*/}
            {/*    fileType={"xlsx"}*/}
            {/*    filePath={"http://localhost:8443/Data_Center/Sepehr.xlsx"}*/}
            {/*    // errorComponent={CustomErrorComponent}*/}
            {/*    // onError={this.onError}/>*/}
            {/*    />*/}
            <FileViewer/>
        </>);
}
export default FilesPage;