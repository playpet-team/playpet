import * as Sentry from "@sentry/react-native";
import * as Updates from 'expo-updates';

export const sentryInit = () => {
    Sentry.init({
        dsn: 'https://8e273cf95abf4bed98c3a636731c14b2@o444254.ingest.sentry.io/5418939',
        environment: __DEV__ ? 'development' : 'production',
        debug: __DEV__,
        release: `v.${Updates.manifest.version}` || 'dev',
    });
}
