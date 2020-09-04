import { useNavigation } from '@react-navigation/native'
import { createUser } from './../../callable/auth'
import { signInWithCustomToken, currentUser } from '.'
import { ToastParams } from '../../components/Toast'
import { useCallback, useState, useEffect } from 'react'

import auth from '@react-native-firebase/auth'
import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-community/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import KakaoLogins, { IProfile, KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login'

import { SignType } from '../../models'
import AsyncStorage from '@react-native-community/async-storage'
import useLoadingIndicator from '../../hooks/useLoadingIndicator'

const GOOGLE_WEB_CLIENT_ID = '386527552204-t1igisdgp2nm4q6aoel7a2j3pqdq05t6.apps.googleusercontent.com'
GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID })

export default function initializeSignIn({ toastContent, setToastContent }: {
    toastContent: ToastParams
    setToastContent: React.Dispatch<React.SetStateAction<ToastParams>>
}) {
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const [isSignUp, setIsSignUp] = useState<boolean | null>(null)
    // const [credential, setCredential] = useState<FirebaseAuthTypes.AuthCredential | null>(null)
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
        if (isSignUp === null) {
            return
        }
        isSignUp ? navigation.navigate('AppLoginAgreeTerms') : navigation.goBack()
    }, [isSignUp])

    useEffect(() => {
        getCredential()
        async function getCredential() {
            console.log('????????????????????')
            if (token && profile && method) {
                try {
                    setLoading(true)
                    console.log('data', profile, method)
                    const { data } = await createUser({
                        ...profile,
                        method,
                    })
                    console.log('data', data)
                    const customToken = data.token
                    if (!customToken) {
                        setLoading(false)
                        return
                    }
                    
                    try {
                        console.log('2', customToken)
                        await signInWithCustomToken(customToken)
                        saveCustomToken({
                            customToken,
                            email: profile.email,
                            provider: method,
                        })
                        const success = checkUser()
                        if (success) {
                            setIsSignUp(data.newUser)
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
                    } finally {
                        setLoading(false)
                    }
                } catch (e) {
                    console.error('getCredential----', e)
                } finally {
                    setLoading(false)
                }
            }
        }
    }, [token, profile, method])

    const getUidByThirdPartySignIn = useCallback(async (method: SignType) => {
        console.log('0')
        setLoading(true)
        setMethod(method)
        try {
            switch (method) {
                case SignType.Google: {
                    console.log('1')
                    await GoogleSignin.hasPlayServices()
                    console.log('2', GoogleSignin)
                    const userInfo = await GoogleSignin.signIn()
                    console.log('3', userInfo)
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
                    // await naverLogin(setToken)
                    // await getNaverProfile(token, setProfile)
                    break
                }
                default: {
                    break
                }
            }
        } catch (error) {
            console.log("error-----", JSON.stringify(error))
            setLoading(false)
            setToastContent({
                ...toastContent,
                visible: true,
                title: '인증 정보를 받아오는 작업을 실패했습니다',
            })
        } finally {
            return toastContent
        }
        
    }, [])

    
    const saveCustomToken = useCallback(async (putData: AsyncStorageCustomToken) => {
        try {
            const saveData = JSON.stringify(putData)
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

    return { getUidByThirdPartySignIn, loading, Indicator }
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

// const naverLogin = async (setToken: React.Dispatch<React.SetStateAction<string | null>>) => {
//     const ioskeys = {
//         kConsumerKey: 'qWhQYE6faHywP_zqIz05',
//         kConsumerSecret: 'B8zVzYH9zZ',
//         kServiceAppName: 'playpet',
//         kServiceAppUrlScheme: 'com.playpet.me',
//     }
      
//     const androidkeys = {
//         kConsumerKey: 'qWhQYE6faHywP_zqIz05',
//         kConsumerSecret: 'B8zVzYH9zZ',
//         kServiceAppName: 'playpet',
//     }
//     NaverLogin.login(Platform.OS === 'ios' ? ioskeys : androidkeys, (err, token) => {
//         // setNaverToken(token)
//         if (token) {
//             setToken(token.refreshToken)
//         }
//     })
// }

// const getNaverProfile = async (token: string | null, setProfile: React.Dispatch<any>) => {
//     if (!token) {
//         return
//     }
//     const profileResult = await getProfile(token)
//     if (!profileResult) {
//         return
//     }
//     if (profileResult.resultcode === "024") {
//       alert("로그인 실패")
//       return
//     }
    
//     setProfile({
//         username: profileResult.response.name,
//         email: profileResult.response.email,
//         photo: profileResult.response.profile_image,
//     })
// }

const kakaoLogin = async (setToken: React.Dispatch<React.SetStateAction<string | null>>) => {
    const result = await KakaoLogins.login([KAKAO_AUTH_TYPES.Talk])
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

export interface AsyncStorageCustomToken {
    customToken: string;
    email: string;
    provider: SignType;       
}