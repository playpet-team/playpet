import crashlytics from '@react-native-firebase/crashlytics';
import { useEffect } from 'react';
import { currentUser } from '../utils';

function useCrashlytics() {
    useEffect(() => {
        const user = currentUser();
        if (!user) {
            return;
        }
        crashlytics().setUserId(user.uid);
        // crashlytics().setAttribute('credits', String(user.credits))
    }, []);

    return {
        crashLog: crashlytics().log,
        crashError: crashlytics().recordError,
    }
};

export default useCrashlytics;
