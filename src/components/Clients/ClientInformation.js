import Layout from "../../Layout/Dashboard/Layout";
import InfoItem from "../UI/InfoItem";
import {
    Button,
    Checkbox, FormControl, FormHelperText,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from "@mui/material";
import React, {useState, useRef, useEffect} from "react";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import useHttp from "../../hooks/use-http";
import {updateUser} from "../../lib/api/users";
import {useDispatch} from "react-redux";
import {uiActions} from "../../store/ui-slice";
import {useNavigate} from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const phoneTextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="+1 (#00) 000-0000"
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
const ClientInformation = (props) => {
    const user = props.user;
    const clientId = user._id
    const [profileChangedStatus, setProfileChangedStatus] = useState(false);
    console.log(profileChangedStatus)
    const createdAt = new Date(user.createdAt).toLocaleDateString("en-US");
    console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const updatedAt = new Date(user.updatedAt).toLocaleDateString("en-US");
    const [formattedInputValues, setFormattedInputValues] = useState({
        phoneNumber: user.phoneNumber || '',
    })
    const {sendRequest: updateUserRequest, status: userStatus, data: userData, error: userError} = useHttp(updateUser);
    const [inputValues, setInputValues] = useState({
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        individualPortalCount: user.individualPortalCount || 0,
        businessPortalCount: user.businessPortalCount || 0,
    });
    const [portalAccess, setPortalAccess] = useState([]);
    useEffect(() => {
        if (user.individualPortal) {
            setPortalAccess(prevState => [...prevState, 'individual'])
        }
        if (user.businessPortal) {
            setPortalAccess(prevState => [...prevState, 'business'])
        }
    }, [user.individualPortal, user.businessPortal])
    const changePortalAccessHandler = (event) => {
        const {
            target: {value},
        } = event;
        setPortalAccess(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setProfileChangedStatus(true);
    }
    const formattedInputChangeHandler = (event) => {
        if (event.target.value !== formattedInputValues.phoneNumber) {
            setProfileChangedStatus(true);
        }
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });
    };
    console.log(userStatus)
    if (userStatus === "completed" && userError) {
        dispatch(uiActions.showNotification({
            status: 'error',
            message: userError
        }))
    }
    if (userStatus === "completed" && userData) {
        // console.log(data);
        dispatch(uiActions.showNotification({
            status: 'success',
            message: 'User Updated Successfully!'
        }))
        navigate('/clients')
    }
    const inputOnChangeHandler = (event) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value,
        });
        setProfileChangedStatus(true);
    }
    const editProfile = async () => {
        const individualPortal = portalAccess.includes('individual');
        const businessPortal = portalAccess.includes('business');
        await updateUserRequest({
            ...inputValues, ...formattedInputValues,
            individualPortal,
            businessPortal,
            clientId,
            token: props.token
        })
    }
    return (
        <>
            <div className="flex-col lg:flex-row flex gap-6">
                <div className="basis-full lg:basis-2/12">
                    <div className="flex flex-col gap-6 items-center">
                        <div
                            className="w-56 h-56 rounded-xl drop-shadow-sm shadow-sm flex items-center border"
                        >
                            <img
                                src="./public/images/logo/logo.png"
                                alt=""
                                className="object-fill"
                            />
                        </div>
                        <button
                            id="upload-file-btn"
                            className="rounded bg-primary shadow py-3 px-4 text-white"
                        >
                            <i className="fa-regular fa-pen"></i>
                            Edit Photo
                        </button>
                    </div>
                </div>
                <div className="basis-full lg:basis-10/12">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                        <TextField
                            label="First Name"
                            required
                            // inputRef={firstNameInputRef}
                            name={'firstName'}
                            value={inputValues.firstName}
                            onChange={inputOnChangeHandler}
                            type={'text'}
                        />
                        <TextField
                            label="Middle Name"
                            type={'text'}
                            name={'middleName'}
                            onChange={inputOnChangeHandler}
                            value={inputValues.middleName}
                        />
                        <TextField
                            label="Last Name"
                            required
                            name={'lastName'}
                            type={'text'}
                            onChange={inputOnChangeHandler}
                            value={inputValues.lastName}
                        />
                        <TextField
                            label="Email Address"
                            required
                            type={'email'}
                            name={'email'}
                            onChange={inputOnChangeHandler}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><i
                                    className="fa-regular fa-envelope"></i></InputAdornment>,
                            }}
                            value={inputValues.email}
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
                        <FormControl>
                            <InputLabel id="panel-type-multiple-checkbox-label">Select Portal Access</InputLabel>
                            <Select
                                labelId="panel-type-multiple-checkbox-label"
                                id="panel-type-multiple-checkbox"
                                multiple
                                value={portalAccess}
                                onChange={changePortalAccessHandler}
                                input={<OutlinedInput label="Select Portal Access"/>}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                <MenuItem value={'individual'}>
                                    <Checkbox checked={portalAccess.indexOf('individual') > -1}/>
                                    <ListItemText primary={'individual'}/>
                                </MenuItem>
                                <MenuItem value={'business'}>
                                    <Checkbox checked={portalAccess.indexOf('business') > -1}/>
                                    <ListItemText primary={'business'}/>
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Number of Individual Portals"
                            required
                            name="individualPortalCount"
                            value={inputValues.individualPortalCount}
                            onChange={inputOnChangeHandler}
                            type={'number'}
                        />
                        <TextField
                            label="Number of Business Portals"
                            required
                            // ref={companyPhoneNumberInputRef}
                            name="businessPortalCount"
                            value={inputValues.businessPortalCount}
                            onChange={inputOnChangeHandler}
                            type={'number'}
                        />
                        {/*<InfoItem editable={true} title={"Permissions"}*/}
                        {/*          text={"File Manager, Chat, Filling Forms, Meeting"}/>*/}
                        <div
                            className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <h6 className={""}>Created At:</h6>
                                <span className="text-gray-400">
                                   {createdAt}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h6 className={""}>Last Update At:</h6>
                                <span className="text-gray-400">
                                    {updatedAt}
                                </span>
                            </div>
                        </div>
                        <div
                            className="flex justify-end gap-4">
                            <Button disabled={profileChangedStatus === false} variant={"text"}>
                                Cancel
                            </Button>
                            <Button onClick={editProfile} disabled={profileChangedStatus === false}
                                    variant={"contained"}>
                                Update Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ClientInformation;