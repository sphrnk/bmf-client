import Select from "../../Forms/UI/Select";
import InfoItem from "../../UI/InfoItem";

const BusinessPanelInformation = (props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            <InfoItem editable={true} title={"Company Name"} text={"Sepehr"}/>
            <InfoItem editable={true} title={"Company Type"} text={""}/>
            <InfoItem editable={true} title={"Company Email"} text={"Sepehrniki@gmail.com"}/>
            <InfoItem editable={true} title={"Company Phone Number"} text={"+1 654 7894565"}/>
            <InfoItem editable={true} title={"Company EIN Number"} text={"654321987"}/>
            <InfoItem editable={true} title={"Company UBI Number"} text={"123456987"}/>
            <div className="flex justify-between">
                <div className="flex items-baseline gap-2">
                    <input disabled={true} type="checkbox" name="citizen-ship" id="citizen-ship"/>
                    <label htmlFor="citizen-ship">USA Citizen:</label>
                </div>
                <div className="text-opacity-70 text-primary flex items-baseline justify-center gap-x-2">
                    <i className="fa-regular fa-pen-to-square"></i>
                    <span>Edit</span>
                </div>
            </div>
        </div>
    )
}
export default BusinessPanelInformation