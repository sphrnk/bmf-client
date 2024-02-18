import React, {useEffect} from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import {Alert, AlertTitle, Button, Icon, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {portalActions} from "../../store/file/portal-slice";
import {useGetFilesQuery, useMoveFileMutation} from "../../store/file/fileActions";
import {uiActions} from "../../store/ui-slice";


function MoveFile() {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname;
    const showMoveFileAction = useSelector((state) => state.portal.showMoveFile)
    const {selectedRows: selectedFiles} = useSelector((state) => state.portal)
    const cantMove = selectedFiles.length === 0
    const [moveFile, {isLoading, isSuccess, isError, error}] = useMoveFileMutation();
    const {refetch} = useGetFilesQuery({path: currentPath})
    // Function to navigate home
    const cancelMovingFile = () => {

        dispatch(portalActions.hideMoveFileAction())
        dispatch(portalActions.setSelectedRows([]))
        // open the move modal
    };
    const submitMoveFile = async () => {
        if (cantMove) {
            return;
        }
        console.log("selected:", selectedFiles)
        let files = [];
        selectedFiles.forEach((selected) => {
            const filename = selected.split('/').pop();
            const file = {
                sourcePath: selected,
                destinationPath: `${currentPath}/${filename}`,
            }
            files.push(file)
        });

        await moveFile(files);
    }
    useEffect(() => {
        dispatch(portalActions.hideMoveFileAction())
        dispatch(portalActions.setSelectedRows([]))
        if (isSuccess) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Files moved Successfully!'
            }))

        } else if (isError) {

            dispatch(uiActions.showNotification({
                status: 'error',
                message: error,
            }))
        }
        refetch();
    }, [isSuccess, isError])
    return (
        <>
            {showMoveFileAction &&
                <Alert color={'primary'} severity="info">
                    <AlertTitle>Moving Files</AlertTitle>
                    <div className={'flex gap-2 flex-col w-full'}>
                        <Typography variant={'body2'}>
                            You have selected some files and trying to moving them, go your path and click
                            on paste button or you can cancel it with cancel button
                        </Typography>
                        <div className="flex gap-2 justify-end">
                            <Button variant={'text'} onClick={cancelMovingFile}>Cancel</Button>
                            <Button variant={'contained'} onClick={submitMoveFile}>Paste</Button>
                        </div>
                    </div>
                </Alert>
            }
        </>
    );
}

export default MoveFile;
