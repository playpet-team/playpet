import { useCallback } from 'react';
// import * as React from 'react';
import { signInCredential } from '../utils';
import auth from '@react-native-firebase/auth';
import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { SignType } from '../models';

const GOOGLE_WEB_CLIENT_ID = '386527552204-t1igisdgp2nm4q6aoel7a2j3pqdq05t6.apps.googleusercontent.com';
GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID });


export default function useInitializeSignIn() {
    const getUidByThirdPartySignIn = useCallback(async (method: SignType): Promise<string> => {
        try {
            switch (method) {
                case SignType.Google: {
                    await GoogleSignin.hasPlayServices();
                    const userInfo = await GoogleSignin.signIn();
                    const credential = auth.GoogleAuthProvider.credential(userInfo.idToken);
                    const { user } = await signInCredential(credential);
                    return user.uid;
                }
                case SignType.Apple: {
                    const credential = await appleSignIn();
                    const { user } = await signInCredential(credential);
                    return user.uid;
                }
                case SignType.Facebook: {
                    // Attempt login with permissions
                    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

                    if (result.isCancelled) {
                        return 'canceled';
                    }
                    const data = await AccessToken.getCurrentAccessToken();
                    console.log('data------', data);
                    if (!data) {
                        throw 'error';
                    }
                    const credential = auth.FacebookAuthProvider.credential(data.accessToken);

                    const { user } = await signInCredential(credential);
                    return user.uid;
                }
                default: {
                    return 'another';
                }
            }
        } catch (e) {
            console.error('handleSignInWrapper---error---', e);
            return 'error';
        }
        
    }, []);

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
        return auth.AppleAuthProvider.credential(identityToken, nonce);
    }, []);

    return { GoogleSignin, appleSignIn, getUidByThirdPartySignIn };
}
