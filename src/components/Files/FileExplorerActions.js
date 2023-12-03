import {Breadcrumbs, Button, Typography, Link, Icon, TextField} from "@mui/material";
import {Form, Link as RouterLink} from "react-router-dom";
import Modal from "../UI/Modal";
import CreatePanelForm from "../Forms/CreatePanelForm";
import {useContext, useRef, useState} from "react";
import UploadFileForm from "../Forms/UploadFileForm";
import filesList from "./FilesList";
import useHttp from "../../hooks/use-http";
import {downloadFile} from "../../lib/api/files";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notif from "../UI/Notif";
import AuthContext from "../../store/auth-context";
import FirstTimeChangePasswordForm from "../Forms/FirstTimeChangePasswordForm";
import {useDispatch, useSelector} from "react-redux";
import {createFolder, fetchFilesData, uploadFile} from "../../store/file/portal-actions";
import {portalActions} from "../../store/file/portal-slice";
import UploadFile from '../UploadFile'
import FilesList from "./FilesList";

const FileExplorerActions = (props) => {
    const {selectedRows} = props;
    const {pathObj, uploadFilePercentage} = useSelector((state) => state.portal)
    const showCreateFolderModal = useSelector((state) => state.portal.createFolderModal)
    const showMoveFileModal = useSelector((state) => state.portal.showMoveFileModal)
    const dispatch = useDispatch();
    console.log(uploadFilePercentage)
    const folderNameInputRef = useRef();
    console.log(pathObj)
    const lastPath = pathObj[pathObj.length - 1];
    const isUpOneLevelDisabled = lastPath.path === '/'
    console.log("selectedRows:", props.selectedRows)
    const isRowSelected = props.selectedRows.length === 1;
    const authCtx = useContext(AuthContext);
    const {userInfo: user, userToken: token} = useSelector((state) => state.auth)
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

    const openMoveFileModal = () => {
        if (!isRowSelected)
            return;
        dispatch(portalActions.showMoveFileModal())
    }
    const closeMoveFileModal = () => {
        dispatch(portalActions.hideMoveFileModal())
    }

    const createFolderHandler = () => {
        const folderName = folderNameInputRef.current.value;
        dispatch(createFolder({token, userId: user._id, pathObj, folderName}));
        // await createFolderRequest({token, userId: user._id, fullPath, folderName})
    }

    const actionHandler = async (action, path) => {
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
            console.log(path)
            dispatch(portalActions.selectPath(path))
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
                                return <Link key={i} onClick={actionHandler.bind(null, 'breedCrumb', path)}
                                             underline="hover" color="inherit">
                                    {path.name}
                                </Link>
                            }
                        }
                    )}
                </Breadcrumbs>
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
                    <Icon
                        sx={{color: isRowSelected ? 'primary.dark' : 'primary.light'}}
                        onClick={openMoveFileModal} sx={{color: 'primary.dark'}}
                        baseClassName="far"
                        className={isRowSelected ? "fa-up-down-left-right cursor-pointer" : " fa-up-down-left-right cursor-not-allowed opacity-50"}/>
                </div>
                <div className={'flex gap-6 items-center'}>
                    <Icon onClick={openCreateFolderModal}
                          sx={{color: 'primary.dark'}}
                          baseClassName="far"
                          className={"fa-folder-plus cursor-pointer"}/>
                    <Icon onClick={actionHandler.bind(null, 'download')}
                          sx={{color: isRowSelected ? 'primary.dark' : 'primary.light'}}
                          baseClassName="far"
                          className={isRowSelected ? "fa-cloud-download cursor-pointer" : "fa-cloud-download cursor-not-allowed opacity-50"}/>
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
            <Modal title={'Moving Files'}
                   open={showMoveFileModal}>
                <Typography variant={"h6"} component={"h6"}>
                    Selected Files:
                </Typography>
                <div className="grid grid-cols-2 gap-6">
                    {selectedRows.map((selected) =>
                        <div className={'border rounded px-4 py-2'}>
                            <Typography variant={"body2"} component={"span"}>
                                {selected.name}
                            </Typography>
                        </div>
                    )}
                </div>

                {/*<FirstTimeChangePasswordForm onConfirm={closeChangePasswordModalHandler}/>*/}
                <FilesList files={props.files} onChangePath={props.onChangePath}/>
                <div className={"flex justify-end items-center mt-4"}>
                    <Button variant={'text'} onClick={closeMoveFileModal}>Cancel</Button>
                    <Button variant={'contained'}>Move Files</Button>
                </div>
            </Modal>
        </>
    )
}
export default FileExplorerActions;