import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Icon } from 'react-native-elements';
import ManageProducts from '../screens/ManageProducts';
import RegistrationPet from '../screens/ManageProducts/RegistrationPet';
import RegistFeedBoard from '../screens/ManageProducts/RegistFeedBoard';

// import AppLogin from '../screens/AppLogin';
import AuthScreen from '../screens/AuthScreen';
import AppSettings from '../screens/AuthScreen/AppSettings';
import PaymentSetting from '../screens/AuthScreen/PaymentSetting';
import ProfileSetting from '../screens/AuthScreen/ProfileSetting';
import ShippingDestinationSetting from '../screens/AuthScreen/ShippingDestinationSetting';
// import CardFormScreen from '../screens/CardFormScreen';
import Home from '../screens/Home';
import Order from '../screens/Order';
import Recommendation from '../screens/Recommendation';
// import Notifications from '../screens/Notifications';
// import PlayGroundScreen from '../screens/PlayGroundScreen';
// import SubscribeFormScreen from '../screens/SubscribeFormScreen';
import { defaultColorPalette } from '../styles/colors';




export type BottomTabParamList = {
    Home: undefined;
    ManageProducts: undefined;
    Recommendation: undefined;
    // SubscribeForm: undefined;
    // PlayGround: undefined;
    // CardForm: undefined;
    // Notifications: undefined;
    Auth: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
    // const { isNew } = useUserNotifications('isNew')
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
                name="Recommendation"
                component={RecommendationNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="thumb-up"
                        color={focused ? defaultColorPalette.primary : defaultColorPalette.border}
                    />,
                }}
            />
            {/* <BottomTab.Screen
                name="PlayGround"
                component={PlayGroundNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="check-box-outline-blank"
                        color={focused ? defaultColorPalette.primary : defaultColorPalette.border}
                    />,
                }}
            /> */}
            {/* <BottomTab.Screen
                name="SubscribeForm"
                component={SubscribeFormNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="add"
                        color={focused ? defaultColorPalette.primary : defaultColorPalette.border}
                    />,
                }}
            /> */}
            {/* <BottomTab.Screen
                name="CardForm"
                component={CardFormNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="add"
                        color={focused ? defaultColorPalette.primary : defaultColorPalette.border}
                    />,
                }}
            /> */}
            {/* <BottomTab.Screen
                name="Notifications"
                component={NotificationNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icon
                        name="notifications"
                        color={focused || isNew ? defaultColorPalette.primary : defaultColorPalette.border}
                    />,
                }}
            /> */}
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
    // ProductWebView: {
    //     url: string;
    //     title: string;
    // };
    // IamportHome: {
    //     type: any;
    //     response: any;
    // };
    // Payment: {
    //     userCode: any;
    //     data: any;
    // };
    // AuthCertification: {
    //     userCode: any;
    //     data: any;
    // };
    // AppLoginAgreeTerms: undefined;
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
            {/* <HomeNavigatorTapStack.Screen
                name="ProductWebView"
                component={ProductWebView}
                options={({ route }) => ({
                    title: route.params.title,
                    gestureEnabled: false,
                })}
            /> */}
            {/* <HomeNavigatorTapStack.Screen
                name="Payment"
                component={Payment}
                options={({ route }) => ({
                    gestureEnabled: false,
                })}
            />
            <HomeNavigatorTapStack.Screen
                name="IamportHome"
                component={IamportHome}
                options={({ route }) => ({
                    gestureEnabled: false,
                })}
            />
            <HomeNavigatorTapStack.Screen
                name="AuthCertification"
                component={AuthCertification}
                options={({ route }) => ({
                    gestureEnabled: false,
                })}
            /> */}
        </HomeNavigatorTapStack.Navigator>
    );
}

export type ManageParamList = {
    ManageProducts: undefined;
    RegistrationPet: undefined;
    RegistFeedBoard: undefined;
};
const ManageStack = createStackNavigator<ManageParamList>();
function ManageProductsNavigator() {
    return (
        <ManageStack.Navigator>
            <ManageStack.Screen
                name="ManageProducts"
                component={ManageProducts}
                options={({ navigation }) => ({
                    headerShown: false,
                    headerTitle: '관리',
                })}
            />
            <ManageStack.Screen
                name="RegistrationPet"
                component={RegistrationPet}
                options={({ navigation }) => ({
                    headerShown: false,
                    headerTitle: '반려동물 등록',
                })}
            />
            <ManageStack.Screen
                name="RegistFeedBoard"
                component={RegistFeedBoard}
                options={({ navigation }) => ({
                    headerShown: false,
                    headerTitle: '반려동물 등록',
                })}
            />
        </ManageStack.Navigator>
    );
};

export type RecommendationParamList = {
    RecommendationScreen: undefined;
};
const RecommendationStack = createStackNavigator<RecommendationParamList>();
function RecommendationNavigator() {
    return (
        <RecommendationStack.Navigator>
            <RecommendationStack.Screen
                name="RecommendationScreen"
                component={Recommendation}
                options={({ navigation }) => ({
                    headerShown: false,
                    headerTitle: '놀이터',
                })}
            />
        </RecommendationStack.Navigator>
    );
};

// export type NotificationNavigatorParamList = {
//     Notifications: undefined;
//     NotificationDetail: undefined;
// };
// const NotificationNavigatorStack = createStackNavigator<NotificationNavigatorParamList>();
// function NotificationNavigator() {
//     return (
//         <NotificationNavigatorStack.Navigator>
//             <NotificationNavigatorStack.Screen
//                 name="Notifications"
//                 component={Notifications}
//                 options={({ navigation }) => ({
//                     headerTitle: '알림',
//                 })}
//             />
//         </NotificationNavigatorStack.Navigator>
//     );
// };

// export type CardFormNavigatorParamList = {
//     CardFormNavigator: undefined;
// };
// const CardFormNavigatorStack = createStackNavigator<CardFormNavigatorParamList>();
// function CardFormNavigator() {
//     return (
//         <CardFormNavigatorStack.Navigator>
//             <CardFormNavigatorStack.Screen
//                 name="CardFormNavigator"
//                 component={CardFormScreen}
//                 options={({ navigation }) => ({
//                     headerTitle: '포스트',
//                 })}
//             />
//         </CardFormNavigatorStack.Navigator>
//     );
// };

// export type BlankTapParamList = {
//     BlankScreen: undefined;
// };
// const BlankTapStack = createStackNavigator<BlankTapParamList>();
// function PlayGroundNavigator() {
//     return (
//         <BlankTapStack.Navigator>
//             <BlankTapStack.Screen
//                 name="BlankScreen"
//                 component={PlayGroundScreen}
//                 options={({ navigation }) => ({
//                     headerShown: false,
//                     headerTitle: '놀이터',
//                 })}
//             />
//         </BlankTapStack.Navigator>
//     );
// };

// export type SubscribeFormTapParamList = {
//     SubscribeForm: undefined
// };
// const SubscribeFormTapStack = createStackNavigator<SubscribeFormTapParamList>();
// function SubscribeFormNavigator() {
//     return (
//         <SubscribeFormTapStack.Navigator>
//             <SubscribeFormTapStack.Screen
//                 name="SubscribeForm"
//                 component={SubscribeFormScreen}
//                 options={({ navigation }) => ({
//                     headerShown: false,
//                     headerTitle: '정기배송',
//                 })}
//             />
//         </SubscribeFormTapStack.Navigator>
//     );
// };

export type AuthTapParamList = {
    AuthScreen: {
        isSignUp?: boolean;
    };
    AppSettings: undefined;
    PaymentSetting: undefined;
    ShippingDestinationSetting: undefined;
    ProfileSetting: undefined;
    // AppLogin: undefined;
    // AppLoginAgreeTerms: undefined;
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
            {/* <AuthTapStack.Screen
                name="AppLogin"
                component={AppLogin}
                options={({ route }) => ({
                    headerShown: false,
                    gestureEnabled: false,
                })}
            /> */}
        </AuthTapStack.Navigator>
    );
};
