import { useEffect, useState } from 'react'
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links'
import { Share } from 'react-native'

function useShare({ id, title }: {
    id: string
    title: string
}) {
    const popupShare = async () => {
        const link = await buildLink(id, title)
        console.log("link---", link)
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
    console.log("FirebaseDynamicLinksTypes.ShortLinkType.DEFAULT", FirebaseDynamicLinksTypes)
    return await dynamicLinks().buildLink({
        link,
        // domainUriPrefix is created in your Firebase console
        domainUriPrefix: `https://playpet${ __DEV__ ? '' : 'app'}.page.link`,
        // optional set up which updates Firebase analytics campaign
        // "banner". This also needs setting up before hand
        analytics: {
            campaign: 'share-card',
        },
        android: {
            packageName: 'com.playpet.android',
            fallbackUrl: link,
        },
        ios: {
            bundleId: 'comp.playpet.me',
            fallbackUrl: link,
        }
    })
}