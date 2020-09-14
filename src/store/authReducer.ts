import { createSlice } from "@reduxjs/toolkit"
import { SignType, User } from '../models'

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
    activePetDocId: '',
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
        },
        setActivePet(state, { payload }) {
            state.activePetDocId = payload
        }
    },
})

export const authActions = slice.actions
export default slice.reducer
