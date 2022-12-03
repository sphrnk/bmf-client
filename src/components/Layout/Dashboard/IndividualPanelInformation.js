import Select from "../../Forms/UI/Select";
import InfoItem from "../../UI/InfoItem";

const IndividualPanelInformation = (props) => {
    return (
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
                <div className="text-opacity-70 text-primary flex items-baseline justify-center gap-x-2">
                    <i className="fa-regular fa-pen-to-square"></i>
                    <span>Edit</span>
                </div>
            </div>
        </div>
    )
}
export default IndividualPanelInformation