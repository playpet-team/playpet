import { firebaseTimeStampToStringStamp } from './../system/index';
import { collections } from '../../models/src/collections';

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface CardModel {
    title: string;
    description: string;
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

export const submitCard = async (formData: CardModel) => {
    return await firestore().collection(collections.playground).add(formData);
};

export enum sortCards {
    CREATED_AT,
    HOT,
    ADS,
    COOP,
}
interface loadType {
    sortType?: sortCards;
    startAt?: number;
    limit?: number;
}
export const loadPlaygroundCards = async ({ sortType = sortCards.CREATED_AT, startAt = 0, limit = 100 }: loadType) => {
    const cardDoc = await firestore()
        .collection(collections.playground)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
    return cardDoc.docs.map(doc => {
        const docData = doc.data();
        return {
            ...docData,
            createdAt: firebaseTimeStampToStringStamp(docData.createdAt),
            updatedAt: firebaseTimeStampToStringStamp(docData.updatedAt),
        }
    });
};