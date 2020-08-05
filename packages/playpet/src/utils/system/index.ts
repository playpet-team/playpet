import { NativeModules, Dimensions } from 'react-native';
import moment from 'moment';

export * from './permission';

export const appReload = () => {
    return NativeModules.DevSettings.reload();
};

export const deviceSize = () => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
};

export interface FirebaseTimeStamp {
    nonoseconds: number;
    seconds: number;
};
export const firebaseTimeStampToStringStamp = (at: FirebaseTimeStamp) => moment(at.seconds).toString();

