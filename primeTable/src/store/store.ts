import { configureStore, Store } from "@reduxjs/toolkit";
import tableReducer from './features/tableSlice.ts'

const store: Store = configureStore({
    reducer: {tableReducer}
})

export default store;