import UploadFileForm from "../../../components/Forms/UploadFileForm";
import {useState, useEffect, useContext} from "react";
import {Button, Link} from "@mui/material";
import useHttp from "../../../hooks/use-http";
import {uploadFile} from "../../../lib/api/files";
import AuthContext from "../../../store/auth-context";
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import {uiActions} from "../../../store/ui-slice";
import {useDispatch} from "react-redux";

const UploadFilesPage = (props) => {
    const location = useLocation();
    const [fileList, setFileList] = useState([]);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token, user} = authCtx;
    const {_id: userId} = user;
    const {
        sendRequest: uploadFilesRequest,
        data: uploadFileData,
    } = useHttp(uploadFile);
    const changeFileHandler = (files) => {
        setFileList(files);
    }
    const uploadFilesHandler = async () => {
        dispatch(uiActions.showNotification({
            status: 'success',
            message: 'the files are uploading, please wait and do not exit the page'
        }))
        await uploadFilesRequest({
            fileList,
            userId,
            token,
            path: location.state[location.state.length - 1].path
        })
    }
    useEffect(() => {
        if (uploadFileData) {
            if (uploadFileData.status === 'success') {
                dispatch(uiActions.showNotification({
                    status: 'success',
                    message: 'Files uploaded Successfully'
                }))
                navigate('/files');
            }

        }
    })
    return (
        <>
            <UploadFileForm onChangeFile={changeFileHandler}/>
            <div className="flex gap-4 justify-end p-4 border-t fixed bottom-0 w-full right-0 bg-white">
                <Link component={RouterLink} to={'/files'} underline={"none"}>
                    <Button variant="text">
                        Cancel
                        {/*<input hidden accept="image/*" multiple type="file"/>*/}
                    </Button>
                </Link>
                <Button onClick={uploadFilesHandler} variant={"contained"}>
                    Upload
                </Button>
            </div>
        </>
    )

}
export default UploadFilesPage