import * as Sentry from "@sentry/react-native";

export const sentryInit = () => {
    Sentry.init({
        dsn: 'https://8e273cf95abf4bed98c3a636731c14b2@o444254.ingest.sentry.io/5418939',
        environment: __DEV__ ? 'development' : 'production',
        debug: __DEV__,
    });
}
