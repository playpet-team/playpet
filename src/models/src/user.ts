import { FirebaseTimeStamp } from '../../utils';
export enum SignType {
    Google = 'GOOGLE',
    Apple = 'APPLE',
    Facebook = 'FACEBOOK',
    Kakao = 'KAKAO',
    Naver = 'NAVER',
    None = 'NONE',
}
export interface User {
    method: SignType
    uid: string
    email: string
    isLeave: boolean
    leaveAt: string
    username: string
    gender: string
    birthDate: string
    phoneNumber: string
    profilePhoto: string
    lastLogin: string | FirebaseTimeStamp | null
    createdAt: string | FirebaseTimeStamp | null
    updatedAt: string | FirebaseTimeStamp | null
    activePetDocId: string
    terms: {
        existDoc: boolean
        overAgeAgree: boolean
        termsOfUseAgree: boolean
        personalCollectAgree: boolean
        marketingAgree: boolean
    }
}
