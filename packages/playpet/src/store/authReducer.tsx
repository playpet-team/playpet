import { createSlice } from "@reduxjs/toolkit";
import { User, signEnum } from '../models';

interface AuthSettings extends User {
    isLogged: boolean;
}
export const initialState: AuthSettings = {
    isLogged: false,
    uid: '',
    method: signEnum.NONE,
    email: '',
    isLeave: false,
    leaveAt: '',
    username: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
    photo: '',
    lastLogin: null,
    createdAt: null,
    updatedAt: null,
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
        setUser(state, { payload }) {
            return state = {
                ...state,
                ...payload,
            };
        },
    },
});

export const authActions = slice.actions;
export default slice.reducer;