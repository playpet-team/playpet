import { FirebaseTimeStamp } from '../../utils';
import { PetTypes } from './../../utils/product/index';
export enum SignType {
    Email = 'EMAIL',
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
    terms: Terms
    activePet: MyPet
}

export interface Terms {
    existDoc: boolean
    overAgeAgree: boolean
    termsOfUseAgree: boolean
    personalCollectAgree: boolean
    marketingAgree: boolean
    createdAt: string | FirebaseTimeStamp | null
    updatedAt: string | FirebaseTimeStamp | null
}

export interface MyPet {
    petName: string
    petType: PetTypes
    searchPetType: string
    size: string
    favorite: string
    createdAt: string | FirebaseTimeStamp | null
    updatedAt: string | FirebaseTimeStamp | null
}