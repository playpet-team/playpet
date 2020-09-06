import { AsyncStorageCustomToken } from './../utils/auth/initializeSignIn';
import { signInWithCustomToken, signOut } from './../utils/auth/index';
import AsyncStorage from '@react-native-community/async-storage'
import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import * as Sentry from "@sentry/react-native";
import { sentryInit } from '../utils/system/sentry'
sentryInit()


export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false)
    
    useEffect(() => {
        if (isLoadingComplete) {
            return
        }
 
        const loadResourcesAndDataAsync = async () => {
            try {
                SplashScreen.preventAutoHideAsync()
                const response = await AsyncStorage.getItem('customToken')
                if (response) {
                    const getStorage: AsyncStorageCustomToken = JSON.parse(response);
                    await signInWithCustomToken(getStorage.customToken)
                }

                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                })
            } catch (e) {
                AsyncStorage.removeItem('customToken')
                await signOut()
                Sentry.captureException(e)
            } finally {
                // SplashScreen.hideAsync()
                setLoadingComplete(true)
            }
        }

        loadResourcesAndDataAsync()
    }, [isLoadingComplete])

    return isLoadingComplete
}
