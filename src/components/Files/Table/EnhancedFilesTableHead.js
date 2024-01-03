import {
    Box,
    Checkbox,
    TableCell,
    TableHead,
    TableRow, TableSortLabel
} from "@mui/material";
import PropTypes from "prop-types";
import {visuallyHidden} from '@mui/utils';

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'mtime',
        numeric: false,
        disablePadding: false,
        label: 'Date Modified',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'size',
        numeric: false,
        disablePadding: false,
        label: 'Size',
    },
    {
        id: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'Actions',
    },
];


const EnhancedFilesTableHead = (props) => {
    const {selection, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };


    return (
        <TableHead>
            <TableRow>
                {selection &&
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            disabled={true}
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                }
                {/*<TableCell>ID</TableCell>*/}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default EnhancedFilesTableHead;

EnhancedFilesTableHead.propTypes = {
    // numSelected: PropTypes.number.isRequired,
    // onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    // order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    // orderBy: PropTypes.string.isRequired,
    // rowCount: PropTypes.number.isRequired,
};