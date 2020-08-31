import { withdrawCall } from './../../callable/auth'
import firestore from '@react-native-firebase/firestore'
import { firebaseTimeStampToStringStamp } from './../system/index'
import auth, { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'
import { SignType, collections, User } from '../../models'
import { initialState } from '../../store/authReducer'
import { LoginManager } from 'react-native-fbsdk'
import KakaoLogins from '@react-native-seoul/kakao-login'
import { NaverLogin } from '@react-native-seoul/naver-login'

export const firebaseNow = () => firestore.Timestamp.now()
export const currentUser = () => auth().currentUser
export const signInWithCustomToken = async (customToken: string) => await auth().signInWithCustomToken(customToken)
export const signInCredential = async (credential: FirebaseAuthTypes.AuthCredential) => await auth().signInWithCredential(credential)
export const updateUserLastLogin = async (uid: string) => {
    await firestore().collection(collections.Users).doc(uid).update({
        updatedAt: firebaseNow(),
        lastLogin: firebaseNow(),
    })
}

export const getUser = async (uid: string): Promise<User | null> => {
    const user = (await firestore().collection(collections.Users).doc(uid).get()).data()
    if (!user) {
        return null
    }
    console.log('user------------------@@@@@@@@@@@i n auth-------', user)
    return {
        ...initialState,
        ...user,
        lastLogin: firebaseTimeStampToStringStamp(user.lastLogin),
        createdAt: firebaseTimeStampToStringStamp(user.createdAt),
        updatedAt: firebaseTimeStampToStringStamp(user.updatedAt),
    }
}

export const getUserTerms = async (uid: string) => {
    const termsData = (await firestore().collection(collections.Terms).doc(uid).get()).data()
    if (termsData) {
        return {
            ...termsData,
            createdAt: firebaseTimeStampToStringStamp(termsData.createdAt),
            updatedAt: firebaseTimeStampToStringStamp(termsData.updatedAt),
        }
    }
    return termsData
}

export enum CheckUser {
    Exists,
    Empty,
}
export const checkIsExistUser = (uid: string): Promise<CheckUser> => {
    return new Promise(function(resolve, reject) {
        try {
            firestore().collection(collections.Users).doc(uid).get().then(doc => {
                resolve(doc.exists ? CheckUser.Exists : CheckUser.Empty)
            })
        } catch (e) {
            reject('error')
            console.error('checkIsExistUser-----error----', e)
        }
    })
}

export const updateUserTerms = async (uid: string, terms: {}) => {
    const docRef = firestore().collection(collections.Terms).doc(uid)
    const setParams = {
        ...terms,
        updatedAt: firebaseNow(),
        ...((await docRef.get()).exists ? {} : { createdAt: firebaseNow() })
    }
    docRef.set(setParams, { merge: true })
}

export const updateFcmToken = async (uid: string, fcmToken: string) => {
    const docRef = firestore().collection(collections.PushSettings).doc(uid)
    const setParams = {
        fcmToken,
        updatedAt: firebaseNow(),
        ...((await docRef.get()).exists ? {} : { createdAt: firebaseNow() })
    }
    docRef.set(setParams, { merge: true })
}

export const signOut = async (type: SignType = SignType.None) => {
    try {
        switch (type) {
            case SignType.Google: {
                await GoogleSignin.signOut()
                break
            }
            case SignType.Facebook: {
                LoginManager.logOut()
                break
            }
            case SignType.Apple: {
                break
            }
            case SignType.Kakao: {
                KakaoLogins.logout()
                break
            }
            case SignType.Naver: {
                NaverLogin.logout()
                break;
            }
        }
        await auth().signOut()
    } catch (error) {
        console.error(error)
    }
}

export const leave = async () => {
    try {
        await withdrawCall()
        auth().signOut()
    } catch (error) {
        console.error(error)
    }
}