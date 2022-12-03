import Layout from "../../components/Layout/Dashboard/Layout";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import {getUser} from "../../lib/api/users";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {useParams} from "react-router-dom";
import User from "../../components/Layout/Dashboard/UserInformation";
import NavTab from "../../components/NavTab/NavTab";
import TabContent from "../../components/NavTab/TabContent";
import Select from "../../components/Forms/UI/Select";
import InfoItem from "../../components/UI/InfoItem";
import IndividualPanelInformation from "../../components/Layout/Dashboard/IndividualPanelInformation";
import {getPanel, getPanels} from "../../lib/api/panels";

const tabs = [
    {
        id: 1,
        icon: 'user-tie',
        text: 'Individual',
    },
    {
        id: 2,
        icon: 'briefcase',
        text: 'Business',
    }
]

const ClientPage = () => {
    const [individualPanels, setIndividualPanels] = useState([]);
    const [businessPanels, setBusinessPanels] = useState([]);
    const [panelType, setPanelType] = useState('individual');
    const [selectedPanel, setSelectedPanel] = useState();
    const [shownTab, setShownTab] = useState(`tab-${tabs[0].id}`);
    const setTabHandler = (tab) => {
        setShownTab(tab);
        if (tab === 'tab-1')
            setPanelType('individual');
        else if (tab === 'tab-2')
            setPanelType('business')
    }
    console.log(panelType);
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const {clientId} = useParams();
    const {sendRequest: getUserRequest, status: userStatus, data: userData, error: userError} = useHttp(getUser);
    const {sendRequest: getPanelRequest, status: panelStatus, data: panelData, error: panelError} = useHttp(getPanel);
    const {
        sendRequest: getPanelsRequest,
        status: panelsStatus,
        data: panelsData,
        error: panelsError
    } = useHttp(getPanels);
    let userContent;
    let panelsContent;
    useEffect(() => {
        getUserRequest({token, clientId})
        getPanelsRequest({token, clientId, panelType})
    }, [getUserRequest, getPanelsRequest]);
    if (userStatus === "pending") {
        userContent = <LoadingSpinner/>
    }
    if (userStatus === "completed" && userData && !userError) {
        userContent = <User user={userData.data.user}/>
    }
    if (userStatus === "completed" && userData.data.user.length === 0) {
        userContent = <p>There is not any user with this id</p>
    }
    if (panelsStatus === "pending") {
        panelsContent = <LoadingSpinner/>
    }
    if (panelsStatus === "completed" && panelsData.results !== 0 && !panelsError) {
        if (panelType === 'individual' && individualPanels.length === 0) {
            console.log("hi");
            panelsData.data.panels.forEach(panel => setIndividualPanels((prevState) => {
                return [
                    ...prevState,
                    {
                        text: panel.firstName + panel.middleName + panel.lastName,
                        id: panel._id
                    }
                ]
            }))
        } else if (panelType === "business" && businessPanels.length === 0) {
            panelsData.data.panels.forEach(panel => setBusinessPanels((prevState) => {
                    return [
                        ...prevState,
                        {
                            text: panel.companyName,
                            id: panel._id
                        }
                    ]
                })
            )
        }
    }
    console.log(panelsData)
    if (panelsStatus === "completed" && panelsData.data.panels.length === 0) {
        panelsContent = <p>There is not any panels for this user</p>
    }
    console.log(individualPanels)


    return (
        <>
            <Layout>
                <div className="flex flex-col gap-4">
                    <h1 className={"text-3xl font-bold mb-4"}>User Profile:</h1>
                    {userContent}
                </div>
                <div className="h-10"></div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">Panels:</h1>
                    <NavTab title={'Panels'} tabs={tabs} onSetTab={setTabHandler}>
                        <TabContent active={shownTab === "tab-1"}>
                            <Select object={'Panel'} options={individualPanels}/>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
                                <InfoItem editable={true} title={"First Name"} text={"Sepehr"}/>
                                <InfoItem editable={true} title={"Middle Name"} text={""}/>
                                <InfoItem editable={true} title={"Last Name"} text={"Niki"}/>
                                <InfoItem editable={true} title={"Email"} text={"Sepehrniki@gmail.com"}/>
                                <InfoItem editable={true} title={"Phone Number"} text={"+1 654 7894565"}/>
                                <div className="flex justify-between">
                                    <div className="flex items-baseline gap-2">
                                        <input disabled={true} type="checkbox" name="citizen-ship" id="citizen-ship"/>
                                        <label htmlFor="citizen-ship">USA Citizen:</label>
                                    </div>
                                    <div
                                        className="text-opacity-70 text-primary flex items-baseline justify-center gap-x-2">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                        <span>Edit</span>
                                    </div>
                                </div>
                            </div>
                        </TabContent>
                        {/*<TabContent active={shownTab === "tab-2"}>*/}
                        {/*    {panelsContent}*/}
                        {/*    <Select object={'Panel'} options={[{id: 1, text: 'Sepehr Niki'}]}*/}
                        {/*            onSubmit={(value) => setSelectedPanel(value)}/>*/}
                        {/*    <IndividualPanelInformation/>*/}
                        {/*</TabContent>*/}
                    </NavTab>
                </div>
            </Layout>
        </>
    )
}
export default ClientPage;