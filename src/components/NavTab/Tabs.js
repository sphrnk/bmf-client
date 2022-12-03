import Tab from './Tab'
import {useState} from "react";

const Tabs = (props) => {
    const [activeTab, setActiveTab] = useState(`tab-${props.tabs[0].id}`);
    const changeTabHandler = (id) => {
        setActiveTab(`tab-${id}`)
        props.setTab(`tab-${id}`);
    }
    return (
        <nav className="border-b-2 border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                {props.tabs.map((tab) => <Tab active={activeTab === `tab-${tab.id}`} key={tab.id}
                                              id={tab.id} icon={tab.icon}
                                              onClick={changeTabHandler} text={tab.text}/>)}
                {/*<li>*/}
                {/*    <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>*/}
                {/*</li>*/}
            </ul>
        </nav>
    )
}
export default Tabs;