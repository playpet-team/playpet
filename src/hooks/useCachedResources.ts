import { AsyncStorageCustomToken } from './../utils/auth/initializeSignIn';
import { signInWithCustomToken } from './../utils/auth/index';
import AsyncStorage from '@react-native-community/async-storage'
import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false)

    // Load any resources or data that we need prior to rendering the app
    
    React.useEffect(() => {
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
                    // console.log("response------", JSON.parse(response));
                }

                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                })
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e)
            } finally {
                console.log('-------------------------');
                setLoadingComplete(true)
                SplashScreen.hideAsync()
            }
        }

        loadResourcesAndDataAsync()
    }, [isLoadingComplete])

    return isLoadingComplete
}
