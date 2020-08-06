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
    return await firestore().collection(collections.Playground).add(formData);
};

export enum SortCards {
    CreatedAt,
    Hot,
    Ads,
    Coop,
}
interface SortParams {
    sortType?: SortCards;
    startAt?: number;
    limit?: number;
}
export const loadPlaygroundCards = async ({ sortType = SortCards.CreatedAt, startAt = 0, limit = 100 }: SortParams) => {
    const cardDoc = await firestore()
        .collection(collections.Playground)
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