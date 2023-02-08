import {DataGrid, GridHeader} from "@mui/x-data-grid";
import {Icon, styled} from "@mui/material";
import {Box} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

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
        field: 'size',
        headerName: 'Size',
        width: 150,
        valueGetter: (params) =>
            formatBytes(params.row.size),
    },
];

const StyledGridHeader = styled(GridHeader)(
    ({theme, ownerState}) => ({
        background: theme.palette[ownerState.color].main,
        color: theme.palette[ownerState.color].contrastText,
    }),
);

function CustomColumnMenuComponent(props) {
    const {...other} = props;

}

const FilesList = (props) => {
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
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRows = props.files.filter((row) =>
                        selectedIDs.has(row.id),
                    );
                    props.onSetSelectedRows(selectedRows);
                }}
                isRowSelectable={(params) => params.row.type === 0}
                rowsPerPageOptions={[10]}
                onRowDoubleClick={handleClick}
            />
        </Box>
    )
}

export default FilesList;