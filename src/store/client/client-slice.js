import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    clients: [],
}

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        replaceClients(state, action) {
            state.clients = action.payload.clients
        },
        createClient(state, action) {

        },
        removeClient(state, action) {

        },
        updateClient(state, action) {

        },
    }
})

export const clientActions = clientSlice.actions;

export default clientSlice.reducer;