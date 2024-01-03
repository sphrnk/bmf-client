import {Button, FormControl, InputLabel, Link, MenuItem, Select, Typography} from "@mui/material";
import BusinessPartnersList from "../../../../../components/Panels/Business/Partners/businessPartnersList";
import {Link as RouterLink} from 'react-router-dom'
import {useGetBusinessPartnersQuery} from "../../../../../store/panel/businessPartnersApiSlice";
import {useEffect, useState} from "react";
import {uiActions} from "../../../../../store/ui-slice";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../../../../store/auth/authSlice";


const BusinessPartnersPage = () => {
    const user = useSelector(selectCurrentUser)
    const [businessPanel, setBusinessPanel] = useState(user.businessPortals[0]);
    const [businessPanelId, setBusinessPanelId] = useState(user.businessPortals[0].id);
    const {data: businessPartners, isLoading, isSuccess, isError, error} = useGetBusinessPartnersQuery({
        userId: user.id,
        panelId: businessPanelId
    }, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const dispatch = useDispatch();
    const handleBusinessPanelChange = (event) => {
        setBusinessPanel(event.target.value.companyName)
        setBusinessPanelId(event.target.value.id)
    }
    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                <Typography color={'primary'} variant={'h1'}>Business Partners</Typography>
                <Link component={RouterLink} to={'/partners/add'} underline={"none"}>
                    <Button className={'w-auto'} variant="contained">Add
                        Business Partner
                    </Button>
                </Link>
            </div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Business Panels</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={businessPanel}
                    label="Business Panels"
                    onChange={handleBusinessPanelChange}
                >
                    {user.businessPortals.map((businessPanel) =>
                        <MenuItem key={businessPanel.id}
                                  value={businessPanel}>{businessPanel.companyName}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <div className="h-8"></div>
            {isSuccess && <BusinessPartnersList panelId={businessPanelId} userId={user.id} isLoading={isLoading}
                                                list={businessPartners}/>}
            {/*{businessPartners?.length === 0 && <p>Nothing To Show</p>}*/}
        </>
    );
}
export default BusinessPartnersPage;