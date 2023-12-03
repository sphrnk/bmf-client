import {Skeleton, TableCell, TableRow} from "@mui/material";

const TableRowsLoader = ({rowsNum, cellsNum}) => {
    return [...Array(rowsNum)].map((row, index) => (
        <TableRow key={index}>
            {[...Array(cellsNum)].map((cell, index) => (
                <TableCell component="th" scope="row">
                    <Skeleton animation="wave" variant="text"/>
                </TableCell>
            ))}
        </TableRow>
    ));
};

export default TableRowsLoader;