import { createSlice, Slice, createAsyncThunk } from "@reduxjs/toolkit";

interface table {
    id: number,
    title: string,
    place_of_origin: string,
    artist_display: string;
    date_start: number | null;
    date_end: number | null;
}

interface initState {
    isLoading: boolean,
    table: table[],
    isError: boolean,
    total_pages: number,
}

export const fetchTable = createAsyncThunk<{filter: table[], totalPages: number}, number>('fetchTable', async (e: number) => {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${e}`);
    const data = await response.json();

    const totalPages = data.pagination.total_pages;

    const filter = data.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        place_of_origin: item.place_of_origin,
        artist_display: item.artist_display,
        date_start: item.date_start,
        date_end: item.date_end,
    }));

    return {filter, totalPages};
});


const initialState: initState = {
    isLoading: false,
    table: [],
    isError: false,
    total_pages: 0
}

export const tableSlice: Slice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTable.fulfilled, (state,action) => {
            state.isLoading = false;
            state.table = action.payload.filter;
            state.total_pages = action.payload.totalPages;
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