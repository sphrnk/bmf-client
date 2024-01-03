import {Breadcrumbs, Button, Typography, Link, Icon, TextField} from "@mui/material";
import {Form, Link as RouterLink, useLocation} from "react-router-dom";
import Modal from "../UI/Modal";
import CreatePanelForm from "../Forms/CreatePanelForm";
import {Fragment, useContext, useEffect, useRef, useState} from "react";
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
import {useCreateFolderMutation, useGetFilesQuery} from "../../store/file/fileActions";
import {uiActions} from "../../store/ui-slice";

const CreateFolder = (props) => {
    // const {isLoading, isSuccess, list} = props;
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

    const dispatch = useDispatch();
    const folderNameInputRef = useRef();
    const location = useLocation();
    const currentPath = location.pathname;

    const [createFolder, {isLoading, isSuccess, isError, error}] = useCreateFolderMutation();
    const {refetch} = useGetFilesQuery({path: currentPath})
    const openCreateFolderModal = () => {
        setShowCreateFolderModal(true);
    }

    const closeCreateFolderModal = () => {
        setShowCreateFolderModal(false);
    }

    const createFolderHandler = async () => {
        console.log('hiii')
        const folderName = folderNameInputRef.current.value;
        // dispatch(createFolder({token, userId: user._id, pathObj, folderName}));
        await createFolder({folderName, path: currentPath})
    }
    useEffect(() => {
        if (isSuccess) {
            // dispatch(portalActions.hideCreateFolderModal())
            setShowCreateFolderModal(false);
            refetch();
        }
        if (isError) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: error.data.message
            }))
        }
    }, [isSuccess, error, isError])

    return (
        <>

            <div className={'flex gap-6 items-center'}>
                <Icon onClick={openCreateFolderModal}
                      color={"primary"}
                      baseClassName="far"
                      className={"fa-folder-plus cursor-pointer"}/>
            </div>
            <Modal title={'Create Folder'}
                   open={showCreateFolderModal}>
                {/*<FirstTimeChangePasswordForm onConfirm={closeChangePasswordModalHandler}/>*/}
                <TextField fullWidth={true} inputRef={folderNameInputRef} label="Folder Name" variant="outlined"/>
                <div className={"flex justify-end items-center mt-4 gap-2"}>
                    <Button variant={'text'} onClick={closeCreateFolderModal}>Cancel</Button>
                    <Button onClick={createFolderHandler} variant={'contained'}>
                        {isLoading &&
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        }
                        Create Folder
                    </Button>
                </div>
            </Modal>

        </>
    )
}
export default CreateFolder;