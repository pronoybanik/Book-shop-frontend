import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/auth/authApi";


export const store = configureStore({
    reducer: {
        count: counterSlice.reducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
