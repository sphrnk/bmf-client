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
const ClientInformation = ({user}) => {

    const clientId = user._id
    const [profileChangedStatus, setProfileChangedStatus] = useState(false);
    const createdAt = new Date(user.createdAt).toLocaleDateString("en-US");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const updatedAt = new Date(user.updatedAt).toLocaleDateString("en-US");
    const [formattedInputValues, setFormattedInputValues] = useState({
        phoneNumber: user.phoneNumber || '',
    })
    const firstNameInputRef = useRef();
    const middleNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const individualPortalCountInputRef = useRef();
    const businessPortalCountInputRef = useRef();
    const [portalAccess, setPortalAccess] = useState([]);
    useEffect(() => {
        firstNameInputRef.current.value = user.firstName;
        middleNameInputRef.current.value = user.middleName;
        lastNameInputRef.current.value = user.lastName;
        emailInputRef.current.value = user.email;
        individualPortalCountInputRef.current.value = user.individualPortalCount;
        businessPortalCountInputRef.current.value = user.businessPortalCount;
        if (user.businessPortal){
            setPortalAccess(prevState => [...prevState, 'business'])
        }
        if (user.individualPortal){
            setPortalAccess(prevState => [...prevState, 'individual'])
        }
    }, [user])
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
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });
    };
    const editProfile = async () => {
        const individualPortal = portalAccess.includes('individual');
        const businessPortal = portalAccess.includes('business');
        // await updateUserRequest({
        //     ...inputValues, ...formattedInputValues,
        //     individualPortal,
        //     businessPortal,
        //     clientId,
        //     token: props.token
        // })
    }
    return (
        <>
            <div className="grid gap-6">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
                    <TextField
                        label="First Name"
                        required
                        inputRef={firstNameInputRef}
                        name={'firstName'}
                        type={'text'}
                    />
                    <TextField
                        label="Middle Name"
                        type={'text'}
                        name={'middleName'}
                        inputRef={middleNameInputRef}
                    />
                    <TextField
                        label="Last Name"
                        required
                        name={'lastName'}
                        type={'text'}
                        inputRef={lastNameInputRef}
                    />
                    <TextField
                        label="Email Address"
                        required
                        type={'email'}
                        name={'email'}
                        inputRef={emailInputRef}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><i
                                className="fa-regular fa-envelope"></i></InputAdornment>,
                        }}
                    />
                    <TextField
                        label="Phone Number"
                        required
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
                        inputRef={individualPortalCountInputRef}
                        type={'number'}
                    />
                    <TextField
                        label="Number of Business Portals"
                        required
                        // ref={companyPhoneNumberInputRef}
                        name="businessPortalCount"
                        inputRef={businessPortalCountInputRef}
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
        </>
    )
}
export default ClientInformation;