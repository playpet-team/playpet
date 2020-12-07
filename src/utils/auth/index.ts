import { PetAge } from './../../screens/ManageProducts/RegistrationPet/PetAgeSection';
import { PetSize } from './../../screens/ManageProducts/RegistrationPet/PetSizeSection';
import { PetTypes } from './../product/index';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import KakaoLogins from '@react-native-seoul/kakao-login';
import * as Sentry from "@sentry/react-native";
import { LoginManager } from 'react-native-fbsdk';
import { Api } from '../../api';
import { Collections, SignType, User } from '../../models';
import { initialState } from '../../store/authReducer';
import { ShippingInformation } from './../../hooks/useShippingDestination';
import { MyFeed, MyPet, Terms } from './../../models/src/user';
import { firebaseTimeStampToStringStamp } from './../system/index';

export enum Status {
    ACTIVE = 'active',
    DEACTIVE = 'deactive',
    EXPIRED = 'expired',
}

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
        const userData = (await firestore().collection<{ customToken: string }>(Collections.AuthTokens).doc(uid).get()).data()
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
        const userData = (await firestore().collection<User>(Collections.Users).doc(uid).get()).data()
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
    const terms = (await firestore().collection<Terms>(Collections.Terms).doc(uid).get()).data()
    if (!terms) {
        return {}
    }
    return {
        ...terms,
        createdAt: firebaseTimeStampToStringStamp(terms.createdAt),
        updatedAt: firebaseTimeStampToStringStamp(terms.updatedAt),
    }
}

export const getUserShippingDestination = async (uid: string) => {
    const shippingDocs = (await firestore()
        .collection<ShippingInformation>(Collections.ShippingDestination)
        .where('uid', '==', uid)
        .orderBy('createdAt', 'desc')
        .get())
    return shippingDocs.docs.map(ship => {
        const shippingData = ship.data() 
        return {
            ...shippingData,
            id: ship.id,
            createdAt: firebaseTimeStampToStringStamp(shippingData.createdAt),
            updatedAt: firebaseTimeStampToStringStamp(shippingData.updatedAt),
        }
    })
}

export const updateUserShippingDestination = async (uid: string, data: any) => {
    await firestore().collection(Collections.ShippingDestination).add({
        ...data,
        uid,
        createdAt: firebaseNow(),
        updatedAt: firebaseNow(),
    })
}

export const addUserCardInformation = async (uid: string, data: any) => {
    await firestore().collection(Collections.CardInformations).add({
        ...data,
        status: Status.ACTIVE,
        uid,
        createdAt: firebaseNow(),
        updatedAt: firebaseNow(),
    })
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

    firestore().collection(Collections.Users).doc(uid).update({
        agreeTerms: true,
        updatedAt: firebaseNow(),
    })
}

export const updateUserPets = async (uid: string, petInformation: {
    petName: string
    petType: PetTypes
    petKind: string
    petSize: PetSize
    petAge: PetAge
}) => {
    try {
        const userDoc = firestore().collection(Collections.Users).doc(uid)
        const { id } = userDoc.collection(Collections.UserPets).doc()
    
        await userDoc.collection(Collections.UserPets).doc(id).set({
            ...petInformation,
            createdAt: firebaseNow(),
            updatedAt: firebaseNow(),
        })
        await userDoc.update({
            activePetDocId: id,
            updatedAt: firebaseNow(),
        })
        return id
    } catch (e) {
        Sentry.captureException(e)
        return null
    }
}

export const resetUserActivePetDocId = async (uid: string) => {
    try {
        await firestore()
            .collection(Collections.Users)
            .doc(uid)
            .update({
                activePetDocId: '',
                updatedAt: firebaseNow(),
            })
    } catch (e) {
        Sentry.captureException(e)
    }
}

export const getPetDoc = async (uid: string, petDocId: string) => {
    try {
        const petData = (await firestore()
            .collection(Collections.Users)
            .doc(uid)
            .collection(Collections.UserPets)
            .doc(petDocId)
            .get())
            .data() as MyPet
        if (!petData) {
            return null
        }
        return {
            ...petData,
            createdAt: firebaseTimeStampToStringStamp(petData.createdAt),
            updatedAt: firebaseTimeStampToStringStamp(petData.updatedAt),
        }
    } catch (e) {
        Sentry.captureException(e)
        return null
    }
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