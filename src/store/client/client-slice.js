import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    clients: [],
    client: null,
}

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        replaceClients(state, action) {
            state.clients = action.payload.clients
        },
        replaceClient(state, action) {
            state.client = action.payload.client
        },
        createClient(state, action) {

        },
        deleteClient(state, action) {
            const id = action.payload;
            console.log(id);
            const existingItem = state.clients.find((client) => client._id === id);
            if (existingItem) {
                state.clients = state.clients.filter((client) => client._id !== id);
            }
        },
        updateClient(state, action) {

        },
    }
})

export const clientActions = clientSlice.actions;

export default clientSlice.reducer;