import { GoogleSignin } from '@react-native-community/google-signin'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import KakaoLogins from '@react-native-seoul/kakao-login'
import * as Sentry from "@sentry/react-native"
import { LoginManager } from 'react-native-fbsdk'
import { Api } from '../../api'
import { Collections, SignType, User } from '../../models'
import { initialState } from '../../store/authReducer'
import { firebaseTimeStampToStringStamp } from './../system/index'
// import { NaverLogin } from '@react-native-seoul/naver-login'

export const firebaseNow = () => firestore.Timestamp.now()
export const currentUser = () => auth().currentUser
export const signInWithCustomToken = async (customToken: string) => await auth().signInWithCustomToken(customToken)
export const signInCredential = async (credential: FirebaseAuthTypes.AuthCredential) => await auth().signInWithCredential(credential)
export const updateUserLastLogin = async (uid: string) => {
    await firestore().collection(Collections.Users).doc(uid).update({
        updatedAt: firebaseNow(),
        lastLogin: firebaseNow(),
    })
}
export const updateUserAuthToken = async (uid: string, customToken: string) => {
    await firestore().collection(Collections.AuthTokens).doc(uid).set({
        updatedAt: firebaseNow(),
        customToken,
    }, { merge: true })
}

export const getUserAuthToken = async (uid: string) => {
    try {
        const userData = (await firestore().collection(Collections.AuthTokens).doc(uid).get()).data() as { customToken: string }
        return userData || null
    } catch (e) {
        Sentry.captureException(e)
        return null
    }
}

export const updateUserProfilePhoto = async (uid: string, profilePhoto: string) => {
    await firestore().collection(Collections.Users).doc(uid).update({
        profilePhoto,
        updatedAt: firebaseNow(),
    })
}

export const updateUsername = async (uid: string, username: string) => {
    await firestore().collection(Collections.Users).doc(uid).update({
        username,
        updatedAt: firebaseNow(),
    })
}

export const getUserDoc = async (uid: string) => {
    try {
        const userData = (await firestore().collection(Collections.Users).doc(uid).get()).data() as User
        return userData || null
    } catch (e) {
        Sentry.captureException(e)
        return null
    }
}

export const getUser = async (uid: string): Promise<User | null> => {
    const user = await getUserDoc(uid)
    if (!user) {
        return null
    }
    return {
        ...initialState,
        ...user,
        lastLogin: firebaseTimeStampToStringStamp(user.lastLogin),
        createdAt: firebaseTimeStampToStringStamp(user.createdAt),
        updatedAt: firebaseTimeStampToStringStamp(user.updatedAt),
    }
}

export const getUserTerms = async (uid: string) => {
    return (await firestore().collection(Collections.Terms).doc(uid).get()).data() as Pick<User, 'terms'>
}

// export enum CheckUser {
//     Exists,
//     Empty,
// }
// export const checkIsExistUser = async (uid: string): Promise<CheckUser> => {
//     // return new Promise(function(resolve, reject) {
//         try {
//             // firestore().collection(Collections.Users).doc(uid).get().then(doc => {
//             //     resolve(doc.exists ? CheckUser.Exists : CheckUser.Empty)
//             // })
//             const doc = await firestore().collection(Collections.Users).doc(uid).get()
//             return doc.exists ? CheckUser.Exists : CheckUser.Empty
//         } catch (e) {
//             Sentry.captureException(e)
//             return 'error'
//         }
//     // })
// }

export const updateUserTerms = async (uid: string, terms: {}) => {
    const docRef = firestore().collection(Collections.Terms).doc(uid)
    const setParams = {
        ...terms,
        updatedAt: firebaseNow(),
        ...((await docRef.get()).exists ? {} : { createdAt: firebaseNow() })
    }
    docRef.set(setParams, { merge: true })
}

export const updateUserPets = async (uid: string, petInformation: {}) => {
    const userDoc = firestore().collection(Collections.Users).doc(uid)
    const { id } = userDoc.collection('pets').doc()

    await userDoc.collection('pets').doc(id).set({
        ...petInformation,
        createdAt: firebaseNow(),
        updatedAt: firebaseNow(),
    })
    await userDoc.update({
        activePetDocId: id,
        updatedAt: firebaseNow(),
    })

    return id
    // const setParams = {
    //     ...terms,
    //     updatedAt: firebaseNow(),
    //     ...((await userDoc.get()).exists ? {} : { createdAt: firebaseNow() })
    // }
    // docRef.set(setParams, { merge: true })
}



export const updateFcmToken = async (uid: string, fcmToken: string) => {
    const docRef = firestore().collection(Collections.PushSettings).doc(uid)
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
                // NaverLogin.logout()
                break;
            }
        }
        await auth().signOut()
    } catch (e) {
        Sentry.captureException(e)
    }
}

export const leave = async () => {
    try {
        const user = currentUser()
        if (!user) {
            return
        }
        const { data } = await Api.post('/auth/withdraw', {
            uid: user.uid
        })
        // await withdrawCall()
        auth().signOut()
    } catch (e) {
        Sentry.captureException(e)
    }
}