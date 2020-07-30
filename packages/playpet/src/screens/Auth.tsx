import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { useSelector } from 'react-redux';
import { AuthTapParamList } from '../navigation/BottomTabNavigator';
import { RootState } from '../store/rootReducers';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

const AuthBlock = styled.View`
    display: flex;
`;

GoogleSignin.configure({
    webClientId: '386527552204-t1igisdgp2nm4q6aoel7a2j3pqdq05t6.apps.googleusercontent.com'
});

export default function Auth() {
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            return auth().signInWithCredential(googleCredential);
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
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                />

            </AuthBlock>
        </SafeAreaView>
    );
};
