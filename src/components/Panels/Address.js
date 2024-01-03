import {InputAdornment, TextField, Typography} from "@mui/material";

import React, {useEffect, useRef} from "react";
import useHttp from "../../hooks/use-http";
import {validateZipCode} from "../../lib/utils";
import {useValidateZipcodeMutation} from "../../store/utils/utilsApiSlice";

const Address = React.forwardRef((props, ref) => {
    const {zipCodeInputRef, cityInputRef, stateInputRef, addressLineInputRef, aptInputRef} = ref;
    const [validateZipcode, {data, isLoading, isSuccess, isError}] = useValidateZipcodeMutation();
    const zipCodeHandler = async () => {
        const enteredZipCode = zipCodeInputRef.current.value;
        // console.log(enteredZipCode);
        if (enteredZipCode.length === 5) {
            await validateZipcode({zipCode: enteredZipCode});
        }
    }
    console.log(ref);
    console.log(cityInputRef);
    console.log(cityInputRef.current);
    useEffect(() => {
        if (data) {
            cityInputRef.current.value = data.data.code[0];
            stateInputRef.current.value = data.data.code[1];
        }
        if (isError) {
            cityInputRef.current.value = '';
            stateInputRef.current.value = '';
        }
    }, [cityInputRef, stateInputRef, data])
    return (
        <>
            <Typography variant={'h4'} component={'h4'} color={'primary'} fontWeight={'bold'}>Address:</Typography>
            <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4"}>
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
            <div className={"grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4"}>
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
                    className={"col-span-4"}
                    inputRef={aptInputRef}
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-building"></i></InputAdornment>,
                    }}
                />
            </div>
        </>
    )
})
export default Address;