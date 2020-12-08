import { createSlice } from "@reduxjs/toolkit"
import { SignType, User } from '../models'

interface AuthSettings extends User {
    isLogged: boolean
    availableUpdates: boolean
}
export const initialState: AuthSettings = {
    availableUpdates: false,
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
    agreeTerms: true,
    lastLogin: null,
    createdAt: null,
    updatedAt: null,
    activePetDocId: null,
    terms: {
        existDoc: false,
        overAgeAgree: false,
        termsOfUseAgree: false,
        personalCollectAgree: false,
        marketingAgree: false,
        createdAt: null,
        updatedAt: null,
    },
    // activePet: {
    //     petName: '',
    //     petType: '',
    //     petSize: '',
    //     petAge: '',
    //     createdAt: null,
    //     updatedAt: null,
    // },
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAvailableUpdates(state, { payload }: { payload: boolean }) {
            state.availableUpdates = payload
        },
        signIn(state) {
            state.isLogged = true
        },
        signOut: () => initialState,
        setUser(state, { payload }) {
            state = Object.assign(state, payload)
        },
        updateAgreeTerms(state, { payload }: { payload: boolean }) {
            state.agreeTerms = payload
        },
        setUsername(state, { payload }) {
            state.username = payload
        },
        setUserProfilePhoto(state, { payload }: { payload: string }) {
            state.profilePhoto = payload
        },
        setTerms(state, { payload }) {
            state.terms = Object.assign(state.terms, payload)
        },
        setActivePetDocId(state, { payload }: { payload: string }) {
            state.activePetDocId = payload
        },
        // setActivePet(state, { payload }) {
        //     state.activePet = payload
        // },
    },
})

export const authActions = slice.actions
export default slice.reducer
