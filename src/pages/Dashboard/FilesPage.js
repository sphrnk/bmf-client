import Layout from "../../components/Layout/Dashboard/Layout";
import useHttp from "../../hooks/use-http";
import {getFiles} from "../../lib/api/files";
import DataTable from "../../components/DataTable/DataTable";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";


const FilesPage = () => {
    const authCtx = useContext(AuthContext);
    const {token, user} = authCtx;
    const [path, setPath] = useState('/');
    const {sendRequest: getFilesRequest, status: filesStatus, data: files, error: filesError} = useHttp(getFiles);
    let filesContent;
    const changePathHandler = (newPath) => {
        console.log(newPath);
        setPath((prevState) => prevState + newPath)
    }
    const columns = React.useMemo(() => [
        {
            field: 'name',
            headerName: 'File Name',
            width: 400,
            editable: true,
            renderCell: (params) => (
                <span className={'underline text-primary'}
                      onClick={changePathHandler(params.value)}>{params.value}</span>
            ),
        },
        {
            field: 'mtime',
            headerName: 'Date Modified',
            width: 200,
            editable: true,

        },
        {
            field: 'type',
            headerName: 'Type',
            width: 200,
            editable: true,
            valueGetter: (params) =>
                `${params.row.type === 1 ? "Folder" : params.row.extenstion}`,
        },
        {
            field: 'size',
            headerName: 'Size',
            sortable: false,
            width: 300,
        },
    ], [changePathHandler]);
    useEffect(() => {
        getFilesRequest({token, userId: user._id, path}).catch((e) => {
            console.log(e)
        })
    }, [getFilesRequest, path]);
    if (filesStatus === "pending") {
        filesContent = <LoadingSpinner/>
    }
    if (filesStatus === "completed" && files && !filesError) {
        files.data.files.map((file, i) => {
            file.id = i;
        })
        console.log(files.data.files);
        filesContent = <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                rows={files.data.files}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
        </Box>
    }
    if (filesStatus === "completed" && !files && filesError) {
        filesContent = <p className={"self-center"}>There is not any file, upload one!</p>
    }
    return (
        <>
            <Layout>
                <h1 className={"font-bold text-4xl mb-3"}>Files</h1>
                {filesContent}
            </Layout>
        </>);
}
export default FilesPage;