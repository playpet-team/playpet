import { NavigationContainer, DefaultTheme, DarkTheme, Theme, useTheme, RouteProp, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import AppLogin from '../components/AppLogin';
import useAuthStateChanged from '../hooks/useAuthStateChanged';
import { currentUser } from '../utils';
import analytics from '@react-native-firebase/analytics';
import { ErrorUtils } from 'react-native';
import { Crash } from '../utils/system/crash';
import { defaultColorPalette, darkColorPalette } from '../constants/Colors';

Appearance.getColorScheme();

export default function Navigation() {
    const colorScheme = useColorScheme();
    const routeNameRef = React.useRef<React.RefObject<NavigationContainerRef> | any>(null);
    const navigationRef = React.useRef<React.RefObject<NavigationContainerRef> | any>(null);
    const user = currentUser();

    useAuthStateChanged();

    const onChangeScreen = React.useCallback(() => {
        try {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
                analytics().setCurrentScreen(currentRouteName, currentRouteName);
            }
            routeNameRef.current = currentRouteName;
        } catch (e) {
            console.error(e);
        }
    }, [navigationRef]);
    // const aoeu = useTheme();
    // console.log("aoeu---", aoeu);

    return (
        <AppearanceProvider>
            <NavigationContainer
                linking={LinkingConfiguration}
                theme={colorScheme === 'dark' ? {
                    ...DefaultTheme,
                    colors: {
                        ...DefaultTheme.colors,
                        ...defaultColorPalette,
                    },
                } : {
                        ...DefaultTheme,
                        colors: {
                            ...DefaultTheme.colors,
                            ...defaultColorPalette,
                        }
                    }}
                ref={navigationRef}
                onReady={() => {
                    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
                    analytics().setCurrentScreen(routeNameRef.current, routeNameRef.current);
                }}
                onStateChange={onChangeScreen}
            >
                {user ?
                    <RootNavigator />
                    :
                    <AppLoginNavigator />
                }
            </NavigationContainer>
        </AppearanceProvider>
    );
}

export type RootStackParamList = {
    AppLogin: undefined;
    Home: undefined;
    NotFound: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={BottomTabNavigator} />
        </Stack.Navigator>
    );
};

type AppLoginParamList = {
    AppLogin: undefined;
};
const AppLoginStack = createStackNavigator<AppLoginParamList>();

function AppLoginNavigator() {
    React.useEffect(() => {
        Crash.setCrashlyticsCollectionEnabled(true);
        const user = currentUser();
        if (!user) {
            return;
        }
        Crash.setUserId(user.uid);
        ErrorUtils.setGlobalHandler(Crash.crashError);

    }, []);
    return (
        <AppLoginStack.Navigator>
            <AppLoginStack.Screen
                name="AppLogin"
                component={AppLogin}
                options={{ headerShown: false }}
            />
        </AppLoginStack.Navigator>
    );
};

export type CustomStackScreenProp<
    RouteName extends keyof RootStackParamList
    > = {
        route: RouteProp<RootStackParamList, RouteName>;
        navigation: StackNavigationProp<RootStackParamList, RouteName>;
    };