import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define the TUser type
export type TUser = {
    userId: string;
    role: string;
    iat: number;
    exp: number;
};


type TAuthState = {
    user: TUser | null; 
    token: string | null;
};


const initialState: TAuthState = {
    user: null,
    token: null,
};

// Create the slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;  // Assign the user object
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

// Export actions
export const { setUser, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

// Selectors
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState): TUser | null => state.auth.user;
