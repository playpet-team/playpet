import { appReload } from './../system/index';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

export const signInWithCustomToken = (customToken: string) => auth().signInWithCustomToken(customToken);

export const signInCredential = (credential: FirebaseAuthTypes.AuthCredential) => auth().signInWithCredential(credential);

export enum signType {
    GOOGLE,
    APPLE,
    FACEBOOK,
    KAKAO,
};
export const signOut = async (type: signType) => {
    try {
        switch (type) {
            case signType.GOOGLE:
            default: {
                await GoogleSignin.signOut();
            }
        }
        await auth().signOut();
        appReload();
    } catch (error) {
        console.error(error);
    }
};