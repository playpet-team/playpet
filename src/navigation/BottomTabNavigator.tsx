import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import styled from 'styled-components/native';

import { defaultColorPalette } from '../styles/colors';
import Home from '../screens/Home';
import ProductWebView from '../components/ProductWebView';
import PlayGroundScreen from '../screens/PlayGroundScreen';
import CardFormScreen from '../screens/CardFormScreen';
import AuthScreen from '../screens/AuthScreen';
import AppSettings from '../screens/AuthScreen/AppSettings';
import AppLogin from '../screens/AppLogin';
import ProfileSetting from '../screens/AuthScreen/ProfileSetting';

export type BottomTabParamList = {
    Home: undefined;
    Auth: undefined;
    Card: undefined;
    PlayGround: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: defaultColorPalette.primary,
                showLabel: false,
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="pets"
                        color={focused ? defaultColorPalette.primary : defaultColorPalette.border}
                    />,
                }}
            />
            <BottomTab.Screen
                name="Card"
                component={CardFormNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="add"
                        color={focused ? defaultColorPalette.primary : defaultColorPalette.border}
                    />,
                }}
            />
            <BottomTab.Screen
                name="PlayGround"
                component={PlayGroundNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="check-box-outline-blank"
                        color={focused ? defaultColorPalette.primary : defaultColorPalette.border}
                    />,
                }}
            />
            <BottomTab.Screen
                name="Auth"
                component={AuthNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="person"
                        color={focused ? defaultColorPalette.primary : defaultColorPalette.border}
                    />,
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
export type HomeNavigatorTabParamList = {
    HomeNavigator: undefined;
    ProductWebView: {
        url: string;
        title: string;
    };
    AppLoginAgreeTerms: undefined;
};
const HomeNavigatorTapStack = createStackNavigator<HomeNavigatorTabParamList>();

function HomeNavigator() {
    return (
        <HomeNavigatorTapStack.Navigator>
            <HomeNavigatorTapStack.Screen
                name="HomeNavigator"
                component={Home}
                options={{
                    headerShown: false,
                    headerTitle: '홈',
                }}
            />
            <HomeNavigatorTapStack.Screen
                name="ProductWebView"
                component={ProductWebView}
                options={({ route }) => ({
                    title: route.params.title,
                    gestureEnabled: false,
                })}
            />
        </HomeNavigatorTapStack.Navigator>
    );
}

export type CardFormNavigatorParamList = {
    CardFormNavigator: undefined;
};
const CardFormNavigatorStack = createStackNavigator<CardFormNavigatorParamList>();
function CardFormNavigator() {
    return (
        <CardFormNavigatorStack.Navigator>
            <CardFormNavigatorStack.Screen
                name="CardFormNavigator"
                component={CardFormScreen}
                options={({ navigation }) => ({
                    headerTitle: '포스트',
                })}
            />
        </CardFormNavigatorStack.Navigator>
    );
};

export type BlankTapParamList = {
    BlankScreen: undefined;
};
const BlankTapStack = createStackNavigator<BlankTapParamList>();
function PlayGroundNavigator() {
    return (
        <BlankTapStack.Navigator>
            <BlankTapStack.Screen
                name="BlankScreen"
                component={PlayGroundScreen}
                options={({ navigation }) => ({
                    headerShown: false,
                    headerTitle: '놀이터',
                })}
            />
        </BlankTapStack.Navigator>
    );
};

export type AuthTapParamList = {
    AuthScreen: undefined;
    AppSettings: undefined;
    ProfileSetting: undefined;
    AppLogin: undefined;
    AppLoginAgreeTerms: undefined;
};
const AuthTapStack = createStackNavigator<AuthTapParamList>();

function AuthNavigator() {
    return (
        <AuthTapStack.Navigator>
            <AuthTapStack.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={({ navigation, route }) => ({
                    headerTitle: '마이페이지',
                })}
            />
            <AuthTapStack.Screen
                name="AppSettings"
                component={AppSettings}
                options={{ headerTitle: '앱 세팅' }}
            />
            <AuthTapStack.Screen
                name="ProfileSetting"
                component={ProfileSetting}
                options={{ headerTitle: '회원정보' }}
            />
            <AuthTapStack.Screen
                name="AppLogin"
                component={AppLogin}
                options={({ route }) => ({
                    headerShown: false,
                    gestureEnabled: false,
                })}
            />
        </AuthTapStack.Navigator>
    );
};

const HeaderButton = styled.TouchableOpacity`
    padding: 8px;
`;

