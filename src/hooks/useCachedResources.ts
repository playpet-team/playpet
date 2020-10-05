import { Ionicons } from '@expo/vector-icons';
// import * as SplashScreen from 'expo-splash-screen'
import * as Sentry from "@sentry/react-native";
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';


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
