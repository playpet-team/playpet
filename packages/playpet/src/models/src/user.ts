import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export enum signEnum {
    GOOGLE = 'GOOGLE',
    APPLE = 'APPLE',
    FACEBOOK = 'FACEBOOK',
    KAKAO = 'KAKAO',
    NONE = 'NONE',
};
export interface User {
    method: signEnum;
    uid: string;
    email: string;
    isLeave: boolean;
    leaveAt: string;
    username: string;
    gender: string;
    birthDate: string;
    phoneNumber: string;
    profilePhoto: string,
    lastLogin: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    terms: {
        overAgeAgree: boolean;
        termsOfUseAgree: boolean;
        personalCollectAgree: boolean;
        marketingAgree: boolean;
    }
};
