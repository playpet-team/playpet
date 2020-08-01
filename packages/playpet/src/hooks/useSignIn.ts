// import * as React from 'react';
import { signInCredential } from '../utils';
import auth from '@react-native-firebase/auth';
import appleAuth, {
    AppleButton,
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
// import { createUserCollection, checkIsExistUser } from '../callable';

import { GoogleSignin } from '@react-native-community/google-signin';
import { signEnum } from '../models';

const GOOGLE_WEB_CLIENT_ID = '386527552204-t1igisdgp2nm4q6aoel7a2j3pqdq05t6.apps.googleusercontent.com';
GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID });


export default function useInitializeSignIn() {
    const getUidByThirdPartySignIn = async (method: signEnum): Promise<string> => {
        try {
            switch (method) {
                case signEnum.GOOGLE: {
                    await GoogleSignin.hasPlayServices();
                    const userInfo = await GoogleSignin.signIn();
                    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
                    const { user } = await signInCredential(googleCredential);
                    return user.uid;
                    // uid = user.uid;
                    // break;
                }
                case signEnum.APPLE: {
                    const credential = await appleSignIn();
                    const { user } = await signInCredential(credential);
                    return user.uid;
                    // uid = user.uid;
                    // break;
                }
                default: {
                    return 'another';
                }
            }
            // updateRefreshToken({
            //     uid,
            //     token: user.refreshToken
            // })
            // const { data } = await checkIsExistUser(uid);
            
            // if (data.result === 'empty') {
            //     return data;
            // }

            // const res = await createUserCollection({
            //     uid,
            //     method,
            // });
            // console.log("@@@@@@@@!!!!!!", res);
            // return res.data;
        } catch (e) {
            console.error('handleSignInWrapper---error---', e);
            return 'error';
            // return { result: 'error' };
        }
    };

    const appleSignIn = async () => {
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
    };
    return { GoogleSignin, appleSignIn, getUidByThirdPartySignIn };
}
