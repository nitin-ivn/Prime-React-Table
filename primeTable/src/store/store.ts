import { configureStore } from "@reduxjs/toolkit";
import tableReducer from './features/tableSlice.ts'

const store = configureStore({
    reducer: {table: tableReducer}
})

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;