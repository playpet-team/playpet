import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import styled from '@emotion/native';

import { tintColorLight, tintColorDark, tintColorKey } from '../constants/Colors';
import Home from '../screens/Home';
import BlankScreen from '../screens/BlankScreen';
import PostCardFormScreen from '../screens/PostCardFormScreen';
import AuthScreen from '../screens/AuthScreen';
import AuthSettings from '../screens/AuthScreen/AuthSettings';

export type BottomTabParamList = {
    Home: undefined;
    Auth: undefined;
    PostCard: undefined;
    Blank: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: tintColorLight,
                showLabel: false,
            }}>
            <BottomTab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="pets"
                        color={focused ? tintColorKey : tintColorDark}
                    />,
                }}
            />
            <BottomTab.Screen
                name="PostCard"
                component={PostCardFormNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="add"
                        color={focused ? tintColorKey : tintColorDark}
                    />,
                }}
            />
            <BottomTab.Screen
                name="Blank"
                component={BlankNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="check-box-outline-blank"
                        color={focused ? tintColorKey : tintColorDark}
                    />,
                }}
            />
            <BottomTab.Screen
                name="Auth"
                component={AuthNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="person"
                        color={focused ? tintColorKey : tintColorDark}
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

export type PostCardTapParamList = {
    PostCardFormScreen: undefined;
};
const PostCardTapStack = createStackNavigator<PostCardTapParamList>();
function PostCardFormNavigator() {
    return (
        <PostCardTapStack.Navigator>
            <PostCardTapStack.Screen
                name="PostCardFormScreen"
                component={PostCardFormScreen}
                options={({ navigation }) => ({
                    headerTitle: '포스트',
                })}
            />
        </PostCardTapStack.Navigator>
    );
};

export type BlankTapParamList = {
    BlankScreen: undefined;
};
const BlankTapStack = createStackNavigator<BlankTapParamList>();
function BlankNavigator() {
    return (
        <BlankTapStack.Navigator>
            <BlankTapStack.Screen
                name="BlankScreen"
                component={BlankScreen}
                options={({ navigation }) => ({
                    headerTitle: '놀이터',
                })}
            />
        </BlankTapStack.Navigator>
    );
};

export type AuthTapParamList = {
    AuthScreen: undefined;
    AuthSettings: undefined;
};
const AuthTapStack = createStackNavigator<AuthTapParamList>();

function AuthNavigator() {
    return (
        <AuthTapStack.Navigator>
            <AuthTapStack.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={({ navigation, route }) => ({
                    headerTitle: '가족정보',
                    headerRight: () => (
                        <HeaderButton onPress={() => navigation.navigate('AuthSettings')}>
                            <Icon
                                name="settings"
                            />
                        </HeaderButton>
                    ),
                })}
            />
            <AuthTapStack.Screen
                name="AuthSettings"
                component={AuthSettings}
                options={{ headerTitle: '회원정보' }}
            />
        </AuthTapStack.Navigator>
    );
};

const HeaderButton = styled.TouchableOpacity`
    padding: 8px;
`;

