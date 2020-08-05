import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';

import useCachedResources from './hooks/useCachedResources';
import Splash from './components/Splash';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { store } from './store/rootReducers';

export default function App() {
    const isLoadingComplete = useCachedResources();

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <AppearanceProvider>
                    {!isLoadingComplete ?
                        <Splash />
                        :
                        <>
                            <Navigation />
                            <StatusBar />
                        </>
                    }
                </AppearanceProvider>
            </SafeAreaProvider>
        </Provider>
    );
}
