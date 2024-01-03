import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {Button, Icon, Link} from "@mui/material";
import {
    useDeleteBusinessPartnerMutation,
    useGetBusinessPartnersQuery,
} from "../../../../store/panel/businessPartnersApiSlice";
import {useEffect} from "react";
import {uiActions} from "../../../../store/ui-slice";
import {useDispatch, useSelector} from "react-redux";

const BusinessPartnerItem = ({businessPartnerId, panelId, userId}) => {
    const navigate = useNavigate();
    const {businessPartner} = useGetBusinessPartnersQuery('businessPartnersList',
        {
            selectFromResult: ({data}) => ({
                businessPartner: data?.entities[businessPartnerId]
            })
        }
    )
    const dispatch = useDispatch();
    const {refetch} = useGetBusinessPartnersQuery('businessPartnersList')
    const [deleteBusinessPartner, {
        isLoading: isDeleteLoading,
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        error: deleteError
    }] = useDeleteBusinessPartnerMutation();
    useEffect(() => {
        if (isDeleteSuccess) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Business Partner deleted successfully'
            }))
        }
        refetch();
        if (isDeleteError) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: deleteError.data.message
            }))
        }
    }, [isDeleteError, isDeleteSuccess, deleteError])
    if (businessPartner) {
        console.log(businessPartner);

        const deleteBusinessPartnerHandler = async () => {
            await deleteBusinessPartner({userId, panelId, partnerId: businessPartnerId})
        }
        const updateBusinessPartnerHandler = () => {
            navigate(`/partners/${businessPartnerId}/update`)
        }
        return (
            <TableRow
                // key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                {/*<TableCell component="th" scope="row">{businessPartner.id}</TableCell>*/}
                <TableCell>
                    {/*<Link component={RouterLink}*/}
                    {/*      to={`/businessPartners/${businessPartnerId}`}>*/}
                    {businessPartner.lastName} {businessPartner.middleName} {businessPartner.firstName}
                    {/*</Link>*/}
                    {/*<Link className={'underline text-primary'}*/}
                    {/*      to={`/businessPartners/${businessPartnerId}`}>*/}
                    {/*    {businessPartner.lastName} {businessPartner.middleName} {businessPartner.firstName}*/}
                    {/*</Link>*/}
                </TableCell>
                <TableCell>{businessPartner.email}</TableCell>
                <TableCell>{businessPartner.phoneNumber}</TableCell>
                <TableCell>
                    <div className={'flex align-items-center gap-6'}>
                        <Icon
                            color={"error"}
                            onClick={deleteBusinessPartnerHandler}
                            baseClassName="fal cursor-pointer"
                            className={"fa-trash"}/>
                        <Icon
                            color={"info"}
                            onClick={updateBusinessPartnerHandler}
                            baseClassName="fal cursor-pointer"
                            className={"fa-edit"}/>
                    </div>
                </TableCell>
            </TableRow>
        );
    }
}

export default BusinessPartnerItem;