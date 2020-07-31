import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducers';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { authActions } from '../store/authReducer';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import appleAuth, {
    AppleButton,
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import { appReload } from '../utils';

const AuthBlock = styled.View`
    display: flex;
`;

GoogleSignin.configure({
    webClientId: '386527552204-t1igisdgp2nm4q6aoel7a2j3pqdq05t6.apps.googleusercontent.com';
});

const signInCredential = (credential: FirebaseAuthTypes.AuthCredential) => {
    auth().signInWithCredential(credential);
};

export default function AuthScreen() {
    const { isLogged } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();

    const signOut = async () => {
        try {
            // await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await auth().signOut();
            dispatch(authActions.signOut());
            appReload();
        } catch (error) {
            console.error(error);
        }
    };

    const onAppleButtonPress = async () => {
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
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

        // Sign the user in with the credential
        signInCredential(appleCredential);
        dispatch(authActions.signIn());
    };

    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            console.log('userInfo-----', userInfo);
            signInCredential(googleCredential);
            dispatch(authActions.signIn());
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const navigation = useNavigation();
    // const { profileImage } = useSelector((state: RootState) => state.auth);
    return (
        <SafeAreaView>
            <AuthBlock>
                <Text>우리 가족</Text>
                <TouchableOpacity
                    onPress={() => navigation.push('AuthSettings')}
                >
                    <Text>oeuth</Text>
                </TouchableOpacity>

                {isLogged ?
                    <TouchableOpacity
                        onPress={signOut}
                    >
                        <Text>로그아웃</Text>
                    </TouchableOpacity>
                    :
                    <>
                        <GoogleSigninButton
                            style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={googleSignIn}
                        />
                        <AppleButton
                            buttonStyle={AppleButton.Style.WHITE}
                            buttonType={AppleButton.Type.SIGN_IN}
                            style={{
                                width: 160,
                                height: 45,
                            }}
                            onPress={onAppleButtonPress}
                        />
                    </>
                }

            </AuthBlock>
        </SafeAreaView>
    );
};
