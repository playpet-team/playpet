import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { Icon } from 'react-native-elements'
import ManageProducts from '../screens/ManageProducts'
import RegistrationPet from '../screens/ManageProducts/RegistrationPet'
import RegistFeedBoard from '../screens/ManageProducts/RegistFeedBoard'

import AuthScreen from '../screens/AuthScreen'
import AppSettings from '../screens/AuthScreen/AppSettings'
import PaymentSetting from '../screens/AuthScreen/PaymentSetting'
import ProfileSetting from '../screens/AuthScreen/ProfileSetting'
import ShippingDestinationSetting from '../screens/AuthScreen/ShippingDestinationSetting'
import Home from '../screens/Home'
// import Recommendation from '../screens/Recommendation'
import { defaultColorPalette } from '../styles/colors'
import useUserNotifications from '../hooks/useUserNotifications'
import Notifications from '../screens/Notifications'




export type BottomTabParamList = {
    Home: {
        needRefresh?: boolean
    }
    ManageProducts: undefined
    Notifications: undefined
    Auth: undefined
}
const BottomTab = createBottomTabNavigator<BottomTabParamList>()
export default function BottomTabNavigator() {
    const { isNew } = useUserNotifications('isNew')
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
                name="ManageProducts"
                component={ManageProductsNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="attach-money"
                        color={focused ? defaultColorPalette.primary : defaultColorPalette.border}
                    />,
                }}
            />
            <BottomTab.Screen
                name="Notifications"
                component={NotificationNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="notifications"
                        color={focused || isNew ? defaultColorPalette.primary : defaultColorPalette.border}
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
    )
}

export type HomeNavigatorTabParamList = {
    HomeNavigator: undefined
    // ProductWebView: {
    //     url: string
    //     title: string
    // }
    // AppLoginAgreeTerms: undefined
}
const HomeNavigatorTapStack = createStackNavigator<HomeNavigatorTabParamList>()

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
            {/* <HomeNavigatorTapStack.Screen
                name="ProductWebView"
                component={ProductWebView}
                options={({ route }) => ({
                    title: route.params.title,
                    gestureEnabled: false,
                })}
            /> */}
        </HomeNavigatorTapStack.Navigator>
    )
}

export type ManageParamList = {
    ManageProducts: {
        needRefresh: boolean
    }
    RegistrationPet: undefined
    RegistFeedBoard: undefined
}
const ManageStack = createStackNavigator<ManageParamList>()
function ManageProductsNavigator() {
    return (
        <ManageStack.Navigator>
            <ManageStack.Screen
                name="ManageProducts"
                component={ManageProducts}
                options={({ navigation }) => ({
                    headerTitle: '관리',
                })}
            />
            <ManageStack.Screen
                name="RegistrationPet"
                component={RegistrationPet}
                options={({ navigation }) => ({
                    headerTitle: '반려동물 등록',
                })}
            />
            <ManageStack.Screen
                name="RegistFeedBoard"
                component={RegistFeedBoard}
                options={({ navigation }) => ({
                    headerTitle: '사료 등록',
                })}
            />
        </ManageStack.Navigator>
    )
}

// export type RecommendationParamList = {
//     RecommendationScreen: undefined
// }
// const RecommendationStack = createStackNavigator<RecommendationParamList>()
// function RecommendationNavigator() {
//     return (
//         <RecommendationStack.Navigator>
//             <RecommendationStack.Screen
//                 name="RecommendationScreen"
//                 component={Recommendation}
//                 options={({ navigation }) => ({
//                     headerShown: false,
//                     headerTitle: '추천',
//                 })}
//             />
//         </RecommendationStack.Navigator>
//     )
// }

export type NotificationNavigatorParamList = {
    Notifications: undefined
    NotificationDetail: undefined
}
const NotificationNavigatorStack = createStackNavigator<NotificationNavigatorParamList>()
function NotificationNavigator() {
    return (
        <NotificationNavigatorStack.Navigator>
            <NotificationNavigatorStack.Screen
                name="Notifications"
                component={Notifications}
                options={({ navigation }) => ({
                    headerTitle: '알림',
                })}
            />
        </NotificationNavigatorStack.Navigator>
    )
}

export type AuthTapParamList = {
    AuthScreen: {
        completeLoginType?: boolean
    }
    AppSettings: undefined
    PaymentSetting: undefined
    ShippingDestinationSetting: undefined
    ProfileSetting: undefined
}
const AuthTapStack = createStackNavigator<AuthTapParamList>()

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
                options={{ headerTitle: '회원 정보' }}
            />
            <AuthTapStack.Screen
                name="PaymentSetting"
                component={PaymentSetting}
                options={{ headerTitle: '결제 정보' }}
            />
            <AuthTapStack.Screen
                name="ShippingDestinationSetting"
                component={ShippingDestinationSetting}
                options={{ headerTitle: '배송지 관리' }}
            />
        </AuthTapStack.Navigator>
    )
}
