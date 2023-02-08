import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const columns = [
    {
        field: 'email',
        headerName: 'Email',
        width: 300,
        editable: true,
        renderCell: (params) => (
            <Link className={'underline text-primary'}
                  to={`/clients/${params.row._id}`}>{params.value}</Link>
        )
    },
    {
        field: 'firstName',
        headerName: 'First Name',
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
        headerName: 'Last Name',
        width: 200,
        editable: true,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        sortable: false,
        width: 300,
    },
];
const ClientsList = (props) => {
    return (
        <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                rows={props.clients}
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
export default ClientsList;