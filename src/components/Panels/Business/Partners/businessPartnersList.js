import {
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow
} from "@mui/material";
import {useMemo, useContext, useState} from "react";
import {useDispatch} from "react-redux";
import BusinessPartnerItem from "./businessPartnerItem";
import TableLoader from "../../../UI/TableLoader";


const BusinessPartnersList = (props) => {
    const {list, isLoading, panelId, userId} = props;
    const {ids} = list;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(ids);
    const tableContent = ids?.length && ids.map(partnerId => <BusinessPartnerItem panelId={panelId} userId={userId}
                                                                                  key={partnerId}
                                                                                  businessPartnerId={partnerId}/>)
    return (
        // <Box sx={{height: 400, width: '100%'}}>
        //     <DataGrid
        //         rows={props.clients}
        //         columns={columns}
        //         pageSize={10}
        //         rowsPerPageOptions={[10]}
        //     />
        // </Box>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/*<TableCell>ID</TableCell>*/}
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? <TableLoader rowsNum={20} cellsNum={5}/> : tableContent}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default BusinessPartnersList;