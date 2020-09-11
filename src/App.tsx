import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Splash from './components/Splash';
import useAutoLogin from './hooks/useAutoLogin';
import useCachedResources from './hooks/useCachedResources';
import useUpdater from './hooks/useUpdater';
import Navigation from './navigation';
import { store } from './store/rootReducers';
import { sentryInit } from './utils/system/sentry';

sentryInit()

export default function App() {
    const isLoadingComplete = useCachedResources();
    useAutoLogin()
    useUpdater()

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <AppearanceProvider>
                    {isLoadingComplete ?
                        <>
                            <Navigation />
                            <StatusBar style="dark" />
                        </>
                        :
                        <Splash />
                    }
                </AppearanceProvider>
            </SafeAreaProvider>
        </Provider>
    );
}
