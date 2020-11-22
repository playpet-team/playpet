import { ToastParams } from './../components/Toast'
import { AppleAuthRequestResponseFullName } from '@invertase/react-native-apple-authentication'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { createSlice } from "@reduxjs/toolkit"
import { SignType } from "../models"

type CompleteLoginTypes = '' | 'signIn' | 'signUp'
export interface SignIn {
    completeLoginType: CompleteLoginTypes
    completeAuthentication: boolean
    method: SignType
    token: string | FirebaseAuthTypes.AuthCredential
    profile: {
        username?: string | AppleAuthRequestResponseFullName
        email: string
        password?: string
        photo?: string    
    }
    showOtherMethods: boolean
    showEmailForm: boolean
    inputEmail: string
    inputPassword: string
    toastContent: ToastParams
}

const resetToast = {
    visible: false,
    title: '',
    description: '',
    image: '',
}
export const initialState: SignIn = {
    completeLoginType: '',
    completeAuthentication: false,
    method: SignType.None,
    token: '',
    profile: {
        username: '',
        email: '',
        photo: 'https://firebasestorage.googleapis.com/v0/b/playpet-5b432.appspot.com/o/assets%2Ficons%2Fnot_yet.jpg?alt=media&token=7c175393-d7ba-4e32-829c-2a29be57dd0c',
    },
    showOtherMethods: false,
    showEmailForm: false,
    inputEmail: '',
    inputPassword: '',
    toastContent: resetToast,
}

const slice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        // signIn(state) {
        //     state.isLogged = true
        // },
        setCompleteLoginType(state, { payload }: { payload: CompleteLoginTypes }) {
            state.completeLoginType = payload
        },
        setCompleteAuthentication(state, { payload }: { payload: boolean }) {
            state.completeAuthentication = payload
        },
        setToken(state, { payload }: { payload: string | FirebaseAuthTypes.AuthCredential }) {
            state.token = payload
        },
        setMethod(state, { payload }: { payload: SignType }) {
            state.method = payload
            console.log('state', state.method)
        },
        setInputEmail(state, { payload }: { payload: string }) {
            state.inputEmail = payload
        },
        setInputPassword(state, { payload }: { payload: string }) {
            state.inputPassword = payload
        },
        setProfile(state, { payload }: {
            payload: {
                username?: AppleAuthRequestResponseFullName | string | null
                email?: string | null
                password?: string
                photo?: string | null  
            }
        }) {
            state.profile = Object.assign(state.profile, payload)
        },
        setToastContent(state, { payload }: {
            payload: ToastParams
        }) {
            state.toastContent = {
                ...state.toastContent,
                ...payload,
            }
        },
        resetToastContent(state) {
            state.toastContent = resetToast
        },
    },
})

export const signInActions = slice.actions
export default slice.reducer