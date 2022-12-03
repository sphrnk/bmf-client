import Layout from "../../components/Layout/Dashboard/Layout";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import {getPanels} from "../../lib/api/panels";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import Modal from "../../components/UI/Modal";
import CreatePanelForm from "../../components/Forms/CreatePanelForm";

const PanelsPage = () => {
    const authCtx = useContext(AuthContext);
    const [panelType, setPanelType] = useState("business");
    const [showCreatePanelModal, setShowCreatePanelModal] = useState(false);
    let columns;
    columns = [
        {
            field: 'companyName',
            headerName: 'Company Name',
            width: 200,
            editable: true,
            renderCell: (params) => (
                <Link className={'underline text-primary'} to={`/panels/${params.value}`}>{params.value}</Link>
            )
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
        },
    ];
    if (panelType === "individual") {
        columns = [
            {
                field: 'firstName',
                headerName: 'First name',
                width: 200,
                editable: true,
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
                type: 'email',
                width: 300,
                editable: true,
            },
            {
                field: 'phoneNumber',
                headerName: 'Phone number',
                sortable: false,
                width: 300,
            },
        ];
    }
    const {token, user} = authCtx;
    const toggleCreatePanelHandler = () => {
        setShowCreatePanelModal(prevState => !prevState)
    }
    const changePanelHandler = (e) => {
        setPanelType(e.target.value)
    }
    const {sendRequest: getPanelsRequest, status: panelStatus, data: panels, error: panelsError} = useHttp(getPanels);
    let panelsContent;
    useEffect(() => {
        getPanelsRequest({token, panelType})
    }, [getPanelsRequest, panelType]);
    if (panelStatus === "pending") {
        panelsContent = <LoadingSpinner/>
    }
    if (panelStatus === "completed" && panels && !panelsError) {
        panels.data.panels.forEach((panel, i) => {
            panel.id = i;
        })
        console.log(panels.data.panels);
        panelsContent = <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                rows={panels.data.panels}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
        </Box>
    }
    if (panelStatus === "completed" && panels.data.panels.length === 0) {
        panelsContent = <p className={"self-center"}>There is not any Panel, create one!</p>
    }
    return (
        <>
            <Layout>
                <div className="flex justify-between items-center gap-4 mb-4">
                    <h1 className={"font-bold text-4xl"}>Panels</h1>
                    <div className={"flex items-center gap-4"}>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="panel-type-label">Panel Type</InputLabel>
                            <Select
                                labelId="panel-type-label"
                                value={panelType}
                                label="Panel Type"
                                onChange={changePanelHandler}
                            >
                                <MenuItem value={'business'}>Business</MenuItem>
                                <MenuItem value={'individual'}>Individual</MenuItem>
                            </Select>
                        </FormControl>
                        <Button onClick={toggleCreatePanelHandler} variant="contained"
                                className={"bg-primary shadow-none w-36"}>Add Panel</Button>
                    </div>
                </div>
                {panelsContent}
                {showCreatePanelModal && <Modal title={"Create Panel"} onConfirm={toggleCreatePanelHandler}>
                    <CreatePanelForm onConfirm={toggleCreatePanelHandler}/>
                </Modal>}
            </Layout>
        </>
    );
};
export default PanelsPage;
