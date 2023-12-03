import {useDispatch, useSelector} from "react-redux";
import {portalActions} from "../store/file/portal-slice.js";
import DocViewer, {DocViewerRenderers} from "@cyntler/react-doc-viewer";

import {
    AppBar,
    Button,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {useState} from "react";

const FileViewer = (props) => {
    const open = useSelector((state) => state.portal.isFileViewerOpen)
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        dispatch(portalActions.showFileViewer())
    };
    const handleClose = () => {
        dispatch(portalActions.hideFileViewer())
        dispatch(portalActions.removeAllFiles())
    };

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    const file = useSelector((state) => state.portal.file)
    const ExcelFile = useSelector((state) => state.portal.excelFile)
    const docs = [
        {uri: file}, // Remote file
    ];
    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                // TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>

                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            BMF File Viewer
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <i className="fa-regular fa-close"></i>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {file !== null &&
                    // <img src={blobImg}/>
                    <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}/>
                }
                {/*{ExcelFile &&*/}
                {/*    <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}/>*/}
                {/*}*/}


            </Dialog>
        </>
    )
}
export default FileViewer
