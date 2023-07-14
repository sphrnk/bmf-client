import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const DOMAIN = process.env.REACT_APP_BACKEND_URL;
export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async ({email, password}, {rejectWithValue}) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const {data} = await axios.patch(
                `${DOMAIN}/users/updateMyPassword`,
                {email, password},
                config
            )
            // store user's token in local storage
            localStorage.setItem('userToken', data.userToken)
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)