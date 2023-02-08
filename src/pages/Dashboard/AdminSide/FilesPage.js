import useHttp from "../../../hooks/use-http";
import {createFolder, getFiles} from "../../../lib/api/files";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../store/auth-context";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import FilesList from "../../../components/FilesList";
import FileExplorerActions from "../../../components/FileExplorerActions";
import Modal from "../../../components/UI/Modal";
import {Button, TextField} from "@mui/material";
import {useRef} from "react";
import {uiActions} from "../../../store/ui-slice";
import {useDispatch} from "react-redux";


const FilesPage = () => {
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const [createFolderModal, setCreateFolderModal] = useState(false)
    const dispatch = useDispatch();
    const folderNameInputRef = useRef();
    const closeCreateFolderModal = () => {
        setCreateFolderModal(false)
    }
    const openCreateFolderModalHandler = () => {
        setCreateFolderModal(true)
    }
    const [pathObj, setPath] = useState([{
        id: 0,
        name: 'Explorer',
        path: '/'
    }]);
    const [selectedRows, setSelectedRows] = useState([]);
    const {path} = pathObj[pathObj.length - 1];
    const {sendRequest: getFilesRequest, status: filesStatus, data: files, error: filesError} = useHttp(getFiles);
    const {
        sendRequest: createFolderRequest,
        status: createFolderStatus,
        data: newFolder,
        error: createFolderError
    } = useHttp(createFolder);
    let filesContent;
    useEffect(() => {
        getFilesRequest({token, userId: user._id, path}).catch((e) => {
            console.log(e)
        })
    }, [getFilesRequest, pathObj, token, user._id]);
    const changePathHandler = (pathObj) => {
        setPath((prevState) => {
                // console.log(prevState.path)
                return [
                    ...prevState,
                    {
                        id: prevState[prevState.length - 1].id + 1,
                        name: pathObj,
                        path: prevState[prevState.length - 1].path + pathObj + '/'
                    }
                ]
            }
        )
    }
    if (filesStatus === "pending") {
        filesContent = <LoadingSpinner/>
    }
    if (filesStatus === "completed" && files && !filesError) {
        files.data.files.map((file, i) => {
            file.id = i;
        })
        console.log(files.data.files);
        filesContent = <FilesList files={files.data.files} onChangePath={changePathHandler}
                                  onSetSelectedRows={(params) => setSelectedRows(params)}/>
    }
    if (filesStatus === "completed" && !files && filesError) {
        filesContent = <p className={"self-center"}>There is not any file, upload one!</p>
    }
    console.log(pathObj);
    const filesActionHandler = async (action, id) => {
        console.log(action, id)
        if (action === "create-folder") {
            setCreateFolderModal(true);
        }
        if (action === "reload") {
            await getFilesRequest({token, userId: user._id, path}).catch((e) => {
                console.log(e)
            })
        }
        if (action === "home") {
            setPath([{
                name: 'Explorer',
                path: '/'
            }])
        }
        if (action === 'breedCrumb') {
            const newPaths = pathObj.filter((path) => path.id <= id);
            setPath(newPaths);
        }
        if (action === 'up-one-level') {
            setPath((prevState) => {
                console.log(prevState);
                const lastPath = prevState[prevState.length - 1];
                return prevState.filter(path => path !== lastPath)
            })
        }
    }
    const createFolderHandler = async () => {
        const folderName = folderNameInputRef.current.value;
        await createFolderRequest({token, userId: user._id, path, folderName})
    }
    useEffect(() => {
        if (createFolderStatus === "completed" && newFolder) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Folder Created Successfully!'
            }))
            setCreateFolderModal(false)
        }
    },[createFolderStatus,newFolder])

    return (
        <>
            <h1 className={"font-bold text-4xl mb-3"}>Portals</h1>
            <FileExplorerActions onFilesAction={filesActionHandler} path={pathObj} selectedRows={selectedRows}/>
            {filesContent}
            <Modal title={'Create Folder'}
                   open={createFolderModal}>
                {/*<FirstTimeChangePasswordForm onConfirm={closeChangePasswordModalHandler}/>*/}
                <TextField inputRef={folderNameInputRef} label="Folder Name" variant="outlined"/>
                <div className={"flex justify-end items-center mt-4"}>
                    <Button variant={'text'} onClick={closeCreateFolderModal}>Cancel</Button>
                    <Button onClick={createFolderHandler} variant={'contained'}>Create Folder</Button>
                </div>
            </Modal>
        </>);
}
export default FilesPage;