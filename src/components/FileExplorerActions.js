import {Breadcrumbs, Button, Typography, Link, Icon, TextField} from "@mui/material";
import {Form, Link as RouterLink} from "react-router-dom";
import Modal from "./UI/Modal";
import CreatePanelForm from "./Forms/CreatePanelForm";
import {useContext, useRef, useState} from "react";
import UploadFileForm from "./Forms/UploadFileForm";
import filesList from "./FilesList";
import useHttp from "../hooks/use-http";
import {downloadFile, uploadFile} from "../lib/api/files";
import LoadingSpinner from "./UI/LoadingSpinner";
import Notif from "./UI/Notif";
import AuthContext from "../store/auth-context";
import FirstTimeChangePasswordForm from "./Forms/FirstTimeChangePasswordForm";

const FileExplorerActions = (props) => {
    const paths = props.path


    const isUpOneLevelDisabled = paths.length === 1
    console.log(props.selectedRows)
    const isRowSelected = props.selectedRows.length === 1;
    const [selectedUser, setSelectedUser] = useState();
    const [selectedPanel, setSelectedPanel] = useState();
    const [panelType, setPanelType] = useState();
    const [fileList, setFileList] = useState([]);
    const [uploadFileModal, setShowUploadFileModal] = useState(false);
    const authCtx = useContext(AuthContext);
    const {token} = authCtx
    const {
        sendRequest: uploadFilesRequest,
        status: uploadFileStatus,
        data: uploadFileData,
        error: uploadFileError
    } = useHttp(uploadFile);
    let reqStatus;
    if (uploadFileStatus === "pending") {
        reqStatus = <LoadingSpinner/>
    }
    if (uploadFileStatus === "completed" && uploadFileData) {
        // console.log(uploadFileData);
        reqStatus = <Notif status={"success"}
                           text={"Account Created Successfully, if the email is correct user will get his information!"}/>
    }
    if (uploadFileStatus === "completed" && uploadFileError) {
        reqStatus = <Notif status={"fail"} text={uploadFileError}/>
    }
    const closeFileUploadModalHandler = () => {
        setShowUploadFileModal(false)
    }
    const openFileUploadModalHandler = () => {
        setShowUploadFileModal(true)
    }
    const changeFileHandler = (files) => {
        setFileList(files);
    }
    const changePanelHandler = (panel) => {
        console.log(panel)
        setSelectedPanel(panel.panel);
        setPanelType(panel.panelType);
    }
    const changeUserHandler = (user) => {
        setSelectedUser(user)
    }
    const uploadFileHandler = async () => {
        await uploadFilesRequest({fileList, userId: selectedUser, selectedPanel, panelType, token, paths})
    }
    const actionHandler = async (action, id) => {
        if (action === 'up-one-level' && !isUpOneLevelDisabled)
            props.onFilesAction("up-one-level")
        if (action === "delete" && isRowSelected) {
            props.onFilesAction("delete")
        }
        if (action === "download" && isRowSelected) {
            await downloadFile({
                path: paths[paths.length - 1].path + props.selectedRows[0].name,
                fileName: props.selectedRows[0].name, token
            })
        }
        if (action === "create-folder") {

            props.onFilesAction('create-folder')
        }
        if (action === "reload") {
            props.onFilesAction("reload")
        }

        if (action === "breedCrumb") {
            props.onFilesAction("breedCrumb", id);
        }
    }

    console.log(paths);
    return (
        <>
            <div className={'flex gap-6 mb-6 items-center justify-between'}>
                <Breadcrumbs aria-label="breadcrumb">
                    {paths.map((path, i, arr) => {
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
                <Link component={RouterLink} to={'/files/upload'} state={paths} underline={"none"}>
                    <Button variant="contained" component="label"
                            startIcon={<i className="far fa-file-import me-2"></i>}>
                        Upload Files
                        {/*<input hidden accept="image/*" multiple type="file"/>*/}
                    </Button>
                </Link>
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
                    <Icon onClick={actionHandler.bind(null, 'create-folder')}
                          sx={{color: 'primary.dark'}}
                          baseClassName="far"
                          className={"fa-folder-plus cursor-pointer"}/>
                    <Icon onClick={actionHandler.bind(null, 'download')}
                          sx={{color: isRowSelected ? 'primary.dark' : 'primary.light'}}
                          baseClassName="far"
                          className={isRowSelected ? "fa-cloud-download cursor-pointer" : "fa-cloud-download cursor-not-allowed opacity-50"}/>
                    <Icon onClick={actionHandler.bind(null, 'delete')}
                          sx={{color: isRowSelected ? 'primary.dark' : 'primary.light'}}
                          baseClassName="far"
                          className={isRowSelected ? "fa-trash-alt cursor-pointer" : "fa-trash-alt cursor-not-allowed opacity-50"}/>
                </div>

            </nav>
        </>
    )
}
export default FileExplorerActions;