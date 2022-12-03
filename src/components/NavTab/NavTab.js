import Tabs from "./Tabs";
import {useState} from "react";
import TabContent from "./TabContent";
import Select from "../Forms/UI/Select";
import InfoItem from "../UI/InfoItem";
import IndividualPanelInformation from "../Layout/Dashboard/IndividualPanelInformation";

const NavTab = (props) => {

    return (
        <>
            <Tabs tabs={props.tabs} setTab={props.onSetTab}/>
            {props.children}
        </>
    )
}
export default NavTab;