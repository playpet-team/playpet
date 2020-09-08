import { firebaseTimeStampToStringStamp } from './../system/index';
import { Collections } from '../../models/src/collections';

import firestore, { FirebaseFirestoreTypes, } from '@react-native-firebase/firestore';
import { Api } from '../../api';
import { currentUser } from '../auth';
import * as Sentry from "@sentry/react-native";

export interface CardModel {
    status: 'active' | 'deactive';
    id: string;
    username: string;
    title: string;
    description: string;
    tags: string[];
    uid: string;
    likes: number;
    contents: {
        url: string;
        videoThumbnail: string;
        isVideo: boolean;
        width: number;
        height: number;
    }[];
    createdAt: FirebaseFirestoreTypes.Timestamp;
    updatedAt: FirebaseFirestoreTypes.Timestamp;
}

export const submitCard = async (formData: CardModel) => {
    const { id } = firestore().collection(Collections.Playground).doc();
    return await firestore().collection(Collections.Playground).doc(id).set({
        ...formData,
        id,
    });
};

export const getMyCards = async (uid: string, sort?: string): Promise<CardModel[]> => {
    try {
        const myCards = await firestore()
        .collection(Collections.Playground)
        .where('uid', '==', uid)
        .where('status', '==', 'active')
        .get();

        return myCards.docs.map(card => {
            const cardData = card.data();
            return {
                id: card.id,
                username: cardData.username,
                status: cardData.status,
                title: cardData.title,
                description: cardData.description,
                tags: cardData.tags,
                uid: cardData.uid,
                likes: cardData.likes,
                contents: cardData.contents,
                createdAt: cardData.createdAt,
                updatedAt: cardData.updatedAt,
            };
        })
    } catch (e) {
        Sentry.captureException(e)
        return []
    }
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
    try {
        const cardDoc = await firestore()
            .collection(Collections.Playground)
            .orderBy('createdAt', 'desc')
            .limit(limit)
            .get();

        return cardDoc.docs.map(doc => {
            const docData = doc.data();
            return {
                id: doc.id,
                ...docData,
                createdAt: firebaseTimeStampToStringStamp(docData.createdAt),
                updatedAt: firebaseTimeStampToStringStamp(docData.updatedAt),
            }
        });
    } catch (e) {
        Sentry.captureException(e)
        return []
    }

};

export interface CardLike {
    uid: string;
    id: string;
    methods: 'add' | 'remove';
}
export const setCardLike = async ({ uid, id, methods = 'add' }: CardLike) => {
    const user = currentUser()
    if (!user || !uid) {
        alert('회원가입이 필요합니다')
        return
    }
    try {
        await Api.post('/playground/likes', { uid, id, methods })
    } catch (e) {
        Sentry.captureException(e)
    }
};

export interface FollowProps {
    myUid: string;
    followingUid: string;
    methods: 'add' | 'remove';
}
export const setUserFollow = async ({ myUid, followingUid, methods = 'add' }: FollowProps) => {
    const user = currentUser()
    if (!user || !myUid) {
        alert('회원가입이 필요합니다')
        return
    }
    try {
        await Api.post('/playground/follow', { myUid, followingUid, methods })
    } catch (e) {
        Sentry.captureException(e)
    }
};

export const addListenerCardLikes = async (uid: string, onSnapCallback: Function) => {
    const listener = firestore().collection(Collections.UserActions).doc(uid).onSnapshot(snapshot => {
        if (snapshot) {
            onSnapCallback(snapshot.data());
        }
    });
    return listener;
};