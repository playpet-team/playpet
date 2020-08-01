import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducers';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { authActions } from '../store/authReducer';
import auth from '@react-native-firebase/auth';

import {
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

import appleAuth, {
    AppleButton,
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import { signOut, signType, signInCredential } from '../utils';
import useInitializeSignIn from '../hooks/useSignIn';

const AuthBlock = styled.View`
    display: flex;
`;
export default function AuthScreen() {
    const { isLogged } = useSelector((state: RootState) => state.auth);
    const [GoogleSignin] = useInitializeSignIn();

    const dispatch = useDispatch();

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
                        onPress={() => signOut(signType.GOOGLE)}
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
                                width: 192,
                                height: 48,
                            }}
                            onPress={appleSignIn}
                        />
                    </>
                }

            </AuthBlock>
        </SafeAreaView>
    );
};
