import useHttp from "../../hooks/use-http";
import React, {useState, useRef, useContext} from "react";
import {createUser} from "../../lib/api/users";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notif from "../UI/Notif";
import AuthContext from "../../store/auth-context";
import {
    Button,
    Checkbox,
    InputAdornment,
    ListItemText,
    MenuItem,
    OutlinedInput,
    TextField,
    Select, InputLabel, FormControl, FormHelperText
} from "@mui/material";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";

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
phoneTextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
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


const CreateAccountForm = (props) => {
    const location = useLocation();

    const navigate = useNavigate();
    const [formattedInputValues, setFormattedInputValues] = useState({
        phoneNumber: location.state !== null ? location.state.phoneNumber : '',
    })
    const [inputValues, setInputValues] = useState({
        firstName: location.state !== null ? location.state.firstName : '',
        middleName: location.state !== null ? location.state.middleName : '',
        lastName: location.state !== null ? location.state.lastName : '',
        email: location.state !== null ? location.state.email : '',
    });
    const [panelType, setPanelType] = useState([]);
    const [panelTypeHasError, setPanelTypeHasError] = useState(false);
    const changePanelTypeHandler = (event) => {
        const {
            target: {value},
        } = event;
        setPanelType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    const formattedInputChangeHandler = (event) => {
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });
    };
    const inputOnChangeHandler = (event) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value,
        });
    }
    const createAccountSubmitHandler = async (el) => {
        el.preventDefault();
        const phoneNumber = formattedInputValues.phoneNumber;
        if (panelType.length !== 0) {
            const individualPortal = panelType.includes('individual');
            const businessPortal = panelType.includes('business');
            props.onSubmit({...inputValues, phoneNumber, individualPortal, businessPortal})
        } else {
            setPanelTypeHasError(true);
        }
    };
    return (<form
        onSubmit={createAccountSubmitHandler}
        action="client/src/Layout/Dashboard/Layout#"
        className="flex gap-6 flex-col w-full"
    >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
        </div>
        <div
            className={"grid grid-cols-1 lg:grid-cols-3 gap-4"}>
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
                value={formattedInputValues.phoneNumber || props.phoneNumber}
                onChange={formattedInputChangeHandler}
                type={'tel'}
                InputProps={{
                    inputComponent: phoneTextMaskCustom,
                    startAdornment: <InputAdornment position="start"><i
                        className="fa-regular fa-phone-office"></i></InputAdornment>,
                }}
            />
            <FormControl error={panelTypeHasError}>
                <InputLabel id="panel-type-multiple-checkbox-label">Select Portal Access</InputLabel>
                <Select
                    labelId="panel-type-multiple-checkbox-label"
                    id="panel-type-multiple-checkbox"
                    multiple
                    value={panelType}
                    onChange={changePanelTypeHandler}
                    input={<OutlinedInput label="Select Portal Access"/>}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    <MenuItem value={'individual'}>
                        <Checkbox checked={panelType.indexOf('individual') > -1}/>
                        <ListItemText primary={'individual'}/>
                    </MenuItem>
                    <MenuItem value={'business'}>
                        <Checkbox checked={panelType.indexOf('business') > -1}/>
                        <ListItemText primary={'business'}/>
                    </MenuItem>
                </Select>
                {panelTypeHasError && <FormHelperText>This is required!</FormHelperText>}
            </FormControl>
        </div>
        <div className="flex justify-end gap-3">
            <Button
                variant='outlined'
                color={'error'}
                type="button"
                onClick={() => {
                    navigate('/clients')
                }}
                disabled={props.isPending}
            >
                Cancel
            </Button>

            <Button
                variant='contained'
                type="submit"
                disabled={props.isPending}
            >
                {props.isPending &&
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                         xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}
                Create Account
            </Button>
        </div>
    </form>);
};
export default CreateAccountForm;