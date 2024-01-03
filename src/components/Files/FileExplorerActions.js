import {Breadcrumbs, Button, Typography, Link, Icon, TextField} from "@mui/material";
import {Form, Link as RouterLink, useLocation} from "react-router-dom";
import Modal from "../UI/Modal";
import CreatePanelForm from "../Forms/CreatePanelForm";
import {Fragment, useContext, useRef, useState} from "react";
import UploadFileForm from "../Forms/UploadFileForm";
import filesList from "./Table/FilesList";
import useHttp from "../../hooks/use-http";
import {downloadFile} from "../../lib/api/files";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notif from "../UI/Notif";
import AuthContext from "../../store/auth-context";
import FirstTimeChangePasswordForm from "../Forms/FirstTimeChangePasswordForm";
import {useDispatch, useSelector} from "react-redux";
import {createFolder, fetchFilesData, uploadFile} from "../../store/file/portal-actions";
import {portalActions} from "../../store/file/portal-slice";
import UploadFile from './UploadFile'
import FilesList from "./Table/FilesList";
import StepBackAction from "./Actions/StepBackAction";
import GoHomeAction from "./Actions/HomeAction";
import ReloadAction from "./Actions/ReloadAction";
import MoveAction from "./Actions/MoveAction";
import CreateFolder from "./CreateFolder";

const FileExplorerActions = (props) => {
    const {isLoading, isSuccess, list} = props;
    const showCreateFolderModal = useSelector((state) => state.portal.createFolderModal)

    const dispatch = useDispatch();
    const folderNameInputRef = useRef();
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter((segment) => segment !== '');
    const currentPath = location.pathname;
    const {userInfo: user, userToken: token} = useSelector((state) => state.auth)
    const {_id: userId} = user;

    return (
        <>
            <div className={'mb-6'}>
                <Breadcrumbs aria-label="breadcrumb">
                    {pathSegments.map((segment, index, segments) => (
                        <div key={segment}>
                            {index === segments.length - 1 ? (
                                <Typography>{segment}</Typography>
                            ) : (
                                <Link underline={'hover'} component={RouterLink}
                                      to={`/${segments.slice(0, index + 1).join('/')}`}>
                                    {segment}
                                </Link>
                            )}
                        </div>
                    ))}
                </Breadcrumbs>

            </div>
            <nav className={'flex justify-between items-center  mb-6'}>
                <div className={'flex gap-6 items-center'}>
                    <StepBackAction/>
                    <GoHomeAction/>
                    <ReloadAction/>
                    <MoveAction/>
                </div>
                <div className={'flex gap-6 items-center'}>
                    <CreateFolder/>

                </div>
            </nav>
            {/*<Modal title={'Create Folder'}*/}
            {/*       open={showCreateFolderModal}>*/}
            {/*    /!*<FirstTimeChangePasswordForm onConfirm={closeChangePasswordModalHandler}/>*!/*/}
            {/*    <TextField fullWidth={true} inputRef={folderNameInputRef} label="Folder Name" variant="outlined"/>*/}
            {/*    <div className={"flex justify-end items-center mt-4"}>*/}
            {/*        <Button variant={'text'} onClick={closeCreateFolderModal}>Cancel</Button>*/}
            {/*        <Button onClick={createFolderHandler} variant={'contained'}>Create Folder</Button>*/}
            {/*    </div>*/}
            {/*</Modal>*/}

        </>
    )
}
export default FileExplorerActions;