import React, {useEffect, useRef} from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import {
    Alert,
    AlertTitle, Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
    Icon, Slide, TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {portalActions} from "../../store/file/portal-slice";
import {useGetFilesQuery, useRenameMutation} from "../../store/file/fileActions";
import {uiActions} from "../../store/ui-slice";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Rename() {
    const dispatch = useDispatch();
    const location = useLocation();
    console.log("salaaaaaammm")
    const currentPath = location.pathname;
    const showRenameAction = useSelector((state) => state.portal.showRenameAction)
    const {selectedRows: selectedFile} = useSelector((state) => state.portal)
    const fileName = selectedFile.length === 1 ? selectedFile[0].split('/').pop() : '';
    const folderPath = selectedFile.length === 1 && selectedFile[0].split('/').slice(0, -1).join('/');
    const cantRename = selectedFile.length !== 1
    const [renameFile, {isLoading, isSuccess, isError, error}] = useRenameMutation();
    const {refetch} = useGetFilesQuery({path: currentPath})
    const newNameInputRef = useRef();
    // Function to navigate home
    const cancelRenaming = () => {

        dispatch(portalActions.hideRenameAction())
        dispatch(portalActions.setSelectedRows([]))
        // open rename modal
    };

    const submitRename = async () => {
        if (cantRename) {
            return;
        }
        const file = {
            filePath: selectedFile,
            newName: `${folderPath}/${newNameInputRef.current.value}`,
        };

        await renameFile(file);
    }
    useEffect(() => {
        dispatch(portalActions.hideRenameAction())
        dispatch(portalActions.setSelectedRows([]))
        if (isSuccess) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Renamed Successfully!'
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
            {/*{showRenameAction &&*/}
            <Dialog
                open={showRenameAction}
                TransitionComponent={Transition}
                keepMounted
                fullWidth={true}
                onClose={cancelRenaming}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Rename File"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Box>
                            <Typography variant={"h6"} component={'h6'} fontWeight={'bold'}>Current Name:</Typography>
                            <Typography gutterBottom={true}>
                                {fileName}
                            </Typography>
                            <Divider/>
                            <Typography variant={"h6"} component={'h6'} fontWeight={'bold'} gutterBottom={true}>New
                                Name:</Typography>
                            <TextField required inputRef={newNameInputRef} variant={'outlined'} label={'New Name'}/>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelRenaming}>Disagree</Button>
                    <Button onClick={submitRename}>Agree</Button>
                </DialogActions>
            </Dialog>
            {/*}*/}
        </>
    );
}

export default Rename;
