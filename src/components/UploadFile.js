import {Button} from "@mui/material";
import {useContext, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {portalActions} from "../store/portal/portal-slice";
import {uploadFile} from "../store/portal/portal-actions";

import AuthContext from "../store/auth-context";

const UploadFile = (props) => {
    const lastPath = useSelector((state) => state.portal.pathObj);
    const fileInputRef = useRef();
    const uploadFileButtonHandler = () => {
        fileInputRef.current.click()
    }
    const handleDrop = (files) => {
        props.onUpload(files.target.files)
    }
    return (
        <>
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