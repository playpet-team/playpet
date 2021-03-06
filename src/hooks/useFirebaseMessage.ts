import messaging from '@react-native-firebase/messaging';
import * as Sentry from "@sentry/react-native";
import { useEffect } from 'react';
import { currentUser, updateFcmToken } from './../utils/auth/index';
import { askPermission, PermissionsList } from './../utils/system/permission';

let _onTokenRefreshListener: any = null;
let _notificationListener: any = null;

function useFirebaseMessage() {
    
    useEffect(() => {
        init();
        async function init() {
            try {
                const { status, type } = await askPermission(PermissionsList.USER_FACING_NOTIFICATIONS);
                _checkFirebasePermission();
            } catch (e) {
                _registerToken()
                Sentry.captureException(e)
            }
        }
        return () => {
            if (_onTokenRefreshListener) {
                _onTokenRefreshListener();
                _onTokenRefreshListener = undefined;
            }
            // if (_notificationDisplayedListener) {
            //     _notificationDisplayedListener();
            //     _notificationDisplayedListener = undefined;
            // }
            if (_notificationListener) {
                _notificationListener();
                _notificationListener = undefined;
            }
            // if (_notificationOpenedListener) {
            //     _notificationOpenedListener();
            //     _notificationOpenedListener = undefined;
            // }
        };
    }, []);

    

    const _onReactNotification = () => {
        _notificationListener = messaging().onNotificationOpenedApp((notification) => {
            // Process your notification as required
            // notification.android.setPriority(firebase.notifications.Android.Priority.Max);
            // notification.android.setChannelId(CHANNEL_ID);
      
          });
    };

    const _registerToken = async (fcmToken: string = ''): Promise<void> => {
        try {
            const user = currentUser();
            if (user?.uid) {
                updateFcmToken(user.uid, fcmToken);
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    };
    
    const _checkFirebasePermission = async () => {
        try {
            const enabled = await messaging().hasPermission();
            if (enabled) {
                // user has permissions
                await updateTokenToServer();
                _registerTokenRefreshListener();
                _onReactNotification();
            } else {
                // user doesn't have permission
                const status = await _requestPermission();
                if (status) {
                    await updateTokenToServer();
                    _registerTokenRefreshListener();
                    _onReactNotification();
                } else {
                  _registerToken()
                }
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    };
    
    const updateTokenToServer = async () => {
        try {
            const fcmToken = await messaging().getToken();
            _registerToken(fcmToken);
        } catch (e) {
            Sentry.captureException(e)
        }
      };
    
      const _registerTokenRefreshListener = (): void => {
        if (_onTokenRefreshListener) {
          _onTokenRefreshListener();
          _onTokenRefreshListener = undefined;
        }
    
        _onTokenRefreshListener = messaging().onTokenRefresh((fcmToken) => {
          // Process your token as required
          _registerToken(fcmToken);
        });
      };
    
      const _requestPermission = async () => {
        try {
          // User has authorised
            const authStatus = await messaging().requestPermission();
            return (
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL
            );
        } catch (e) {
            Sentry.captureException(e)
            // User has rejected permissions
        }
      };

}

export default useFirebaseMessage;
  