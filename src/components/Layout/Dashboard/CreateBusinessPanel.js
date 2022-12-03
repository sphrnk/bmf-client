import useHttp from "../../../hooks/use-http";
import {useRef, useContext, useState, useEffect} from "react";
import {createPanel} from "../../../lib/api/panels";
import {validateZipCode} from "../../../lib/utils";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Notif from "../../UI/Notif";
import AuthContext from "../../../store/auth-context";

const CreateBusinessPanel = (props) => {
    console.log(props);
    const {sendRequest, status, data, error} = useHttp(createPanel);
    const {
        sendRequest: sendZipCodeRequest,
        status: zipCodeStatus,
        data: zipCodeData,
        error: zipCodeErr
    } = useHttp(validateZipCode);
    const [page, setPage] = useState(1);
    let reqStatus;
    const authCtx = useContext(AuthContext);
    const {token} = authCtx;
    const companyNameInputRef = useRef();
    const companyPhoneNumberInputRef = useRef();
    const companyEmailInputRef = useRef();
    const companyTypeSelectRef = useRef();
    const UBINumberInputRef = useRef();
    const EINNumberInputRef = useRef();
    const zipCodeInputRef = useRef();
    const aptInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();
    const zipCodeHandler = async () => {
        if (page === 2) {
            const enteredZipCode = zipCodeInputRef.current.value;
            // console.log(enteredZipCode);
            if (enteredZipCode.length === 5) {
                await sendZipCodeRequest({token, enteredZipCode});
            }
        }
    }
    if (zipCodeStatus === "completed" && zipCodeData && !zipCodeErr) {
        cityInputRef.current.value = zipCodeData.data.code[0];
        stateInputRef.current.value = zipCodeData.data.code[1];
    }
    const createPanelSubmitHandler = async (el) => {
        el.preventDefault();
        const selectedUser = props.user;
        const enteredCompanyEmail = companyEmailInputRef.current.value;
        const enteredCompanyPhoneNumber = companyPhoneNumberInputRef.current.value;
        const enteredCompanyName = companyNameInputRef.current.value;
        const enteredCompanyType = companyTypeSelectRef.current.value;
        const enteredUBINumber = UBINumberInputRef.current.value;
        const enteredEINNumber = EINNumberInputRef.current.value;
        const enteredZipCode = zipCodeInputRef.current.value;
        const enteredApt = aptInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredState = stateInputRef.current.value;
        await sendRequest({
            userId: selectedUser,
            companyEmail: enteredCompanyEmail,
            companyPhoneNumber: enteredCompanyPhoneNumber,
            companyName: enteredCompanyName,
            companyType: enteredCompanyType,
            UBINumber: enteredUBINumber,
            EINNumber: enteredEINNumber,
            partnersInformation: null,
            address: {
                apt: enteredApt,
                city: enteredCity,
                state: enteredState,
                zipCode: enteredZipCode
            },
            panelType: 'business',
            token,
        });
    };
    // console.log(data, error);
    if (status === "pending") {
        reqStatus = <LoadingSpinner/>
    }
    if (data) {
        // console.log(data);
        reqStatus = <Notif status={"success"}
                           text={"Panel Created Successfully!"}/>
    }
    if (status === "completed" && error) {
        reqStatus = <Notif status={"failed"} text={error}/>
    }
    return (
        <>
            <div
                className={page === 1 ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "grid grid-cols-1 lg:grid-cols-2 gap-4 hidden"}>
                <div className="flex flex-col gap-3">
                    <label htmlFor="company-name">Comapny Name</label>
                    <input
                        id="company-name"
                        name="company-name"
                        className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                        type="text"
                        placeholder=""
                        ref={companyNameInputRef}
                        required
                    />
                    {/*<small className="text-red-600">*some error*</small>*/}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="company-type">Company Type</label>
                    <select name="company-type"
                            className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                            id="company-type" ref={companyTypeSelectRef}>
                        <option value="sole proprietor">Sole Proprietor</option>
                        <option value="small business cooperation 1120S">Small Business Cooperation 1120S</option>
                        <option value="partnership 1065">Partnership 1065</option>
                        <option value="cooperation 1120">Cooperation 1120</option>
                        <option value="limited liability LLC">Limited Liability LLC</option>
                        <option value="non-profit organization 990">Non-profit Organization 990</option>
                    </select>
                    {/*<input*/}
                    {/*    id="middle-name"*/}
                    {/*    name="middle-name"*/}
                    {/*    className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"*/}
                    {/*    type="text"*/}
                    {/*    placeholder=""*/}
                    {/*    ref={middleNameInputRef}*/}
                    {/*/>*/}
                    {/*<small className="text-red-600">*some error*</small>*/}
                </div>
            </div>
            <div
                className={page === 1 ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "grid grid-cols-1 lg:grid-cols-2 gap-4 hidden"}>
                <div className="flex flex-col gap-3">
                    <label htmlFor="company-email">Company Email</label>
                    <input
                        id="company-email"
                        name="company-email"
                        className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                        type="email"
                        placeholder=""
                        ref={companyEmailInputRef}
                        required
                    />
                    {/*<small className="text-red-600">*some error*</small>*/}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="company-phone-number">Company Phone Number</label>
                    <input
                        id="company-phone-number"
                        name="company-phone-number"
                        className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                        type="text"
                        placeholder=""
                        ref={companyPhoneNumberInputRef}
                        required
                    />
                    {/*<small className="text-red-600">*some error*</small>*/}
                </div>


            </div>
            <div
                className={page === 1 ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "grid grid-cols-1 lg:grid-cols-2 gap-4 hidden"}>
                <div className="flex flex-col gap-3">
                    <label htmlFor="company-EIN-number">EIN Number</label>
                    <input
                        id="company-EIN-number"
                        name="company-EIN-number"
                        className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                        type="text"
                        placeholder=""
                        ref={EINNumberInputRef}
                        required
                    />
                    {/*<small className="text-red-600">*some error*</small>*/}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="UBI-number">UBI Number</label>
                    <input
                        id="UBI-number"
                        name="UBI-number"
                        className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                        type="text"
                        placeholder=""
                        ref={UBINumberInputRef}
                        required
                    />
                    {/*<small className="text-red-600">*some error*</small>*/}
                </div>


            </div>
            <div
                className={page === 2 ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "grid grid-cols-1 lg:grid-cols-2 gap-4 hidden"}>
                <div className="flex flex-col gap-3">
                    <label htmlFor="company-name">Zip Code</label>
                    <input
                        id="zip-code"
                        name="zip-code"
                        className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                        type="text"
                        placeholder=""
                        onKeyUp={zipCodeHandler}
                        ref={zipCodeInputRef}
                        required
                    />
                    {/*<small className="text-red-600">*some error*</small>*/}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="apt">Apt</label>
                    <input
                        id="apt"
                        name="apt"
                        className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                        type="text"
                        placeholder=""
                        ref={aptInputRef}
                        required
                    />
                    {/*<input*/}
                    {/*    id="middle-name"*/}
                    {/*    name="middle-name"*/}
                    {/*    className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"*/}
                    {/*    type="text"*/}
                    {/*    placeholder=""*/}
                    {/*    ref={middleNameInputRef}*/}
                    {/*/>*/}
                    {/*<small className="text-red-600">*some error*</small>*/}
                </div>

            </div>
            <div
                className={page === 2 ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "grid grid-cols-1 lg:grid-cols-2 gap-4 hidden"}>
                <div className="flex flex-col gap-3">
                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        name="city"
                        className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                        type="text"
                        placeholder=""
                        ref={cityInputRef}
                        disabled
                        required
                    />
                    {/*<small className="text-red-600">*some error*</small>*/}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="state">State</label>
                    <input
                        id="state"
                        name="state"
                        className="border-2 border-gray-200 py-1.5 px-2.5 rounded focus-visible:outline-none"
                        type="text"
                        placeholder=""
                        ref={stateInputRef}
                        disabled
                        required
                    />
                    {/*<small className="text-red-600">*some error*</small>*/}
                </div>


            </div>
            {reqStatus}
            {page === 1 && <div className="flex justify-end gap-3">
                <button
                    onClick={props.onConfirm}
                    type="button"
                    className="rounded border-primary border px-2.5 py-1.5 "
                    disabled={status === 'pending'}
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="rounded bg-primary px-2.5 py-1.5 text-white disabled:bg-primary-light"
                    onClick={() => {
                        setPage(2)
                    }}
                >
                    Next
                </button>
            </div>}
            {page === 2 && <div className="flex justify-end gap-3">
                <button
                    onClick={() => {
                        setPage(1)
                    }}
                    type="button"
                    className="rounded border-primary border px-2.5 py-1.5 "
                    disabled={status === 'pending'}
                >
                    Previous
                </button>

                <button
                    onClick={props.createPanel}
                    type="submit"
                    className="rounded bg-primary px-2.5 py-1.5 text-white disabled:bg-primary-light"
                    disabled={status === 'pending'}
                >
                    Create Account
                </button>
            </div>}

        </>
    );
};
export default CreateBusinessPanel;