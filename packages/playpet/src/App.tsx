import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';

import useCachedResources from './hooks/useCachedResources';
import Splash from './components/Splash';
// import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { store } from './store/rootReducers';

export default function App() {
    const isLoadingComplete = useCachedResources();
    // const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return <Splash />;
    } else {
        return (
            <Provider store={store}>
                <SafeAreaProvider>
                    <AppearanceProvider>
                        <Navigation />
                        <StatusBar />
                    </AppearanceProvider>
                </SafeAreaProvider>
            </Provider>
        );
    }
}
