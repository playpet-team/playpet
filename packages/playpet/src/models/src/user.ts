
export enum signType {
    GOOGLE,
    APPLE,
    FACEBOOK,
    KAKAO,
    NONE,
};
export interface User {
    method: signType;
    uid: string;
    isLeave: boolean;
    leaveAt: string;
    username: string;
    gender: string;
    birthDate: string;
    phoneNumber: string;
    photo: string,
    createdAt: string;
    updatedAt: string;
};
