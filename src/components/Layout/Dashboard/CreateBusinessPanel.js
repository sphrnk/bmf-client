import useHttp from "../../../hooks/use-http";
import React, {useRef, useContext, useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {createPanel} from "../../../lib/api/panels";
import {validateZipCode} from "../../../lib/utils";
import {IMaskInput} from 'react-imask';
import LoadingSpinner from "../../UI/LoadingSpinner";
import Notif from "../../UI/Notif";
import AuthContext from "../../../store/auth-context";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";


const phoneTextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="(#00) 000-0000"
            definitions={{
                '#': /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

const einTextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="00-0000000"
            definitions={{
                '#': /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

const ubiTextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="000-000-000"
            definitions={{
                '#': /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

phoneTextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

einTextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
ubiTextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


const CreateBusinessPanel = (props) => {
    console.log(props);
    // const {sendRequest, status, data, error} = useHttp(createPanel);
    const {
        sendRequest: sendZipCodeRequest,
        status: zipCodeStatus,
        data: zipCodeData,
        error: zipCodeErr
    } = useHttp(validateZipCode);
    const [page, setPage] = useState(1);
    const [formattedInputValues, setFormattedInputValues] = useState({
        phoneNumber: '',
        EINNumber: '',
        UBINumber: '',
    })
    let reqStatus;
    const companyNameInputRef = useRef();
    const companyEmailInputRef = useRef();
    const companyTypeSelectRef = useRef();
    const zipCodeInputRef = useRef();
    const addressLineInputRef = useRef();
    const aptInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();
    const zipCodeHandler = async () => {
        if (page === 2) {
            console.log(zipCodeInputRef);
            const enteredZipCode = zipCodeInputRef.current.value;
            // console.log(enteredZipCode);
            if (enteredZipCode.length === 5) {
                await sendZipCodeRequest({enteredZipCode});
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
        const enteredCompanyPhoneNumber = formattedInputValues.phoneNumber;
        const enteredCompanyName = companyNameInputRef.current.value;
        const enteredCompanyType = companyTypeSelectRef.current.value;
        const enteredUBINumber = formattedInputValues.UBINumber;
        const enteredEINNumber = formattedInputValues.EINNumber;
        const enteredZipCode = zipCodeInputRef.current.value;
        const enteredAddressLine = addressLineInputRef.current.value;
        const enteredApt = aptInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredState = stateInputRef.current.value;
        props.onCreatePanel({
            userId: selectedUser,
            companyEmail: enteredCompanyEmail,
            companyPhoneNumber: enteredCompanyPhoneNumber,
            companyName: enteredCompanyName,
            companyType: enteredCompanyType,
            UBINumber: enteredUBINumber,
            EINNumber: enteredEINNumber,
            partnersInformation: null,
            address: {
                addressLine: enteredAddressLine,
                apt: enteredApt,
                city: enteredCity,
                state: enteredState,
                zipCode: enteredZipCode
            },
            panelType: 'business',
        });
    };

    const formattedInputChangeHandler = (event) => {
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });
    };

    // console.log(data, error);
    // if (status === "pending") {
    //     reqStatus = <LoadingSpinner/>
    // }
    // if (data) {
    //     // console.log(data);
    //     reqStatus = <Notif status={"success"}
    //                        text={"Panel Created Successfully!"}/>
    // }
    // if (status === "completed" && error) {
    //     reqStatus = <Notif status={"failed"} text={error}/>
    // }
    return (
        <form
            onSubmit={createPanelSubmitHandler}
            action="client/src/components/Layout/Dashboard/CreateBusinessPanel#"
            className="flex gap-6 flex-col w-full"
        >
            <div
                className={page === 1 ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : 'hidden'}>
                <TextField
                    label="Company Name"
                    required
                    inputRef={companyNameInputRef}
                    type={'text'}
                />
                <div className="flex flex-col gap-3">
                    {/*<label htmlFor="company-type">Company Type</label>*/}
                    <select name="company-type"
                            className="border border-gray-200 py-1.5 px-2.5 h-full rounded focus-visible:outline-none"
                            id="company-type" ref={companyTypeSelectRef}>
                        <option value="sole proprietor">Sole Proprietor</option>
                        <option value="small business cooperation 1120S">Small Business Cooperation 1120S
                        </option>
                        <option value="partnership 1065">Partnership 1065</option>
                        <option value="cooperation 1120">Cooperation 1120</option>
                        <option value="limited liability LLC">Limited Liability LLC</option>
                        <option value="non-profit organization 990">Non-profit Organization 990</option>
                    </select>
                </div>
            </div>
            <div
                className={page === 1 ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : 'hidden'}>
                <TextField
                    label="Email Address"
                    required
                    inputRef={companyEmailInputRef}
                    type={'email'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-envelope"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="Phone Number"
                    required
                    // ref={companyPhoneNumberInputRef}
                    name="phoneNumber"
                    value={formattedInputValues.phoneNumber}
                    onChange={formattedInputChangeHandler}
                    type={'tel'}
                    InputProps={{
                        inputComponent: phoneTextMaskCustom,
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-phone-office"></i></InputAdornment>,
                    }}
                />
            </div>
            <div
                className={page === 1 ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "hidden"}>
                <TextField
                    label="EIN Number"
                    required
                    name="EINNumber"
                    value={formattedInputValues.EINNumber}
                    onChange={formattedInputChangeHandler}
                    type={'text'}
                    InputProps={{
                        inputComponent: einTextMaskCustom,
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-input-numeric"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="UBI Number"
                    required
                    // ref={UBINumberInputRef}
                    name="UBINumber"
                    value={formattedInputValues.UBINumber}
                    onChange={formattedInputChangeHandler}
                    type={'text'}
                    InputProps={{
                        inputComponent: ubiTextMaskCustom,
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-input-numeric"></i></InputAdornment>,
                    }}
                />

            </div>
            <div
                className={page === 2 ? "grid grid-cols-1 lg:grid-cols-3 gap-4" : 'hidden'}>
                <TextField
                    label="Zip Code"
                    required
                    onKeyUp={zipCodeHandler}
                    inputRef={zipCodeInputRef}
                    type={'text'}
                />
                <TextField
                    label="City"
                    required
                    inputRef={cityInputRef}
                    disabled
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-city"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="State"
                    required
                    inputRef={stateInputRef}
                    disabled
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-flag-usa"></i></InputAdornment>,
                    }}
                />

            </div>
            <div
                className={page === 2 ? "grid grid-cols-1 lg:grid-cols-12 gap-4" : 'hidden'}>
                <TextField
                    label="Address Line"
                    required
                    className={"col-span-8"}
                    inputRef={addressLineInputRef}
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-location-dot"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="Apt"
                    required
                    className={"col-span-4"}
                    inputRef={aptInputRef}
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-building"></i></InputAdornment>,
                    }}
                />
            </div>
            {reqStatus}
            {page === 1 && <div className="flex justify-end gap-3">
                <Button
                    variant='text'
                    onClick={props.onConfirm}
                    type="button"
                    // disabled={status === 'pending'}
                >
                    Cancel
                </Button>

                <Button
                    variant='contained'
                    type="button"
                    onClick={() => {
                        setPage(2)
                    }}
                >
                    Next
                </Button>
            </div>}
            {page === 2 && <div className="flex justify-end gap-3">
                <Button
                    variant='text'
                    onClick={() => {
                        setPage(1)
                    }}
                    type="button"
                    // disabled={status === 'pending'}
                >
                    Previous
                </Button>

                <Button
                    variant='contained'
                    onClick={props.createPanel}
                    type="submit"
                    // disabled={status === 'pending'}
                >
                    Create Panel
                </Button>
            </div>}
        </form>
    );
};
export default CreateBusinessPanel;