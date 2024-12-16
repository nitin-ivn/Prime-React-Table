import { createSlice, Slice, createAsyncThunk } from "@reduxjs/toolkit";

interface table {
    title: string,
    place_of_origin: string,
    artist_display: string;
    date_start: number | null;
    date_end: number | null;
}

interface initState {
    isLoading: boolean,
    table: table[],
    isError: boolean
}

export const fetchTable = createAsyncThunk('fetchTable', async (e: number) => {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${e}`);
    const data = await response.json();

    const filter = data.data.map((item: any) => ({
        title: item.title,
        place_of_origin: item.place_of_origin,
        artist_display: item.artist_display,
        date_start: item.date_start,
        date_end: item.date_end,
    }));

    return filter;
});


const initialState: initState = {
    isLoading: false,
    table: [],
    isError: false,
}

export const tableSlice: Slice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTable.fulfilled, (state,action) => {
            state.isLoading = false;
            state.table = action.payload;
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