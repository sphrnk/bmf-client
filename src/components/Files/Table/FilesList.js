import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

import TableLoader from "../../UI/TableLoader";
import FileItem from "./FileItem";
import EnhancedFilesTableHead from "./EnhancedFilesTableHead";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {portalActions} from "../../../store/file/portal-slice";


function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const FilesList = (props) => {
    const {selection, isLoading, isSuccess, list} = props;

    const {selectedRows: selected} = useSelector((state) => state.portal);
    const dispatch = useDispatch();
    // const [order, setOrder] = useState('asc');
    // const [orderBy, setOrderBy] = useState('calories');
    // const [selected, setSelected] = useState([]);
    // const [page, setPage] = useState(0);
    // const [dense, setDense] = useState(false);
    // const [rowsPerPage, setRowsPerPage] = useState(5);

    // const handleSelectAllClick = (event) => {
    //     if (event.target.checked) {
    //         const newSelected = rows.map((n) => n.id);
    //         setSelected(newSelected);
    //         return;
    //     }
    //     setSelected([]);
    // };

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        dispatch(portalActions.setSelectedRows(newSelected))
        // setSelected(newSelected);
    };
    const isSelected = (id) => selected.indexOf(id) !== -1;
    let content = (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="file table">
                <EnhancedFilesTableHead
                    selection={selection}
                    // numSelected={selected.length}
                    // order={order}
                    // orderBy={orderBy}
                    // onSelectAllClick={handleSelectAllClick}
                    // onRequestSort={handleRequestSort}
                    // rowCount={rows.length}
                />
                <TableBody>
                    <TableLoader rowsNum={20} cellsNum={7}/>
                </TableBody>
            </Table>
        </TableContainer>
    );

    if (isSuccess) {
        const {ids} = list;
        const tableContent = ids?.length && ids.map(fileId => <FileItem isSelected={isSelected} selection={selection}
                                                                        onClick={handleClick}
                                                                        key={fileId}
                                                                        fileId={fileId}/>)
        content = (<TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <EnhancedFilesTableHead
                        selection={selection}
                        // numSelected={selected.length}
                        // order={order}
                        // orderBy={orderBy}
                        // onSelectAllClick={handleSelectAllClick}
                        // onRequestSort={handleRequestSort}
                        // rowCount={rows.length}
                    />
                    <TableBody>
                        {tableContent}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return content
}

export default FilesList;