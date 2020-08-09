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

export default function useInitializeSignIn() {
    const [token, setToken] = useState<null | string>(null);
    const [profile, setProfile] = useState<any>(PROFILE_EMPTY);

    const getUidByThirdPartySignIn = useCallback(async (method: SignType) => {
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
                    console.log('go- kakao');
                    return alert('카카오는 아직 비즈니스 인증을 해야함');
                    kakaoLogin();
                    // credential = await appleSignIn();

                    break;
                }
                case SignType.Facebook: {
                    return alert('카카오는 아직 비즈니스 인증을 해야함');
                    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
                    if (result.isCancelled) {
                        break;
                    }
                    const data = await AccessToken.getCurrentAccessToken();
                    if (!data) {
                        throw 'error';
                    }
                    credential = getProvider(SignType.Facebook).credential(data.accessToken);
                    break;
                }
                default: {
                    break;
                }
            }
            if (credential !== null) {
                saveCredential(email, method, credential);
                let uid = '';
                try {
                    const { user } = await signInCredential(credential);
                    uid = user.uid;
                } catch (error) {
                    if (error.code != "auth/account-exists-with-different-credential") {
                        throw error;
                    }
                    alert('다른 로그인 방법으로 이미 회원가입을 한적이 있습니다.');
                }
                return uid;
            }
        } catch (error) {
            return 'error';
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
        kakaoApi: {
            kakaoLogin,
            kakaoLogout,
            getProfile,
            unlinkKakao,
        },
        getUidByThirdPartySignIn,
    };
};
