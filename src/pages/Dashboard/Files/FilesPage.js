import FilesList from "../../../components/Files/Table/FilesList";
import FileExplorerActions from "../../../components/Files/FileExplorerActions";
import {Typography} from "@mui/material"
import FileViewer from "../../../components/FileViewer";
import {useGetFilesQuery} from "../../../store/file/fileActions";
import {useLocation} from "react-router-dom";
import UploadFile from "../../../components/Files/UploadFile";
import MoveFile from "../../../components/Files/MoveFile";
import {useEffect} from "react";
import {uiActions} from "../../../store/ui-slice";
import {useDispatch} from "react-redux";

const FilesPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const path = location.pathname
    const {data: files, isLoading, isSuccess, isError, error} = useGetFilesQuery({path}, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    useEffect(() => {
        console.log(error);
        if (isError) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: error.data.message
            }))
        }
    }, [isError, error])

    return (
        <>
            <div className={'flex flex-col gap-6 sm:flex-row sm:items-center mb-6 justify-between'}>
                <Typography color={'primary'} variant={'h1'}>Portals</Typography>
                <UploadFile/>
            </div>
            {!isError &&
                <FileExplorerActions isLoading={isLoading} isSuccess={isSuccess} selection={true} list={files}/>
            }
            {/*//TODO when the files length is 0 show nothing*/}
            {isSuccess && files.length === 0 &&
                <p>Nothing To Show!</p>
            }
            <MoveFile/>

            <FilesList isLoading={isLoading} isSuccess={isSuccess} selection={true} list={files}/>
            <FileViewer/>
        </>);
}
export default FilesPage;