import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User, SignType } from '../models'

interface AuthSettings extends User {
    isLogged: boolean
}
export const initialState: AuthSettings = {
    isLogged: false,
    uid: '',
    method: SignType.None,
    email: '',
    isLeave: false,
    leaveAt: '',
    username: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
    profilePhoto: '',
    lastLogin: null,
    createdAt: null,
    updatedAt: null,
    terms: {
        existDoc: true,
        overAgeAgree: false,
        termsOfUseAgree: false,
        personalCollectAgree: false,
        marketingAgree: false,
    }
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn(state) {
            state.isLogged = true
        },
        signOut: () => initialState,
        setUser(state, { payload }) {
            state = Object.assign(state, payload)
        },
        setUsername(state, { payload }) {
            state.username = payload
        },
        setUserProfilePhoto(state, { payload }) {
            state.profilePhoto = payload
        },
        setTerms(state, { payload }) {
            state.terms = Object.assign(state.terms, payload)
        }
    },
})

export const authActions = slice.actions
export default slice.reducer
