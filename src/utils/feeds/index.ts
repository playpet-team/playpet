import { ProductItem, getProductList } from './../product/index';
import { firebaseNow } from './../auth/index';
import firestore from '@react-native-firebase/firestore';
import * as Sentry from "@sentry/react-native";
import { Api } from '../../api';
import { Collections } from '../../models';
import { MyFeed } from './../../models/src/user';
import { firebaseTimeStampToStringStamp } from './../system/index';

export const updateFeedItems = async (uid: string, feedInformation: {
    feedItemId: string
    feedBrandId: string
    feedPackingUnit: string
}) => {
    try {
        console.log('feedPackingUnit------', feedInformation.feedPackingUnit)
        await firestore().collection(Collections.Management).doc(uid).set({
            uid,
            feedItemId: feedInformation.feedItemId,
            feedBrandId: feedInformation.feedBrandId,
            feedPackingUnit: feedInformation.feedPackingUnit,
            // ...feedInformation,
            status: 'active',
            percentage: 100,
            createdAt: firebaseNow(),
            updatedAt: firebaseNow(),
        })
    } catch (e) {
        Sentry.captureException(e)
        return null
    }
}

export const updateFeedPercentage = async (uid: string, percentage: number) => {
    try {
        await firestore().collection(Collections.Management).doc(uid).update({
            percentage,
            updatedAt: firebaseNow(),
        })
    } catch (e) {
        Sentry.captureException(e)
        return null
    }
}

export const getFeedsDoc = async (uid: string) => {
    try {
        const feedDocs = (await firestore()
            .collection<MyFeed>(Collections.Management)
            .doc(uid)
            .get())

        if (!feedDocs.exists) {
            return
        }
        const feedData = feedDocs.data()
        if (!feedData) {
            return
        }

        const feeds = await getProductList()
        if (!feeds) {
            return
        }
        const findItem = feeds.find((feed) => feed.id ===feedData.feedItemId)

        // const productData = (await firestore()
        //     .collection<ProductItem>(Collections.Products)
        //     .doc(feedData.feedItemId)
        //     .get()).data()

        if (!findItem) {
            return
        }

        return {
            ...feedData,
            feedItem: findItem,
            // createdAt: firebaseTimeStampToStringStamp(feedData.createdAt),
            // updatedAt: firebaseTimeStampToStringStamp(feedData.updatedAt),
        }
        // return feedDocs.docs.map(doc => {
        //     const feedData = doc.data() as MyFeed
        //     return {
        //         ...feedData,
        //         createdAt: firebaseTimeStampToStringStamp(feedData.createdAt),
        //         updatedAt: firebaseTimeStampToStringStamp(feedData.updatedAt),
        //     }
        // })
    } catch (e) {
        Sentry.captureException(e)
        return
    }
}