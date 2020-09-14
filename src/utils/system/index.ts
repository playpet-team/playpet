export * from './permission';
import * as Sentry from "@sentry/react-native";
import * as Linking from 'expo-linking';
import moment from 'moment';
import { Dimensions, NativeModules } from 'react-native';

export const decimalWonPrice = (val: string | number) => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원'
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
export const firebaseTimeStampToStringStamp = (at: FirebaseTimeStamp | string | null) => {
    if (!at) {
        return ''
    }
    if (typeof at === 'string') {
        return at
    }
    return moment(at.seconds).toString()
}

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
