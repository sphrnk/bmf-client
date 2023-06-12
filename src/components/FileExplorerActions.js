import {Breadcrumbs, Button, Typography, Link, Icon, TextField} from "@mui/material";
import {Form, Link as RouterLink} from "react-router-dom";
import Modal from "./UI/Modal";
import CreatePanelForm from "./Forms/CreatePanelForm";
import {useContext, useRef, useState} from "react";
import UploadFileForm from "./Forms/UploadFileForm";
import filesList from "./FilesList";
import useHttp from "../hooks/use-http";
import {downloadFile} from "../lib/api/files";
import LoadingSpinner from "./UI/LoadingSpinner";
import Notif from "./UI/Notif";
import AuthContext from "../store/auth-context";
import FirstTimeChangePasswordForm from "./Forms/FirstTimeChangePasswordForm";
import {useDispatch, useSelector} from "react-redux";
import {createFolder, fetchFilesData, uploadFile} from "../store/portal/portal-actions";
import {portalActions} from "../store/portal/portal-slice";
import UploadFile from './UploadFile'

const FileExplorerActions = (props) => {
    const {pathObj, uploadFilePercentage} = useSelector((state) => state.portal)
    const showCreateFolderModal = useSelector((state) => state.portal.createFolderModal)
    const dispatch = useDispatch();
    console.log(uploadFilePercentage)
    const folderNameInputRef = useRef();
    console.log(pathObj)
    const lastPath = pathObj[pathObj.length - 1];
    const isUpOneLevelDisabled = lastPath.path === '/'
    console.log(props.selectedRows)
    const isRowSelected = props.selectedRows.length === 1;
    const authCtx = useContext(AuthContext);
    const {user, token} = authCtx
    const {_id: userId} = user;
    const uploadFileHandler = (files) => {
        console.log(files);
        dispatch(uploadFile({
            userId,
            token,
            files,
            pathObj
        }))
    }

    const openCreateFolderModal = () => {
        dispatch(portalActions.showCreateFolderModal())
    }
    const closeCreateFolderModal = () => {
        dispatch(portalActions.hideCreateFolderModal())
    }
    const createFolderHandler = () => {
        const folderName = folderNameInputRef.current.value;
        dispatch(createFolder({token, userId: user._id, pathObj, folderName}));
        // await createFolderRequest({token, userId: user._id, fullPath, folderName})
    }

    const actionHandler = async (action, id) => {
        if (action === 'up-one-level' && !isUpOneLevelDisabled) {
            // console.log(pathObj)
            // pathObj.pop();
            dispatch(portalActions.upOneLevel())
        }
        if (action === 'home' && !isUpOneLevelDisabled) {
            // console.log(pathObj)
            // pathObj.pop();
            dispatch(portalActions.homePage())
        }

        if (action === "delete" && isRowSelected) {
            props.onFilesAction("delete")
        }
        if (action === "download" && isRowSelected) {
            // await downloadFile({
            //     path: paths[paths.length - 1].path + props.selectedRows[0].name,
            //     fileName: props.selectedRows[0].name, token
            // })
        }

        if (action === "reload") {
            dispatch(fetchFilesData({token, userId: user._id, path: lastPath.path}))
        }

        if (action === "breedCrumb") {
            props.onFilesAction("breedCrumb", id);
        }
    }

    return (
        <>
            <div className={'flex gap-6 mb-6 items-center justify-between'}>
                <Breadcrumbs aria-label="breadcrumb">
                    {pathObj.map((path, i, arr) => {
                            if (arr.length - 1 === i) {
                                return <Typography key={i} color="text.primary">{path.name}</Typography>
                            } else {
                                return <Link key={i} onClick={actionHandler.bind(null, 'breedCrumb', path.id)}
                                             underline="hover" color="inherit">
                                    {path.name}
                                </Link>
                            }
                        }
                    )}
                </Breadcrumbs>
                {/*<Link component={RouterLink} to={'/files/upload'} state={pathObj} underline={"none"}>*/}
                {/*<Button onClick={uploadFileButtonHandler} variant="contained" component="label"*/}
                {/*        startIcon={<i className="far fa-file-import me-2"></i>}>*/}
                {/*    Upload Files*/}
                {/*</Button>*/}
                {/*<input ref={fileInputRef} hidden accept="image/*,.pdf" type="file"/>*/}
                {/*</Link>*/}
                <UploadFile onUpload={uploadFileHandler}/>
            </div>
            <nav className={'flex justify-between items-center  mb-6'}>
                <div className={'flex gap-6 items-center'}>
                    <Icon onClick={actionHandler.bind(null, 'up-one-level')}
                          sx={{color: isUpOneLevelDisabled ? 'primary.light' : 'primary.dark'}}
                          color={"primary"}
                          baseClassName="far"
                          className={isUpOneLevelDisabled ? 'fa-arrow-left cursor-not-allowed opacity-50 ' : "fa-arrow-left cursor-pointer"}/>
                    <Icon onClick={actionHandler.bind(null, 'home')} sx={{color: 'primary.dark'}}
                          baseClassName="far"
                          className="fa-home cursor-pointer"/>
                    <Icon onClick={actionHandler.bind(null, 'reload')} sx={{color: 'primary.dark'}}
                          baseClassName="far"
                          className="fa-sync-alt cursor-pointer"/>
                </div>
                <div className={'flex gap-6 items-center'}>
                    <Icon onClick={openCreateFolderModal}
                          sx={{color: 'primary.dark'}}
                          baseClassName="far"
                          className={"fa-folder-plus cursor-pointer"}/>
                    {/*<Icon onClick={actionHandler.bind(null, 'download')}*/}
                    {/*      sx={{color: isRowSelected ? 'primary.dark' : 'primary.light'}}*/}
                    {/*      baseClassName="far"*/}
                    {/*      className={isRowSelected ? "fa-cloud-download cursor-pointer" : "fa-cloud-download cursor-not-allowed opacity-50"}/>*/}
                    {/*<Icon onClick={actionHandler.bind(null, 'delete')}*/}
                    {/*      sx={{color: isRowSelected ? 'primary.dark' : 'primary.light'}}*/}
                    {/*      baseClassName="far"*/}
                    {/*      className={isRowSelected ? "fa-trash-alt cursor-pointer" : "fa-trash-alt cursor-not-allowed opacity-50"}/>*/}
                </div>
            </nav>
            <Modal title={'Create Folder'}
                   open={showCreateFolderModal}>
                {/*<FirstTimeChangePasswordForm onConfirm={closeChangePasswordModalHandler}/>*/}
                <TextField inputRef={folderNameInputRef} label="Folder Name" variant="outlined"/>
                <div className={"flex justify-end items-center mt-4"}>
                    <Button variant={'text'} onClick={closeCreateFolderModal}>Cancel</Button>
                    <Button onClick={createFolderHandler} variant={'contained'}>Create Folder</Button>
                </div>
            </Modal>
        </>
    )
}
export default FileExplorerActions;