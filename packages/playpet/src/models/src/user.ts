
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
    isLeave: boolean;
    leaveAt: string;
    username: string;
    gender: string;
    birthDate: string;
    phoneNumber: string;
    photo: string,
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    terms: {
        overAgeAgree: boolean;
        termsOfUseAgree: boolean;
        personalCollectAgree: boolean;
        marketingAgree: boolean;
    }
};
