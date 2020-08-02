import firestore from '@react-native-firebase/firestore';
import { appReload } from './../system/index';
import auth, { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { signEnum, collections, User } from '../../models';
import moment from 'moment';
import { initialState } from '../../store/authReducer';

export const signInWithCustomToken = (customToken: string) => auth().signInWithCustomToken(customToken);
export const signInCredential = async (credential: FirebaseAuthTypes.AuthCredential) => await auth().signInWithCredential(credential);
export const updateUserLastLogin = async (uid: string) => {
    await firestore().collection(collections.users).doc(uid).update({
        lastLogin: firestore.Timestamp.now(),
    });
};

export const getUser = async (uid: string): Promise<User | null> => {
    const user = (await firestore().collection(collections.users).doc(uid).get()).data();
    if (!user) {
        return null;
    }
    return {
        ...initialState,
        ...user,
        lastLogin: moment(user.lastLogin.seconds).toString(),
        createdAt: moment(user.createdAt.seconds).toString(),
        updatedAt: moment(user.updatedAt.seconds).toString(),
    };
};

export enum isExistsUserType {
    exists,
    empty,
}
export const checkIsExistUser = (uid: string): Promise<isExistsUserType> => {
    return new Promise(function(resolve, reject) {
        try {
            firestore().collection(collections.users).doc(uid).get().then(doc => {
                resolve(doc.exists ? isExistsUserType.exists : isExistsUserType.empty);
            });
        } catch (e) {
            reject('error');
            console.error('checkIsExistUser-----error----', e);
        }
    });
};

export const updateUserTerms = (uid, props) => {
    firestore().collection(collections.users).doc(uid).update({ terms: props });
};

export const signOut = async (type: signEnum) => {
    try {
        switch (type) {
            case signEnum.GOOGLE:
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