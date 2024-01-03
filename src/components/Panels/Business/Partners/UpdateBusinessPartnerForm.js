import React, {useState, useRef, useContext, useEffect} from "react";
import {
    Button, FormControl,
    InputAdornment, InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";
import Address from "../../Address";
import {uiActions} from "../../../../store/ui-slice";
import {logout, selectCurrentUser} from "../../../../store/auth/authSlice";
import {useUpdateBusinessPartnerMutation} from "../../../../store/panel/businessPartnersApiSlice";
import {useDispatch, useSelector} from "react-redux";

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


const UpdateBusinessPartnerForm = ({businessPartner}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser)
    const [updateBusinessPartner, {
        isSuccess,
        isLoading,
        isError,
        error
    }] = useUpdateBusinessPartnerMutation()
    const [formattedInputValues, setFormattedInputValues] = useState({
        phoneNumber: '',
    })
    const businessPartnerFirstNameInputRef = useRef();
    const businessPartnerMiddleNameInputRef = useRef();
    const businessPartnerLastNameInputRef = useRef();
    const businessPartnerEmailInputRef = useRef();
    const businessPartnerSSNInputRef = useRef();
    const businessPartnerZipCodeInputRef = useRef();
    const businessPartnerAddressLineInputRef = useRef();
    const businessPartnerAptInputRef = useRef();
    const businessPartnerCityInputRef = useRef();
    const businessPartnerStateInputRef = useRef();
    const formattedInputChangeHandler = (event) => {
        setFormattedInputValues({
            ...formattedInputValues,
            [event.target.name]: event.target.value,
        });
    };
    useEffect(() => {
        console.log(businessPartner);
        businessPartnerFirstNameInputRef.current.value = businessPartner.firstName;
        businessPartnerMiddleNameInputRef.current.value = businessPartner.middleName;
        businessPartnerLastNameInputRef.current.value = businessPartner.lastName;
        businessPartnerEmailInputRef.current.value = businessPartner.email;
        businessPartnerSSNInputRef.current.value = businessPartner.SSNNumber;
        businessPartnerZipCodeInputRef.current.value = businessPartner.address.zipCode
        businessPartnerAddressLineInputRef.current.value = businessPartner.address.addressLine;
        businessPartnerAptInputRef.current.value = businessPartner.address.apt;
        businessPartnerCityInputRef.current.value = businessPartner.address.city;
        businessPartnerStateInputRef.current.value = businessPartner.address.state;
        setFormattedInputValues((prevState) => {
            return {
                ...prevState,
                phoneNumber: businessPartner.phoneNumber
            }
        })
    }, [businessPartner])
    const updateBusinessPartnerSubmitHandler = async (el) => {
        el.preventDefault();

        const enteredBusinessPartnerFirstNameInputRef = businessPartnerFirstNameInputRef.current.value;
        const enteredBusinessPartnerMiddleNameInputRef = businessPartnerMiddleNameInputRef.current.value;
        const enteredBusinessPartnerLastNameInputRef = businessPartnerLastNameInputRef.current.value;
        const enteredBusinessPartnerEmailInputRef = businessPartnerEmailInputRef.current.value;
        const enteredBusinessPartnerSSNInputRef = businessPartnerSSNInputRef.current.value;
        const enteredBusinessPartnerZipCodeInputRef = businessPartnerZipCodeInputRef.current.value;
        const enteredBusinessPartnerAddressLineInputRef = businessPartnerAddressLineInputRef.current.value;
        const enteredBusinessPartnerAptInputRef = businessPartnerAptInputRef.current.value;
        const enteredBusinessPartnerCityInputRef = businessPartnerCityInputRef.current.value;
        const enteredBusinessPartnerStateInputRef = businessPartnerStateInputRef.current.value;
        const phoneNumber = formattedInputValues.phoneNumber;
        const data = {
            userId: user.id,
            panelId: businessPartner.businessPanel,
            partnerId: businessPartner.id,
            firstName: enteredBusinessPartnerFirstNameInputRef,
            middleName: enteredBusinessPartnerMiddleNameInputRef,
            lastName: enteredBusinessPartnerLastNameInputRef,
            email: enteredBusinessPartnerEmailInputRef,
            phoneNumber,
            SSNNumber: enteredBusinessPartnerSSNInputRef,
            address: {
                zipCode: enteredBusinessPartnerZipCodeInputRef,
                addressLine: enteredBusinessPartnerAddressLineInputRef,
                apt: enteredBusinessPartnerAptInputRef,
                city: enteredBusinessPartnerCityInputRef,
                state: enteredBusinessPartnerStateInputRef,
            },
        }
        await updateBusinessPartner(data)

    };
    useEffect(() => {
        if (isSuccess) {
            dispatch(uiActions.showNotification({
                status: 'success',
                message: 'Partner Added Successfully!'
            }))
            navigate('/partners');
        } else if (isError) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: error.data.message
            }))
        }
    }, [isError, isSuccess, error])
    return (<form
        onSubmit={updateBusinessPartnerSubmitHandler}
        action=""
        className="flex gap-6 flex-col w-full"
    >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <TextField
                label="First Name"
                required
                inputRef={businessPartnerFirstNameInputRef}
                name={'firstName'}
                type={'text'}
            />
            <TextField
                label="Middle Name"
                type={'text'}
                name={'middleName'}
                inputRef={businessPartnerMiddleNameInputRef}
            />
            <TextField
                label="Last Name"
                required
                name={'lastName'}
                inputRef={businessPartnerLastNameInputRef}
                type={'text'}
            />
        </div>
        <div
            className={"grid grid-cols-1 lg:grid-cols-3 gap-4"}>
            <TextField
                label="Email Address"
                required
                type={'email'}
                name={'email'}
                inputRef={businessPartnerEmailInputRef}
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
            <TextField
                label="SSN Number"
                required
                inputRef={businessPartnerSSNInputRef}
                name="ssnNumber"
            />
        </div>
        <Address ref={{
            zipCodeInputRef: businessPartnerZipCodeInputRef,
            cityInputRef: businessPartnerCityInputRef,
            stateInputRef: businessPartnerStateInputRef,
            addressLineInputRef: businessPartnerAddressLineInputRef,
            aptInputRef: businessPartnerAptInputRef
        }}/>
        <div className="flex justify-end gap-3">
            <Button
                variant='outlined'
                color={'error'}
                type="button"
                onClick={() => {
                    navigate('/partners')
                }}
                disabled={isLoading}
            >
                Cancel
            </Button>

            <Button
                variant='contained'
                type="submit"
                disabled={isLoading}
            >
                {isLoading &&
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                         xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}
                Update Business Partner
            </Button>
        </div>
    </form>);
};
export default UpdateBusinessPartnerForm;