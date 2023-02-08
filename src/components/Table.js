// import {Box} from "@mui/material";
// import {DataGrid} from "@mui/x-data-grid";
//
// const Table = () => {
//     return (
//         <Box sx={{height: 400, width: '100%'}}>
//             <DataGrid
//                 // classes={{paper:}}
//                 sx={{background: '#fff'}}
//                 // components={{Header:}}
//                 rows={props.rows}
//                 columns={props.columns}
//                 pageSize={10}
//                 checkboxSelection
//                 onSelectionModelChange={(ids) => {
//                     const selectedIDs = new Set(ids);
//                     const selectedRows = props.files.filter((row) =>
//                         selectedIDs.has(row.id),
//                     );
//                     props.onSetSelectedRows(selectedRows);
//                 }}
//                 isRowSelectable={(params) => params.row.type === 0}
//                 rowsPerPageOptions={[10]}
//                 onRowDoubleClick={props.handleClick}
//             />
//         </Box>
//     )
// }
// export default Table;