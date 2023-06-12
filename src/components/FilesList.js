import {DataGrid, GridHeader} from "@mui/x-data-grid";
import {Icon, MenuItem, Select, styled} from "@mui/material";
import {Box} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {
    uploadFile,
    downloadFile,
    // fetchFileData,
    fetchImgFileData,
    fetchTxtFileData, fetchPDFFileData, fetchExcelFileData, fetchFileData
} from "../store/portal/portal-actions";
import {useDispatch, useSelector} from "react-redux";
import {useContext} from "react";
import AuthContext from "../store/auth-context";
import {portalActions} from "../store/portal/portal-slice";

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}


const FilesList = (props) => {
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const {path, files} = props;
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 600,
            renderCell: (params) => (
                <div className={"flex justify-between"}>
                    {params.row.type === 1 &&
                        <Icon
                            sx={{color: 'primary.dark'}}
                            color={"primary"}
                            baseClassName="far"
                            fontSize={"small"}
                            className={"fa-folder cursor-pointer"}/>
                    }
                    {params.row.type === 0 && (params.row.extension === ".png" || params.row.extension === ".jpg") &&
                        <Icon
                            sx={{color: 'primary.dark'}}
                            color={"primary"}
                            baseClassName="far"
                            fontSize={"small"}
                            className={"fa-image-polaroid cursor-pointer"}/>
                    }
                    {params.row.type === 0 && params.row.extension === ".pdf" &&
                        <Icon
                            sx={{color: 'primary.dark'}}
                            color={"primary"}
                            baseClassName="far"
                            fontSize={"small"}
                            className={"fa-pdf cursor-pointer"}/>
                    }
                    {params.row.type === 0 && params.row.extension === ".txt" &&
                        <Icon
                            sx={{color: 'primary.dark'}}
                            color={"primary"}
                            baseClassName="far"
                            fontSize={"small"}
                            className={"fa-file-lines cursor-pointer"}/>
                    }
                    {params.row.type === 0 && (params.row.extension === ".docx" || params.row.extension === ".doc") &&
                        <Icon
                            sx={{color: 'primary.dark'}}
                            color={"primary"}
                            baseClassName="far"
                            fontSize={"small"}
                            className={"fa-file-word cursor-pointer"}/>
                    }
                    {params.row.type === 0 && (params.row.extension === ".xlsx" || params.row.extension === ".xls") &&
                        <Icon
                            sx={{color: 'primary.dark'}}
                            color={"primary"}
                            baseClassName="far"
                            fontSize={"small"}
                            className={"fa-file-word cursor-pointer"}/>
                    }
                    {params.row.type === 0 && params.row.extension === ".pdf" &&
                        <Icon
                            sx={{color: 'primary.dark'}}
                            color={"primary"}
                            baseClassName="far"
                            fontSize={"small"}
                            className={"fa-file-pdf cursor-pointer"}/>
                    }
                    {/*{console.log(params)}*/}
                    <span className={'underline text-primary cursor-pointer ml-4'}>{params.value}</span>
                </div>
            ),
        },
        {
            field: 'mtime',
            headerName: 'Date Modified',
            width: 250,
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 200,
            valueGetter: (params) =>
                `${params.row.type === 1 ? "Folder" : params.row.extension}`,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => {
                if (!params.row.type)
                    return <Select
                        value={'Under Review'}
                        // onChange={handleChange}
                        // displayEmpty
                        fullWidth
                        inputProps={{'aria-label': 'Under Review'}}
                    >
                        <MenuItem value="Under Review">
                            Under Review
                        </MenuItem>
                        <MenuItem value={10}>In Progress</MenuItem>
                        <MenuItem value={20}>Done</MenuItem>
                    </Select>
                else {
                    return '-'
                }
            },
        },
        {
            field: 'size',
            headerName: 'Size',
            width: 150,
            valueGetter: (params) =>
                formatBytes(params.row.size),
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                const onClick = (action, e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    const api = params.api;
                    const thisRow = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );
                    if (action === "download") {
                        dispatch(downloadFile({
                            path: path[path.length - 1].path + thisRow.name,
                            fileName: thisRow.name,
                            token
                        }))
                    }
                    console.log(thisRow)
                    if (action === "view") {
                        if (thisRow.type !== (".xlsx")) {
                            dispatch(fetchFileData({
                                path: path[path.length - 1].path + thisRow.name,
                                fileName: thisRow.name,
                                token
                            }));
                        }
                        if (thisRow.type === (".xlsx")) {
                            dispatch(fetchExcelFileData({
                                path: path[path.length - 1].path + thisRow.name,
                                fileName: thisRow.name,
                                token
                            }));
                        }
                        dispatch(portalActions.showFileViewer())
                        // dispatch(fetchFileData({
                        //     path: path[path.length - 1].path + thisRow.name,
                        //     fileName: thisRow.name,
                        //     format: thisRow.type,
                        //     token
                        // }));
                    }
                };
                return (<div className={"flex justify-between gap-6 items-center"}>
                    {params.row.type === 1 &&
                        <> - </>
                    }
                    {params.row.type === 0 &&
                        <>
                            <Icon
                                onClick={onClick.bind(this, 'view')}
                                sx={{color: 'primary.light'}}
                                color={"primary"}
                                baseClassName="far"
                                fontSize={"small"}
                                className={"fa-eye cursor-pointer"}/>
                            <Icon
                                onClick={onClick.bind(this, 'download')}
                                sx={{color: 'green'}}
                                color={"green"}
                                baseClassName="far"
                                fontSize={"small"}
                                className={"fa-down-to-bracket cursor-pointer"}/>
                            <Icon
                                onClick={onClick.bind(this, 'delete')}
                                sx={{color: 'red'}}
                                color={"red"}
                                baseClassName="far"
                                fontSize={"small"}
                                className={"fa-trash-can cursor-pointer"}/>
                        </>
                    }
                </div>)
            },
        },
    ];
    const navigate = useNavigate();
    const handleClick = (fileEl) => {
        if (fileEl.row.type === 1) {
            props.onChangePath(fileEl.row.name)
        }
    }
    return (
        <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                // classes={{paper:}}
                sx={{background: '#fdfdfd'}}
                // components={{Header:}}
                rows={props.files}
                columns={columns}
                pageSize={10}
                // checkboxSelection
                // onSelectionModelChange={(ids) => {
                //     const selectedIDs = new Set(ids);
                //     const selectedRows = props.files.filter((row) =>
                //         selectedIDs.has(row.id),
                //     );
                //     props.onSetSelectedRows(selectedRows);
                // }}
                // isRowSelectable={(params) => params.row.type === 0}
                rowsPerPageOptions={[10]}
                onRowDoubleClick={handleClick}
                // onCellClick={(x) => console.log(x)}
            />
        </Box>
    )
}

export default FilesList;