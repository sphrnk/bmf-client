import {Backdrop, Button, CircularProgress} from "@mui/material";
import {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {portalActions} from "../../store/file/portal-slice";
import {uploadFile} from "../../store/file/portal-actions";

import AuthContext from "../../store/auth-context";
import {useGetFilesQuery, useUploadFileMutation} from "../../store/file/fileActions";
import {useLocation} from "react-router-dom";
import {uiActions} from "../../store/ui-slice";

const UploadFile = (props) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const fileInputRef = useRef();
    const dispatch = useDispatch()
    const [uploadFile, {isSuccess, isLoading, isError, error}] = useUploadFileMutation()
    const [showBackdrop, setShowBackdrop] = useState()
    const {refetch} = useGetFilesQuery({path: currentPath})
    const uploadFileButtonHandler = () => {
        console.log('hello')
        fileInputRef.current.click()
    }
    const handleDrop = async (files) => {
        const formData = new FormData();
        const file = files.target.files;
        formData.append('path', currentPath)
        for (let i = 0; i < file.length; i++) {
            // console.log(file);
            formData.append(`files`, file[i]);
        }
        // props.onUpload(files.target.files)
        await uploadFile(formData).unwrap();
    }
    useEffect(() => {
        if (isSuccess) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'File uploaded successfully!'
            }))
            refetch();
        }
        if (isError) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: error.data.message
            }))
        }
    }, [isSuccess, isError, error])
    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isLoading}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Button onClick={uploadFileButtonHandler} variant="contained" component="label"
                    startIcon={<i className="far fa-file-import me-2"></i>}>
                Upload Files
            </Button>
            <input onChange={handleDrop} ref={fileInputRef} multiple hidden
                   accept="image/*,.pdf,.txt,.docm,.docx,.xls,.xlsx,.xlsm" type="file"/>
        </>
    )
}
export default UploadFile;