import { NavigationContainer, DefaultTheme, DarkTheme, Theme, useTheme, RouteProp, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance'
import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from './LinkingConfiguration'
import AppLogin from '../screens/AppLogin'
import AppLoginAgreeTerms from '../screens/AppLogin/AppLoginAgreeTerms'
import useAuthStateChanged from '../hooks/useAuthStateChanged'
import { currentUser } from '../utils'
import analytics from '@react-native-firebase/analytics'
import { Crash } from '../utils/system/crash'
import { defaultColorPalette, } from '../styles/colors'

Appearance.getColorScheme()

export default function Navigation() {
    const colorScheme = useColorScheme()
    const routeNameRef = React.useRef<React.RefObject<NavigationContainerRef> | any>(null)
    const navigationRef = React.useRef<React.RefObject<NavigationContainerRef> | any>(null)
    const user = currentUser()

    useAuthStateChanged()

    const onChangeScreen = React.useCallback(() => {
        try {
            const previousRouteName = routeNameRef.current
            const currentRouteName = navigationRef.current.getCurrentRoute().name

            if (previousRouteName !== currentRouteName) {
                analytics().setCurrentScreen(currentRouteName, currentRouteName)
            }
            routeNameRef.current = currentRouteName
        } catch (e) {
            console.error(e)
        }
    }, [navigationRef])

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
                    routeNameRef.current = navigationRef.current.getCurrentRoute().name
                    analytics().setCurrentScreen(routeNameRef.current, routeNameRef.current)
                }}
                onStateChange={onChangeScreen}
            >
                <RootNavigator />
            </NavigationContainer>
        </AppearanceProvider>
    )
}

export type RootStackParamList = {
    // AppLogin: undefined
    Home: undefined
    NotFound: undefined
}

const RootStack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
    React.useEffect(() => {
        Crash.setCrashlyticsCollectionEnabled(true)
        ErrorUtils.setGlobalHandler(Crash.crashError)
        const user = currentUser()
        if (!user) {
            return
        }
        Crash.setUserId(user.uid)

    }, [])

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Home" component={BottomTabNavigator} />
            {/* <RootStack.Screen name="AppLogin" component={AppLoginNavigator} /> */}
        </RootStack.Navigator>
    )
}

export type AppLoginParamList = {
    AppLogin: undefined
    AppLoginAgreeTerms: undefined
}
const AppLoginStack = createStackNavigator<AppLoginParamList>()

function AppLoginNavigator() {
    return (
        <AppLoginStack.Navigator>
            <AppLoginStack.Screen
                name="AppLogin"
                component={AppLogin}
                options={{ headerShown: false }}
            />
            <AppLoginStack.Screen
                name="AppLoginAgreeTerms"
                component={AppLoginAgreeTerms}
                options={{ headerShown: false }}
            />
        </AppLoginStack.Navigator>
    )
}

export type CustomStackScreenProp<
    RouteName extends keyof RootStackParamList
    > = {
        route: RouteProp<RootStackParamList, RouteName>
        navigation: StackNavigationProp<RootStackParamList, RouteName>
    }