export * from './permission'
import { NativeModules, Dimensions } from 'react-native'
import moment from 'moment'
import * as Linking from 'expo-linking'
import * as Sentry from "@sentry/react-native";

export const appReload = () => {
    return NativeModules.DevSettings.reload()
}

export const deviceSize = () => {
    const { width, height } = Dimensions.get('window')
    return { width, height }
}

export interface FirebaseTimeStamp {
    nonoseconds: number
    seconds: number
}
export const firebaseTimeStampToStringStamp = (at: FirebaseTimeStamp) => moment(at.seconds).toString()

export const linkingUrl = async (url: string) => {
    // tel: 이 붙어서 4번째부터 +82인지 검사
    if (typeof url === 'string' && url.indexOf('+82') === 4) {
        url = url.replace('+82', '0')
    }
    try {
        const supported = await Linking.canOpenURL(url)
        if (supported) {
            Linking.openURL(url)
        } else {
            return false
        }
    } catch (e) {
        Sentry.captureException(e)
    }
}
