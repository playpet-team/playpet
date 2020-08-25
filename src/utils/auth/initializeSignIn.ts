import { useNavigation } from '@react-navigation/native'
import { createUser } from './../../callable/auth'
import { signInWithCustomToken, signInCredential, currentUser } from '.'
import { ToastParams } from '../../components/Toast'
import { useCallback, useState, useEffect } from 'react'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-community/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import KakaoLogins, { IProfile } from '@react-native-seoul/kakao-login'
import { NaverLogin, getProfile, GetProfileResponse } from '@react-native-seoul/naver-login'

import { SignType } from '../../models'
import AsyncStorage from '@react-native-community/async-storage'
import { Platform } from 'react-native'

const GOOGLE_WEB_CLIENT_ID = '386527552204-t1igisdgp2nm4q6aoel7a2j3pqdq05t6.apps.googleusercontent.com'
GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID })

export default function initializeSignIn({ toastContent, setToastContent }: {
    toastContent: ToastParams
    setToastContent: React.Dispatch<React.SetStateAction<ToastParams>>
}) {
    const [signInSuccess, setSignInSuccess] = useState(false)
    const [credential, setCredential] = useState<FirebaseAuthTypes.AuthCredential | null>(null)
    const [method, setMethod] = useState<SignType>(SignType.None)
    const [token, setToken] = useState<any>(null)
    const [profile, setProfile] = useState<{
        username: string
        email: string
        photo: string
    }>({
        username: '',
        email: '',
        photo: '',
    })
    const navigation = useNavigation()

    useEffect(() => {
        if (signInSuccess) {
            navigation.navigate('AppLoginAgreeTerms', {
                profile,
            })
        }
    }, [signInSuccess])

    useEffect(() => {
        getCredential()
        async function getCredential() {
            if (token && profile && method) {
                try {
                    const { data } = await createUser({
                        ...profile,
                        method,
                    })
                    const customToken = data.token;
                    if (!customToken) {
                        return
                    }
                    
                    try {
                        // if ([SignType.Apple, SignType.Google, SignType.Facebook].includes(method) && credential) {
                        //     console.log('1');
                        //     await signInCredential(credential)
                        // } else {
                        console.log('2');
                        await signInWithCustomToken(customToken)
                        // }
                        const success = checkUser()
                        saveCustomToken(
                            profile.email,
                            method,
                            customToken,
                        )
                        if (success) {
                            setSignInSuccess(true)
                        }
        
                    } catch (error) {
                        console.error("getCredential-------", error)
                        if (error.code != "auth/account-exists-with-different-credential") {
                            setToastContent({
                                ...toastContent,
                                visible: true,
                                title: '인증 정보를 받아오는 작업을 실패했습니다',
                            })
                        } else {
                            setToastContent({
                                ...toastContent,
                                visible: true,
                                title: '다른 로그인 방법으로 회원가입을 완료한 계정이 있습니다.',
                            })
                        }
                    }
                } catch (e) {
                    console.error('getCredential----', e)
                }
            }
        }
    }, [token, profile, method])

    const getUidByThirdPartySignIn = useCallback(async (method: SignType) => {
        setMethod(method)
        try {
            switch (method) {
                case SignType.Google: {
                    await GoogleSignin.hasPlayServices()
                    const userInfo = await GoogleSignin.signIn()
                    setProfile({
                        username: userInfo.user.familyName || '' + userInfo.user.givenName || '',
                        email: userInfo.user.email,
                        photo: userInfo.user.photo || '',
                    })
                    setToken(getProvider(SignType.Google).credential(userInfo.idToken))
                    break
                }
                case SignType.Facebook: {
                    const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
                    if (result.isCancelled) {
                        break
                    }
                    const data = await AccessToken.getCurrentAccessToken()
                    if (!data) {
                        setToastContent({
                            ...toastContent,
                            visible: true,
                            title: '인증 정보를 받아오는 작업을 실패했습니다',
                        })
                    } else {
                        setToken(getProvider(SignType.Facebook).credential(data.accessToken))
                    }
                    break
                }
                case SignType.Apple: {
                    const credential = await appleSignIn(setProfile)
                    credential && setToken(credential)
                    break
                }
                case SignType.Kakao: {
                    await kakaoLogin(setToken)
                    await getKakaoProfile(setProfile)
                    break
                }
                case SignType.Naver: {
                    await naverLogin(setToken)
                    await getNaverProfile(token, setProfile)
                    break
                }
                default: {
                    break
                }
            }
        } catch (error) {
            setToastContent({
                ...toastContent,
                visible: true,
                title: '인증 정보를 받아오는 작업을 실패했습니다',
            })
        } finally {
            return toastContent
        }
        
    }, [])

    const saveCustomToken = useCallback(async (email: string, provider: string, customToken: any) => {
        try {
            const saveData = JSON.stringify([customToken, email, provider])
            await AsyncStorage.setItem(
                'customToken',
                saveData
            )
        } catch (error) {
            throw error
        }
    }, [token])

    const checkUser = () => {
        const user = currentUser()
        if (!user) {
            setToastContent({
                ...toastContent,
                visible: true,
                title: '인증 정보를 받아오는 작업을 실패했습니다',
            })
            return
        }
        return true
    }

    // 아직은 쓸일은 없지만 언젠간 쓰이게 될것
    // const getCredential = async (provider: string) => {
    //     try {
    //         const value = await AsyncStorage.getItem(provider)
    //         if (value !== null) {
    //             const [token, secret, email] = JSON.parse(value)
    //             return  { token, secret, email }
    //             // return getProvider(provider).credential(token, secret)
    //         }
    //     } catch (error) {
    //         throw error
    //     }
    // }

    return { getUidByThirdPartySignIn }
}

const appleSignIn = async (setProfile: React.Dispatch<any>) => {
    // Start the sign-in request
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: AppleAuthRequestOperation.LOGIN,
            requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
        })
        setProfile({
            username: appleAuthRequestResponse.fullName,
            email: appleAuthRequestResponse.email,
            photo: '',
        })
        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw 'Apple Sign-In failed - no identify token returned'
        }
    
        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse
        return getProvider(SignType.Apple).credential(identityToken, nonce)
    } catch (e) {
        console.error('apple reror', e)
    }
}

const naverLogin = async (setToken: React.Dispatch<React.SetStateAction<string | null>>) => {
    const ioskeys = {
        kConsumerKey: 'qWhQYE6faHywP_zqIz05',
        kConsumerSecret: 'B8zVzYH9zZ',
        kServiceAppName: 'playpet',
        kServiceAppUrlScheme: 'com.playpet.me',
    }
      
    const androidkeys = {
        kConsumerKey: 'qWhQYE6faHywP_zqIz05',
        kConsumerSecret: 'B8zVzYH9zZ',
        kServiceAppName: 'playpet',
    }
    NaverLogin.login(Platform.OS === 'ios' ? ioskeys : androidkeys, (err, token) => {
        // setNaverToken(token)
        if (token) {
            setToken(token.refreshToken)
        }
    })
}

const getNaverProfile = async (token: string | null, setProfile: React.Dispatch<any>) => {
    if (!token) {
        return
    }
    const profileResult = await getProfile(token)
    if (!profileResult) {
        return
    }
    if (profileResult.resultcode === "024") {
      alert("로그인 실패")
      return
    }
    
    setProfile({
        username: profileResult.response.name,
        email: profileResult.response.email,
        photo: profileResult.response.profile_image,
    })
}

const kakaoLogin = async (setToken: React.Dispatch<React.SetStateAction<string | null>>) => {
    const result = await KakaoLogins.login()
    setToken(result.accessToken)
}

const getKakaoProfile = async (setProfile: React.Dispatch<any>) => {
    const result = await KakaoLogins.getProfile()
    setProfile({
        username: result.nickname,
        email: result.email,
        photo: result.profile_image_url || '',
    })
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