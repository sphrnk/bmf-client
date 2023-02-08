import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import React from "react";

const columns = [
    {
        field: 'name',
        headerName: 'Name',
        width: 400,
        editable: true,
        valueGetter: (params) =>
            `${params.row.firstName} ${params.row.middleName} ${params.row.lastName} `,
        renderCell: (params) => (
            <Link to={`/account-requests/${params.row._id}`}
                  className={'underline text-primary'}>{params.value}</Link>
        ),
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: true,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone',
        width: 200,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 200,
        renderCell: (params) => (
            new Date(params.value).toLocaleDateString("en-US")
        )
    },
]
const AccountRequestList = (props) => {

    return (
        <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                rows={props.accountRequests}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
        </Box>
    )
}
export default AccountRequestList;