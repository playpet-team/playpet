import firestore from '@react-native-firebase/firestore';
import { Timestamp } from '@firebase/firestore-types';
import * as Sentry from "@sentry/react-native";
import { Collections } from '../../models/src/collections';

type NoticeType = 'notice' | 'qna'
export interface Notice {
    createdAt: Timestamp
    description: string
    link: string
    title: string
    status: 'active' | 'deactive'
    type: NoticeType
    updatedAt: Timestamp
}

export const getNotices = async (type: NoticeType) => {
    try {
        const notices = await firestore()
            .collection(Collections.Notices)
            .where('type', '==', type)
            .where('status', '==', 'active')
            .orderBy('updatedAt', 'desc')
            .get()

        console.log("notices", notices.size)
        if (notices.size > 0) {
            return notices.docs.map((notice: any) => (notice.data() as Notice))
        }
        return []
    } catch (e) {
        console.log('???', e)
        Sentry.captureException(e)
        return []
    }
    
}