import { NavigationContainer, DefaultTheme, DarkTheme, Theme, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Appearance, useColorScheme } from 'react-native-appearance';
import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import AppLogin from '../components/AppLogin';
import { currentUser } from '../screens/AuthScreen/SocialSignIn';
import useAuthStateChanged from '../hooks/useAuthStateChanged';

Appearance.getColorScheme();

export default function Navigation() {
    const colorScheme = useColorScheme();
    useAuthStateChanged();
    const user = currentUser();
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}
        >
            {user ?
                <RootNavigator />
                :
                <AppLoginNavigator />
            }
        </NavigationContainer>
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
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
};

type AppLoginParamList = {
    AppLogin: undefined;
};
const AppLoginStack = createStackNavigator<AppLoginParamList>();

function AppLoginNavigator() {
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