import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope
} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import * as Sentry from "@sentry/react-native";
import { useCallback, useEffect, useState } from 'react';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { currentUser, signInWithCustomToken, updateUserAuthToken } from '.';
import { Api } from '../../api';
import { ToastParams } from '../../components/Toast';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import { SignType } from '../../models';



const DEV_GOOGLE_WEB_CLIENT_ID = '386527552204-t1igisdgp2nm4q6aoel7a2j3pqdq05t6.apps.googleusercontent.com'
const PROD_GOOGLE_WEB_CLIENT_ID = '952410130595-ro7ouus2ia8rtj64guknh8dn91e5o7ns.apps.googleusercontent.com'
GoogleSignin.configure({ webClientId: __DEV__ ? DEV_GOOGLE_WEB_CLIENT_ID : PROD_GOOGLE_WEB_CLIENT_ID })

export default function initializeSignIn({ toastContent, setToastContent }: {
    toastContent: ToastParams
    setToastContent: React.Dispatch<React.SetStateAction<ToastParams>>
}) {
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const [isSignUp, setIsSignUp] = useState<boolean | null>(null)
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
        if (isSignUp === true) {
            analytics().logSignUp({ method })
        }
        // navigation.goBack()
    }, [isSignUp])

    useEffect(() => {
        getCredential()
        async function getCredential() {
            if (token && profile && method) {
                try {
                    console.log("111")
                    if (!profile.email) {
                        setToastContent({
                            ...toastContent,
                            visible: true,
                            title: '이메일 정보를 받아 올수 없습니다. 잠시 후 다시 시도해주세요',
                        })
                        setLoading(false)
                        Sentry.captureException('getCredential-이메일 정보를 받아 올수 없습니다. 잠시 후 다시 시도해주세요')
                        return
                    }
                    console.log("22")
                    setLoading(true)
                    const { customToken, uid, newUser } = await postCreateUser()
                    console.log('customToken, uid, newUser----------', customToken, uid, newUser)
                    if (!customToken || !uid || typeof newUser !== 'boolean') {
                        Sentry.captureException(`getCredential-no-information-from-postCreateUser-${uid}-${newUser}`)
                        setLoading(false)
                        return
                    }
                    console.log("33")
                    
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
                            setIsSignUp(newUser)
                        }
        
                    } catch (e) {
                        Sentry.captureException(`getCredential-${e}`)
                        if (e.code != "auth/account-exists-with-different-credential") {
                            setToastContent({
                                ...toastContent,
                                visible: true,
                                title: '로그인에 실패하였습니다',
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
                    Sentry.captureException(`getCredential-${e}`)
                } finally {
                    setLoading(false)
                }
            }
        }
    }, [token, profile, method])

    const getUidByThirdPartySignIn = useCallback(async (method: SignType) => {
        setLoading(true)
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
                            title: '페이스북 인증 정보를 받아오는 작업을 실패했습니다',
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
        } catch (e) {
            Sentry.captureException(`getCredential-${e}`)
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

    const checkUser = () => {
        const user = currentUser()
        if (!user) {
            Sentry.captureException('checkUser-회원정보를 찾을 수 없습니다')
            setToastContent({
                ...toastContent,
                visible: true,
                title: '회원정보를 찾을 수 없습니다',
            })
            return
        }
        return true
    }

    const postCreateUser = useCallback(async () => {
        try {
            console.log('a')
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
            console.log('bb', newUser, typeof newUser)
    
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

    return { getUidByThirdPartySignIn, isSignUp, loading, Indicator }
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
    console.log('result', result)
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