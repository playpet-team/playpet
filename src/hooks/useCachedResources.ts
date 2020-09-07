import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import { useState, useEffect } from 'react';
// import * as SplashScreen from 'expo-splash-screen'
import * as Sentry from "@sentry/react-native";


export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false)
    
    useEffect(() => {
        if (isLoadingComplete) {
            return
        }
        loadResourcesAndDataAsync()
 
        async function loadResourcesAndDataAsync() {
            try {
                // SplashScreen.preventAutoHideAsync()
                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                })
            } catch (e) {
                Sentry.captureException(e)
            } finally {
                // SplashScreen.hideAsync()
                setLoadingComplete(true)
            }
        }
    }, [isLoadingComplete])

    return isLoadingComplete
}
