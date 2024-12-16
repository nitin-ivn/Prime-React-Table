import { configureStore, Store } from "@reduxjs/toolkit";
import tableReducer from './features/tableSlice.ts'

const store: Store = configureStore({
    reducer: {table: tableReducer}
})

export type AppDispatch = typeof store.dispatch;
export default store;