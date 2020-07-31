import { NativeModules } from 'react-native';

export const appReload = () => {
    return NativeModules.DevSettings.reload();
};