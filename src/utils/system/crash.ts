import crashlytics from '@react-native-firebase/crashlytics';

export const Crash = {
    crashLog: (msg: string) => crashlytics().log(msg),
    crashError: (error: Error) => crashlytics().recordError(error),
    setCrashlyticsCollectionEnabled: (enable: boolean) => crashlytics().setCrashlyticsCollectionEnabled(enable),
    setUserId: (id: string) => crashlytics().setUserId(id),
    setAttribute: (key: string, value: string) => crashlytics().setAttribute(key, value),
};
