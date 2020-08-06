import { withdrawCall } from './../../callable/auth';
import { withdraw } from './../../../../firefunction/src/auth/index';
import firestore from '@react-native-firebase/firestore';
import { appReload, firebaseTimeStampToStringStamp } from './../system/index';
import auth, { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { signEnum, collections, User } from '../../models';
import { initialState } from '../../store/authReducer';

export const signInWithCustomToken = (customToken: string) => auth().signInWithCustomToken(customToken);
export const signInCredential = async (credential: FirebaseAuthTypes.AuthCredential) => await auth().signInWithCredential(credential);
export const updateUserLastLogin = async (uid: string) => {
    await firestore().collection(collections.Users).doc(uid).update({
        lastLogin: firestore.Timestamp.now(),
    });
};

export const getUser = async (uid: string): Promise<User | null> => {
    const user = (await firestore().collection(collections.Users).doc(uid).get()).data();
    if (!user) {
        return null;
    }
    return {
        ...initialState,
        ...user,
        lastLogin: firebaseTimeStampToStringStamp(user.lastLogin),
        createdAt: firebaseTimeStampToStringStamp(user.createdAt),
        updatedAt: firebaseTimeStampToStringStamp(user.updatedAt),
    };
};

export enum CheckUser {
    Exists,
    Empty,
}
export const checkIsExistUser = (uid: string): Promise<CheckUser> => {
    return new Promise(function(resolve, reject) {
        try {
            firestore().collection(collections.Users).doc(uid).get().then(doc => {
                resolve(doc.exists ? CheckUser.Exists : CheckUser.Empty);
            });
        } catch (e) {
            reject('error');
            console.error('checkIsExistUser-----error----', e);
        }
    });
};

export const updateUserTerms = (uid: string, props: {}) => {
    firestore().collection(collections.Users).doc(uid).update({ terms: props });
};

export const signOut = async (type: signEnum) => {
    try {
        switch (type) {
            case signEnum.Google:
            default: {
                await GoogleSignin.signOut();
                break;
            }
        }
        await auth().signOut();
    } catch (error) {
        console.error(error);
    }
};

export const leave = async () => {
    try {
        await withdrawCall();
        auth().signOut();
    } catch (error) {
        console.error(error);
    }
}