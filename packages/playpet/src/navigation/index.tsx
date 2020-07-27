import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Appearance, useColorScheme } from 'react-native-appearance';
import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

Appearance.getColorScheme();

export default function Navigation() {
    const colorScheme = useColorScheme();
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    );
}

export type RootStackParamList = {
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
}
