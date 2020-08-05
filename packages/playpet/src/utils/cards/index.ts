import { collections } from '../../models/src/collections';

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface cardModel {
    title: string;
    tags: string[];
    uid: string;
    uploadMedia: {
        firebaseUrl: string;
        isVideo: boolean;
        width: number;
        height: number;
    }[];
    createdAt: FirebaseFirestoreTypes.Timestamp;
    updatedAt: FirebaseFirestoreTypes.Timestamp;
}
export const submitCard = async (formData: cardModel) => {
    return await firestore().collection(collections.playground).add(formData);
};
