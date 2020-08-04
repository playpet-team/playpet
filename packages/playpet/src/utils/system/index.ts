import { NativeModules } from 'react-native';

export * from './permission';
export const appReload = () => {
    return NativeModules.DevSettings.reload();
};
