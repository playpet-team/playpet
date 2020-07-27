import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { Text } from 'react-native';
import styled from '@emotion/native';

import { tintColorLight } from '../constants/Colors';
// import useColorScheme from '../hooks/useColorScheme';
import Home from '../screens/Home';
import Auth from '../screens/Auth';
import AuthSettings from '../screens/Auth/AuthSettings';
// import TabTwoScreen from '../screens/TabTwoScreen';
// import { BottomTabParamList, HomeTabParamList, TabTwoParamList } from '../types';

export type BottomTabParamList = {
    Home: undefined;
    Auth: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomIconText = styled.Text``;
export default function BottomTabNavigator() {
    // const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{ activeTintColor: tintColorLight }}>
            <BottomTab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <BottomIconText>홈</BottomIconText>,
                }}
            />
            <BottomTab.Screen
                name="Auth"
                component={AuthNavigator}
                options={{
                    tabBarIcon: ({ color }) => <BottomIconText>우리 가족</BottomIconText>,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
// function TabBarIcon(props: { name: string; color: string }) {
//     return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
// }

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
type HomeTabParamList = {
    Home: undefined;
};
const HomeTapStack = createStackNavigator<HomeTabParamList>();

function HomeNavigator() {
    return (
        <HomeTapStack.Navigator>
            <HomeTapStack.Screen
                name="Home"
                component={Home}
                options={{ headerTitle: '홈' }}
            />
        </HomeTapStack.Navigator>
    );
}

export type AuthTapParamList = {
    Auth: undefined;
    AuthSettings: undefined;
};
const AuthTapStack = createStackNavigator<AuthTapParamList>();

function AuthNavigator() {
    return (
        <AuthTapStack.Navigator>
            <AuthTapStack.Screen
                name="Auth"
                component={Auth}
                options={{ headerTitle: '가족정보' }}
            />
            <AuthTapStack.Screen
                name="AuthSettings"
                component={AuthSettings}
                options={{ headerTitle: '회원정보' }}
            />
        </AuthTapStack.Navigator>
    );
}
