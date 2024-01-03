import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button, Checkbox, Icon, MenuItem, Select, Typography} from "@mui/material";
import {useGetFilesQuery} from "../../../store/file/fileActions";
import {deleteFile, downloadFile, fetchExcelFileData, fetchFileData} from "../../../store/file/portal-actions";
import {portalActions} from "../../../store/file/portal-slice";
import {useContext} from "react";
import AuthContext from "../../../store/auth-context";
import {useDispatch} from "react-redux";
import DownloadFileAction from "../FileActions/DownloadFileAction";
import DeleteFileAction from "../FileActions/DeleteFileAction";

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const FileItem = ({selection, fileId, isSelected, onClick}) => {
    const location = useLocation();
    const path = location.pathname
    const dispatch = useDispatch();
    const {file} = useGetFilesQuery({path},
        {
            selectFromResult: ({data}) => ({
                file: data?.entities[fileId]
            })
        }
    )
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    // console.log(`${path}${file.name}/`)
    const navigate = useNavigate();
    if (file) {
        const fileClickHandler = (action, e) => {
            if (action === "download") {
                dispatch(downloadFile({
                    path: file.filePath,
                    fileName: file.name,
                    token
                }))
            }
            if (action === "view") {
                if (file.type !== (".xlsx")) {
                    dispatch(fetchFileData({
                        path: file.filePath,
                        fileName: file.name,
                        token
                    }));
                }
                if (file.type === (".xlsx")) {
                    dispatch(fetchExcelFileData({
                        path: file.filePath,
                        fileName: file.name,
                        token
                    }));
                }
                dispatch(portalActions.showFileViewer())
                // dispatch(fetchFileData({
                //     path: file.filePath,
                //     fileName: file.name,
                //     format: file.type,
                //     token
                // }));
            }
            if (action === "delete") {
                dispatch(deleteFile({
                    pathObj: path,
                    path: file.filePath,
                    fileName: file.name,
                    token
                }));
            }
        };
        const changeCurrentPath = () => {
            if (!file.type) return;
            const newPath = `${path}/${file.name}`.replace(/\/{2,}/g, '/');
            navigate(newPath)
        }
        const selectFile = (event) => {
            console.log(event);
            console.log(event.target);
            if (event.target.className.includes('MuiBackdrop-root MuiBackdrop-invisible')) {
                return;
            }
            if (event.target.className.includes('MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters')) {
                return;
            }
            if (event.target.className.includes('MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters Mui-selected MuiMenuItem-root MuiMenuItem-gutters Mui-selected')) {
                return;
            }
            if (event.target.className.includes('far')) {
                return;
            }
            if (file.type || !selection) {
                return;
            }
            onClick(file.filePath)
        }
        const isItemSelected = isSelected(file.filePath);
        const labelId = `enhanced-table-checkbox-${fileId}`;
        // const handleEdit = () => navigate(`/files/${fileId}/update`)
        return (
            <TableRow
                hover
                onClick={selectFile}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                // key={row.id}
                selected={isItemSelected}
                sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
                onDoubleClick={changeCurrentPath}
            >
                {selection &&
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            disabled={file.type ? true : false}
                            checked={isItemSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                        />
                    </TableCell>
                }
                {/*<TableCell component="th" scope="row">{file.id}</TableCell>*/}
                <TableCell>
                    <div className={"flex gap-2"}>
                        {file.type === 1 &&
                            <Icon
                                // sx={{color: 'primary.dark'}}
                                color={"primary"}
                                baseClassName="far"
                                fontSize={"small"}
                                className={"fa-folder cursor-pointer"}/>
                        }
                        {file.type === 0 && (file.extension === ".png" || file.extension === ".jpg") &&
                            <Icon
                                // sx={{color: 'primary.dark'}}
                                color={"primary"}
                                baseClassName="far"
                                fontSize={"small"}
                                className={"fa-image-polaroid cursor-pointer"}/>
                        }
                        {file.type === 0 && file.extension === ".pdf" &&
                            <Icon
                                // sx={{color: 'primary.dark'}}
                                color={"primary"}
                                baseClassName="far"
                                fontSize={"small"}
                                className={"fa-pdf cursor-pointer"}/>
                        }
                        {file.type === 0 && file.extension === ".txt" &&
                            <Icon
                                // sx={{color: 'primary.dark'}}
                                color={"primary"}
                                baseClassName="far"
                                fontSize={"small"}
                                className={"fa-file-lines cursor-pointer"}/>
                        }
                        {file.type === 0 && (file.extension === ".docx" || file.extension === ".doc") &&
                            <Icon
                                // sx={{color: 'primary.dark'}}
                                color={"primary"}
                                baseClassName="far"
                                fontSize={"small"}
                                className={"fa-file-word cursor-pointer"}/>
                        }
                        {file.type === 0 && (file.extension === ".xlsx" || file.extension === ".xls") &&
                            <Icon
                                // sx={{color: 'primary.dark'}}
                                color={"primary"}
                                baseClassName="far"
                                fontSize={"small"}
                                className={"fa-file-word cursor-pointer"}/>
                        }
                        {file.type === 0 && file.extension === ".pdf" &&
                            <Icon
                                // sx={{color: 'primary.dark'}}
                                color={"primary"}
                                baseClassName="far"
                                fontSize={"small"}
                                className={"fa-file-pdf cursor-pointer"}/>
                        }
                        {/*{console.log(params)}*/}
                        <Typography variant={'body2'}
                                    className={'underline cursor-pointer ml-4'}>{file.name}</Typography>
                    </div>
                    {/*<Link className={'underline text-primary'}*/}
                    {/*      to={`/files/${fileId}`}>*/}

                    {/*</Link>*/}
                </TableCell>
                <TableCell>{file.mtime}</TableCell>
                <TableCell>{file.type ? "Folder" : `${file.extension}`}</TableCell>
                <TableCell>

                    {file.type ?
                        <span> - </span>
                        :

                        <Select
                            value={'Under Review'}
                            // onChange={handleChange}
                            // displayEmpty
                            data-actionable="false"
                            fullWidth
                            inputProps={{'aria-label': 'Under Review'}}
                        >
                            <MenuItem value="Under Review">
                                Under Review
                            </MenuItem>
                            <MenuItem value={10}>In Progress</MenuItem>
                            <MenuItem value={20}>Done</MenuItem>
                        </Select>
                    }
                </TableCell>
                <TableCell>{formatBytes(file.size)}</TableCell>
                <TableCell>{file.type ?
                    <span> - </span>
                    :
                    <div className={"flex gap-4"}>
                        <Icon
                            onClick={fileClickHandler.bind(this, 'view')}
                            sx={{color: 'primary.light'}}
                            color={"primary"}
                            baseClassName="far"
                            fontSize={"small"}
                            className={"fa-eye cursor-pointer"}/>
                        <DownloadFileAction path={file.filePath} file={file}/>
                        <DeleteFileAction file={file}/>
                        {/*<Icon*/}
                        {/*    onClick={fileClickHandler.bind(this, 'download')}*/}
                        {/*    sx={{color: 'green'}}*/}
                        {/*    color={"green"}*/}
                        {/*    baseClassName="far"*/}
                        {/*    fontSize={"small"}*/}
                        {/*    className={"fa-down-to-bracket cursor-pointer"}/>*/}
                        {/*<Icon*/}
                        {/*    onClick={fileClickHandler.bind(this, 'delete')}*/}
                        {/*    sx={{color: 'red'}}*/}
                        {/*    color={"red"}*/}
                        {/*    baseClassName="far"*/}
                        {/*    fontSize={"small"}*/}
                        {/*    className={"fa-trash-can cursor-pointer"}/>*/}
                    </div>
                }</TableCell>
            </TableRow>
        );
    }
}

export default FileItem;