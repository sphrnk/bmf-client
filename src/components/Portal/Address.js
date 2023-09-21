import {InputAdornment, TextField, Typography} from "@mui/material";

import React, {useRef} from "react";
import useHttp from "../../hooks/use-http";
import {validateZipCode} from "../../lib/utils";

const Address = React.forwardRef((props, ref) => {
    return (
        <>
            <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4"}>
                <TextField
                    label="Zip Code"
                    required
                    onKeyUp={props.onZipCodeHandler}
                    inputRef={ref.zipCodeInputRef}
                    type={'text'}
                />
                <TextField
                    label="City"
                    required
                    inputRef={ref.cityInputRef}
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
                    inputRef={ref.stateInputRef}
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
                    inputRef={ref.addressLineInputRef}
                    type={'text'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i
                            className="fa-regular fa-location-dot"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="Apt"
                    className={"col-span-4"}
                    inputRef={ref.aptInputRef}
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