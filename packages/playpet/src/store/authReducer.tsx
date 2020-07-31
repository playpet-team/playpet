import { createSlice } from "@reduxjs/toolkit";
import { User } from '@playpet/firefunction';

interface AuthSettings extends User {
    isLogged: boolean;
}
const initialState: AuthSettings = {
    isLogged: false,
    uid: '',
    profileImage: '',
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn(state) {
            state.isLogged = true;
        },
        signOut(state) {
            state.isLogged = false;
        },
    },
});

// console.log('slice', slice);
export const authActions = slice.actions;
export default slice.reducer;