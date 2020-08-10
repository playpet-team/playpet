import { ToastParams } from '../components/Toast';
import { useCallback, useState } from 'react';
// import * as React from 'react';
import { signInCredential } from '../utils';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import KakaoLogins from '@react-native-seoul/kakao-login';
import { SignType } from '../models';
import AsyncStorage from '@react-native-community/async-storage';
const GOOGLE_WEB_CLIENT_ID = '386527552204-t1igisdgp2nm4q6aoel7a2j3pqdq05t6.apps.googleusercontent.com';
GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID });

const PROFILE_EMPTY = {
    id: 'profile has not fetched',
    email: 'profile has not fetched',
    profile_image_url: '',
};

const resetToastParams = {
    visible: false,
    title: '',
    description: '',
    image: '',
};
export default function useInitializeSignIn() {
    const [token, setToken] = useState<null | string>(null);
    const [profile, setProfile] = useState<any>(PROFILE_EMPTY);

    const getUidByThirdPartySignIn = useCallback(async (method: SignType, { toastContent, setToastContent }) => {
        let credential: FirebaseAuthTypes.AuthCredential | null = null;
        let email = '';
        try {
            switch (method) {
                case SignType.Google: {
                    await GoogleSignin.hasPlayServices();
                    const userInfo = await GoogleSignin.signIn();
                    email = userInfo.user.email;
                    credential = getProvider(SignType.Google).credential(userInfo.idToken);
                    break;
                }
                case SignType.Apple: {
                    credential = await appleSignIn();
                    break;
                }
                case SignType.Kakao: {
                    setToastContent({
                        ...toastContent,
                        visible: true,
                        title: '카카오는 아직 비즈니스 인증을 해야함',
                    })
                    break;
                    // kakaoLogin();
                    // credential = await appleSignIn();
                }
                case SignType.Facebook: {
                    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
                    if (result.isCancelled) {
                        break;
                    }
                    const data = await AccessToken.getCurrentAccessToken();
                    if (!data) {
                        setToastContent({
                            ...toastContent,
                            visible: true,
                            title: '인증 정보를 받아오는 작업을 실패했습니다',
                        });
                    } else {
                        credential = getProvider(SignType.Facebook).credential(data.accessToken);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
            console.log('credential-----', credential);
            if (credential !== null) {
                saveCredential(email, method, credential);
                try {
                    await signInCredential(credential);
                } catch (error) {
                    if (error.code != "auth/account-exists-with-different-credential") {
                        setToastContent({
                            ...toastContent,
                            visible: true,
                            title: '인증 정보를 받아오는 작업을 실패했습니다',
                        });
                    } else {
                        setToastContent({
                            ...toastContent,
                            visible: true,
                            title: '다른 로그인 방법으로 회원가입을 완료한 계정이 있습니다.',
                        });
                    }
                }
            }
        } catch (error) {
            setToastContent({
                ...toastContent,
                visible: true,
                title: '인증 정보를 받아오는 작업을 실패했습니다',
            });
        } finally {
            return toastContent;
        }
        
    }, []);

    const saveCredential = async (email: string, provider: string, credential: { token: string, secret: string; }) => {
        try {
            const saveData = JSON.stringify([credential.token, credential.secret, email])
            await AsyncStorage.setItem(
                provider,
                saveData
            );
        } catch (error) {
            throw error;
        }
    };

    // 아직은 쓸일은 없지만 언젠간 쓰이게 될것
    // const getCredential = async (provider: string) => {
    //     try {
    //         const value = await AsyncStorage.getItem(provider);
    //         if (value !== null) {
    //             const [token, secret, email] = JSON.parse(value);
    //             return  { token, secret, email };
    //             // return getProvider(provider).credential(token, secret);
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    const getProvider = (providerId: string) => {
        switch (providerId) {
            case SignType.Google:
                return auth.GoogleAuthProvider;
            case SignType.Facebook:
                return auth.FacebookAuthProvider;
            case SignType.Apple:
                return auth.AppleAuthProvider;
            default:
                throw new Error(`No provider implemented for ${providerId}`);
        }
    };

    const appleSignIn = useCallback(async () => {
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: AppleAuthRequestOperation.LOGIN,
            requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
        });

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw 'Apple Sign-In failed - no identify token returned';
        }

        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse;
        return getProvider(SignType.Apple).credential(identityToken, nonce);
    }, []);

    const kakaoLogin = async () => {
        const result = await KakaoLogins.login();
        console.log('kakaoLogin result', result);
        setToken(result.accessToken);
      };
    
    const kakaoLogout = async () => {
        const result = await KakaoLogins.logout();
        console.log('kakaoLogout result', result);
        setToken(null);
        setProfile(PROFILE_EMPTY);
    };
    
    const getProfile = async () => {
        const result = await KakaoLogins.getProfile();
        console.log('getProfile result', result);
        setProfile(result);
    };
    
    const unlinkKakao = async () => {
        const result = await KakaoLogins.unlink()
        console.log('unlinkKakao result', result);
        setToken(null);
        setProfile(PROFILE_EMPTY);
    };

    return {
        GoogleSignin,
        appleSignIn,
        kakao: {
            kakaoLogin,
            kakaoLogout,
            getProfile,
            unlinkKakao,
        },
        getUidByThirdPartySignIn,
    };
};
