import { createSlice } from "@reduxjs/toolkit";
import { User, signEnum } from '../models';

interface AuthSettings extends User {
    isLogged: boolean;
}
const initialState: AuthSettings = {
    isLogged: false,
    uid: '',
    method: signEnum.NONE,
    isLeave: false,
    leaveAt: '',
    username: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
    photo: '',
    lastLogin: '',
    createdAt: '',
    updatedAt: '',
    terms: {
        overAgeAgree: false,
        termsOfUseAgree: false,
        personalCollectAgree: false,
        marketingAgree: false,
    }
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