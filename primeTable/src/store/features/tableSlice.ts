import { createSlice, Slice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTable = createAsyncThunk('fetchTable', async () => {
    const response = await fetch('https://api.artic.edu/api/v1/artworks?page=1');
    return response.json();
})

interface initState {
    isLoading: boolean,
    table: Object,
    isError: boolean
}

const initialState: initState = {
    isLoading: false,
    table: {},
    isError: false,
}

export const tableSlice: Slice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTable.fulfilled, (state,action) => {
            state.isLoading = false;
            state.table = action.payload
        });

        builder.addCase(fetchTable.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(fetchTable.rejected, (state, action) => {
            console.error('Error: ', action.payload);
            state.isError = true;
        })
    }
});


export default tableSlice.reducer;