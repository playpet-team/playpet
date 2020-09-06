import { useEffect, useState } from 'react'
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links'
import { Share } from 'react-native'
import { ANDROID_BUNDLE_IDENTIFY, IOS_BUNDLE_IDENTIFY, SEO_TITLE } from '../utils/system/constants'

function useShare({ id, title }: {
    id: string
    title: string
}) {
    const popupShare = async () => {
        const link = await buildLink(id, title)
        if (link) {
            const result = await Share.share({
                title: 'link',
                url: link,
            });
        }
    }
    return { popupShare }
}

export default useShare

async function buildLink(id: string, title: string) {
    const link = `https://playpet.me/playground/${id}`
    return await dynamicLinks().buildShortLink({
        link,
        // domainUriPrefix is created in your Firebase console
        domainUriPrefix: `https://playpetme.page.link`,
        // optional set up which updates Firebase analytics campaign
        // "banner". This also needs setting up before hand
        analytics: {
            campaign: 'share-card',
        },
        android: {
            packageName: ANDROID_BUNDLE_IDENTIFY,
            fallbackUrl: link,
        },
        ios: {
            bundleId: IOS_BUNDLE_IDENTIFY,
            fallbackUrl: link,
        },
        social: {
            title: SEO_TITLE,
            descriptionText: title,
        }
    })
    // return await dynamicLinks().buildLink({
    //     link,
    //     // domainUriPrefix is created in your Firebase console
    //     domainUriPrefix: `https://playpetme.page.link`,
    //     // optional set up which updates Firebase analytics campaign
    //     // "banner". This also needs setting up before hand
    //     analytics: {
    //         campaign: 'share-card',
    //     },
    //     android: {
    //         packageName: ANDROID_BUNDLE_IDENTIFY,
    //         fallbackUrl: link,
    //     },
    //     ios: {
    //         bundleId: IOS_BUNDLE_IDENTIFY,
    //         fallbackUrl: link,
    //     },
    //     social: {
    //         title: SEO_TITLE,
    //         descriptionText: title,
    //     }
    // })
}