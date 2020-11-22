import { signInActions } from './../../store/signInReducer'
import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope
} from '@invertase/react-native-apple-authentication'
import AsyncStorage from '@react-native-community/async-storage'
import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login'
import * as Sentry from "@sentry/react-native"
import { useCallback, useEffect, useState } from 'react'
// import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { useSelector, useDispatch } from 'react-redux'
import { currentUser, signInWithCustomToken, updateUserAuthToken } from '.'
import { Api } from '../../api'
// import { ToastParams } from '../../components/Toast'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'
import { SignType } from '../../models'
import { RootState } from '../../store/rootReducers'

const DEV_GOOGLE_WEB_CLIENT_ID = '386527552204-t1igisdgp2nm4q6aoel7a2j3pqdq05t6.apps.googleusercontent.com'
const PROD_GOOGLE_WEB_CLIENT_ID = '952410130595-ro7ouus2ia8rtj64guknh8dn91e5o7ns.apps.googleusercontent.com'
GoogleSignin.configure({ webClientId: __DEV__ ? DEV_GOOGLE_WEB_CLIENT_ID : PROD_GOOGLE_WEB_CLIENT_ID })

export default function initializeSignIn() {
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const {
        method,
        // inputEmail,
        // inputPassword,
        token,
        profile,
        toastContent,
        completeAuthentication,
    } = useSelector((state: RootState) => state.signIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (completeAuthentication) {
            trySignIn()
        }
        
        async function trySignIn() {
            try {
                if (!profile.email) {
                    rejectSignIn('이메일 정보를 받아 올수 없습니다. 잠시 후 다시 시도해주세요')
                    return
                }
                setLoading(true)
    
                const { customToken, uid, newUser } = await postCreateUser()
                if (!customToken || !uid || typeof newUser !== 'boolean') {
                    Sentry.captureException(`trySignIn-no-information-from-postCreateUser-${uid}-${newUser}`)
                    setLoading(false)
                    return
                }
                
                try {
                    await signInWithCustomToken(customToken)
                    putAsyncStorage('customToken', {
                        customToken,
                        email: profile.email,
                        provider: method,
                    })
                    updateUserAuthToken(uid, customToken)
                    const success = checkUser()
                    if (success) {
                        dispatch(signInActions.setCompleteLoginType(newUser ? 'signUp' : 'signIn'))
                    }
    
                } catch (e) {
                    console.error("eee", e)
                    Sentry.captureException(`trySignIn-${e}`)
                    if (e.code != "auth/account-exists-with-different-credential") {
                        rejectSignIn('로그인에 실패하였습니다')
                    } else {
                        rejectSignIn('다른 로그인 방법으로 회원가입을 완료한 계정이 있습니다.')
                    }
                } finally {
                    setLoading(false)
                }
            } catch (e) {
                Sentry.captureException(`trySignIn-${e}`)
            } finally {
                setLoading(false)
            }
        }
    }, [completeAuthentication])


    const rejectSignIn = (title: string) => {
        dispatch(signInActions.setToastContent({
            visible: true,
            title: title,
        }))
        setLoading(false)
        Sentry.captureException(`trySignIn-${title}`)
    }

    const getUidByThirdPartySignIn = useCallback(async (selectedMethod: SignType) => {
        setLoading(true)
        try {
            switch (selectedMethod) {
                case SignType.Google: {
                    await GoogleSignin.hasPlayServices()
                    const userInfo = await GoogleSignin.signIn()
                    dispatch(signInActions.setProfile({
                        username: userInfo.user.familyName || '' + userInfo.user.givenName || '',
                        email: userInfo.user.email,
                        photo: userInfo.user.photo || '',
                    }))
                    const token = getProvider(SignType.Google).credential(userInfo.idToken)
                    dispatch(signInActions.setToken(token))
                    dispatch(signInActions.setCompleteAuthentication(true))
                    break
                }
                // case SignType.Facebook: {
                //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
                //     if (result.isCancelled) {
                //         break
                //     }
                //     const data = await AccessToken.getCurrentAccessToken()
                //     if (!data) {
                //         dispatch(signInActions.setToastContent({
                //             visible: true,
                //             title: '페이스북 인증 정보를 받아오는 작업을 실패했습니다',
                //         }))
                //     } else {
                //         const token = getProvider(SignType.Facebook).credential(data.accessToken)
                //         dispatch(signInActions.setToken(token))
                //     }
                //     break
                // }
                case SignType.Apple: {
                    const response = await appleSignIn()
                    if (response) {
                        dispatch(signInActions.setToken(response.token))
                        
                    }
                    dispatch(signInActions.setCompleteAuthentication(true))
                    break
                }
                case SignType.Kakao: {
                    const token = await kakaoLogin()
                    dispatch(signInActions.setToken(token))
                    const userProfile = await getKakaoProfile()
                    dispatch(signInActions.setProfile(userProfile))
                    dispatch(signInActions.setCompleteAuthentication(true))
                    break
                }
                // case SignType.Email: {
                //     if (inputEmail && inputPassword) {
                //         dispatch(signInActions.setToken('email'))
                //         dispatch(signInActions.setProfile({
                //             email: inputEmail,
                //             password: inputPassword,
                //         }))
                //     }
                //     break
                // }
                default: {
                    break
                }
            }
        } catch (e) {
            Sentry.captureException(`trySignIn-${e}`)
            setLoading(false)
            dispatch(signInActions.setToastContent({
                visible: true,
                title: '인증 정보를 받아오는 작업을 실패했습니다',
            }))
        } finally {
            return toastContent
        }
        
    }, [])

    const checkUser = () => {
        const user = currentUser()
        if (!user) {
            Sentry.captureException('checkUser-회원정보를 찾을 수 없습니다')
            dispatch(signInActions.setToastContent({
                visible: true,
                title: '회원정보를 찾을 수 없습니다',
            }))
            return
        }
        return true
    }

    const postCreateUser = useCallback(async () => {
        try {

            const { data: { customTokenForExistUser, customToken, uid, newUser } }:
                { data: {
                    customTokenForExistUser: string
                    customToken: string
                    uid: string
                    newUser: boolean
                }}
                = await Api.post('/auth/create-user', {
                ...profile,
                method,
            })
    
            return {
                customToken: customTokenForExistUser || customToken,
                uid,
                newUser
            }
        } catch (e) {
            Sentry.captureException(`postCreateUser-${e}`)
            return {}
        }
    }, [profile, method])

    return { getUidByThirdPartySignIn, loading, Indicator }
}

const appleSignIn = async () => {
    // Start the sign-in request
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: AppleAuthRequestOperation.LOGIN,
            requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
        })
        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw 'Apple Sign-In failed - no identify token returned'
        }
    
        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse
        return {
            token: getProvider(SignType.Apple).credential(identityToken, nonce),
            userProfile: {
                username: appleAuthRequestResponse.fullName,
                email: appleAuthRequestResponse.email,
            }
        }
    } catch (e) {
        Sentry.captureException(e)
    }
}

export const putAsyncStorage = async (key: string, putData: AsyncStorageCustomToken) => {
    try {
        const saveData = JSON.stringify(putData)
        await AsyncStorage.setItem(
            key,
            saveData
        )
    } catch (e) {
        Sentry.captureException(e)
    }
}

const kakaoLogin = async () => {
    const result = await KakaoLogins.login([KAKAO_AUTH_TYPES.Talk])
    return result.accessToken
}

const getKakaoProfile = async () => {
    const result = await KakaoLogins.getProfile()
    return {
        username: result.nickname,
        email: result.email,
        photo: result.profile_image_url || null,
    }
}

const getProvider = (providerId: string) => {
    switch (providerId) {
        case SignType.Google:
            return auth.GoogleAuthProvider
        case SignType.Facebook:
            return auth.FacebookAuthProvider
        case SignType.Apple:
            return auth.AppleAuthProvider
        default:
            throw new Error(`No provider implemented for ${providerId}`)
    }
}

export interface AsyncStorageCustomToken {
    customToken: string;
    email: string;
    provider: SignType;       
}
