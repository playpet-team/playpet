import { firebaseTimeStampToStringStamp } from './../system/index';
import { collections } from '../../models/src/collections';

import firestore, { FirebaseFirestoreTypes, } from '@react-native-firebase/firestore';
import { manageCardLikes } from '../../callable';

export interface CardModel {
    status: 'active' | 'deactive';
    id: string;
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
    const { id } = firestore().collection(collections.Playground).doc();
    return await firestore().collection(collections.Playground).doc(id).set({
        ...formData,
        id,
    });
};

export const getMyCards = async (uid: string, sort?: string): Promise<CardModel[]> => {
    const myCards = await firestore()
        .collection(collections.Playground)
        .where('uid', '==', uid)
        .get();
    return myCards.docs.map(card => {
        const cardData = card.data();
        return {
            id: card.id,
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
            id: doc.id,
            ...docData,
            createdAt: firebaseTimeStampToStringStamp(docData.createdAt),
            updatedAt: firebaseTimeStampToStringStamp(docData.updatedAt),
        }
    });
};

export interface CardLike {
    uid: string;
    id: string;
    methods: 'add' | 'remove';
}
export const setCardLike = async ({ uid, id, methods = 'add' }: CardLike) => {
    const response = await manageCardLikes({ uid, id, methods });
};

// export interface UserAction {
//     cardLikes: string[];
//     createdAt: FirebaseFirestoreTypes.Timestamp;
//     updatedAt: FirebaseFirestoreTypes.Timestamp;
// }
export const getCardLikes = async (uid: string, onSnapCallback: Function) => {
    const listener = firestore().collection(collections.UserActions).doc(uid).onSnapshot(snapshot => {
        onSnapCallback(snapshot.data());
    });
    return listener;
    // if (!getDoc.exists) {
    //     return [];
    // }
    // const userActions = getDoc.data();
    // return userActions?.cardLikes || [];
};