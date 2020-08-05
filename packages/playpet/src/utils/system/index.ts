import { NativeModules, Dimensions } from 'react-native';

export * from './permission';
export const appReload = () => {
    return NativeModules.DevSettings.reload();
};

export const deviceSize = () => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
}