import { PetAge } from './../../screens/ManageProducts/RegistrationPet/PetAgeSection';
import { PetSize } from './../../screens/ManageProducts/RegistrationPet/PetSizeSection';
import { FirebaseTimeStamp } from '../../utils';
import { PetTypes, ProductItem } from './../../utils/product/index';
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
    agreeTerms: boolean
    lastLogin: string | FirebaseTimeStamp | null
    createdAt: string | FirebaseTimeStamp | null
    updatedAt: string | FirebaseTimeStamp | null
    activePetDocId: string | null
    terms: Terms
    // activePet: MyPet
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
    petKind: string
    petSize: PetSize
    petAge: PetAge
    petThumbnail?: string
    createdAt: string | FirebaseTimeStamp | null
    updatedAt: string | FirebaseTimeStamp | null
}

export interface MyFeed {
    feedBrandId: string
    uid: string
    feedPackingUnit?: string
    feedItemId: string
    feedItem: ProductItem
    status: 'active' | 'deactive',
    percentage: number,
    createdAt: string | FirebaseTimeStamp | null
    updatedAt: string | FirebaseTimeStamp | null
}