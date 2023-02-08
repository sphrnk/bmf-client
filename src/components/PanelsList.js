import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";

const PanelsList = (props) => {
    let columns;
    columns = [
        {
            field: 'companyName',
            headerName: 'Company Name',
            width: 200,
            editable: true,

        },
        {
            field: 'companyEmail',
            headerName: 'Company Email',
            width: 200,
            editable: true,
        },
        {
            field: 'companyPhoneNumber',
            headerName: 'Phone Number',
            width: 300,
            editable: true,
        },
        {
            field: 'companyType',
            headerName: 'Company Type',
            width: 300,
        },
        {
            field: 'userEmail',
            headerName: 'For',
            width: 300,
            valueGetter: (params) =>
                `${params.row.user.email}`,
            renderCell: (params) => (
                <Link className={'underline text-primary'}
                      to={`/clients/${params.row.user._id}`}>{params.value}</Link>
            )
        },
    ];
    if (props.panelType === "individual") {
        columns = [
            {
                field: 'firstName',
                headerName: 'First name',
                width: 200,
                editable: true,
            },
            {
                field: 'middleName',
                headerName: 'Middle Name',
                width: 200,
                editable: true,
                valueGetter: (params) =>
                    params.value === "" ? "-" : params.row.middleName,
            },
            {
                field: 'lastName',
                headerName: 'Last name',
                width: 200,
                editable: true,
            },
            {
                field: 'email',
                headerName: 'Email',
                type: 'string',
                width: 300,
                editable: true,
            },
            {
                field: 'phoneNumber',
                headerName: 'Phone number',
                sortable: false,
                width: 250,
            },
            {
                field: 'userEmail',
                headerName: 'For',
                width: 300,
                valueGetter: (params) =>
                    `${params.row.user.email}`,
                renderCell: (params) => (
                    <Link className={'underline text-primary'}
                          to={`/clients/${params.row.user._id}`}>{params.value}</Link>
                )
            },
        ];
    }
    return (
        <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                rows={props.panels}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                // checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
        </Box>
    )
}

export default PanelsList;